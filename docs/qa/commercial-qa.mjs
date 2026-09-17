import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(new URL("../../../geoharvest/package.json", import.meta.url));
const { chromium } = require("@playwright/test");
const baseURL = process.env.GEOHARVEST_LANDING_URL || "http://localhost:5173";
const screenshotDirectory = new URL("../screenshots/", import.meta.url);
await mkdir(screenshotDirectory, { recursive: true });
const report = { url: baseURL, testedAt: new Date().toISOString(), checks: [], issues: [], consoleErrors: [], pageErrors: [], imageReport: [], screenshots: [] };
const recheckMobileOnly = process.argv.includes("--recheck-mobile");
const recheckNames = ["Mobile experience CTA reaches farmer mobile workspace", "No browser console errors or uncaught page errors"];
if (recheckMobileOnly) {
  Object.assign(report, JSON.parse(await readFile(new URL("commercial-qa-results.json", import.meta.url), "utf8")));
  report.checks = report.checks.filter(item => !recheckNames.includes(item.name));
  report.issues = report.issues.filter(item => !recheckNames.includes(item.name));
  report.recheckedAt = new Date().toISOString();
  report.recheckedOnly = recheckNames;
}
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || "chrome", headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on("pageerror", error => report.pageErrors.push(error.message));
page.on("console", message => { if (message.type() === "error") report.consoleErrors.push(message.text()); });

async function check(name, callback) {
  if (recheckMobileOnly && !recheckNames.includes(name)) return;
  try { const details = await callback(); report.checks.push({ name, passed: true, details }); }
  catch (error) { report.checks.push({ name, passed: false }); report.issues.push({ name, error: error.message }); }
}

async function imageStatus() {
  const images = page.locator("img");
  for (let index = 0; index < await images.count(); index++) {
    const image = images.nth(index);
    if (await image.isVisible()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(element => element.decode().catch(() => undefined));
    }
  }
  return page.locator("img").evaluateAll(elements => elements.map(element => ({ src: element.getAttribute("src"), loaded: element.complete && element.naturalWidth > 0, width: element.naturalWidth, alt: element.alt })));
}

async function screenshot(name, width, height, fullPage) {
  await page.setViewportSize({ width, height });
  await page.goto(baseURL);
  await page.getByRole("heading", { level: 1 }).waitFor();

  await imageStatus();
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: fileURLToPath(new URL(name, screenshotDirectory)), fullPage, animations: "disabled" });
  report.screenshots.push({ name, width, height, fullPage });
}

try {
  await page.goto(baseURL);
  await page.getByRole("heading", { level: 1 }).waitFor();

  await check("Landing metadata reflects the current product", async () => {
    const metadata = await page.evaluate(() => ({ title: document.title, language: document.documentElement.lang, description: document.querySelector('meta[name="description"]')?.getAttribute("content"), ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content"), ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute("content"), twitterTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute("content") }));
    assert.equal(metadata.title, "GeoHarvest | Tu campo y tu negocio, más conectados");
    assert.equal(metadata.ogTitle, metadata.title);
    assert.equal(metadata.twitterTitle, metadata.title);
    assert.equal(metadata.language, "es");
    assert.ok(metadata.description?.length > 40);
    return metadata;
  });

  await check("Three role tabs switch the panel and destination", async () => {
    const roles = [["Agricultor", "farmer"], ["Financiador", "financier"], ["Comercializador", "commercial"]];
    assert.equal(await page.getByRole("tab").count(), 3);
    const destinations = [];
    for (const [name, role] of roles) {
      const tab = page.getByRole("tab", { name, exact: true });
      await tab.click();
      assert.equal(await tab.getAttribute("aria-selected"), "true");
      assert.equal(await tab.getAttribute("tabindex"), "0");
      const panel = page.getByRole("tabpanel", { name, exact: true });
      await panel.waitFor();
      assert.equal(await page.getByRole("tabpanel").count(), 1);
      const destination = await panel.getByRole("link", { name: `Explorar como ${name.toLowerCase()}`, exact: true }).getAttribute("href");
      assert.equal(destination, `http://localhost:3000/login?role=${role}`);
      destinations.push(destination);
      const image = panel.locator("img");
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(element => element.decode());
      assert.ok(await image.evaluate(element => element.naturalWidth > 0));
    }
    return destinations;
  });

  await check("Role tabs support Home, End, arrows and wraparound", async () => {
    const sequence = [["Home", "Agricultor"], ["ArrowRight", "Financiador"], ["ArrowRight", "Comercializador"], ["ArrowRight", "Agricultor"], ["ArrowLeft", "Comercializador"], ["Home", "Agricultor"], ["End", "Comercializador"]];
    await page.getByRole("tab", { name: "Comercializador", exact: true }).focus();
    for (const [key, name] of sequence) {
      await page.keyboard.press(key);
      const tab = page.getByRole("tab", { name, exact: true });
      assert.equal(await tab.getAttribute("aria-selected"), "true");
      assert.equal(await tab.evaluate(element => element === document.activeElement), true);
    }
    return sequence;
  });

  await check("Role cards lead to the corresponding live platform login", async () => {
    const links = await page.locator(".gh-role__copy a").evaluateAll(elements => elements.map(element => ({ name: element.textContent, href: element.href })));
    assert.equal(links.length, 3);
    const expectedRoles = ["farmer", "financier", "commercial"];
    for (const [index, link] of links.entries()) {
      assert.equal(link.href, `http://localhost:3000/login?role=${expectedRoles[index]}`);
      const response = await context.request.get(link.href);
      assert.equal(response.status(), 200);
    }
    return links;
  });

  await check("FAQ entries open and close", async () => {
    const questions = page.locator(".gh-faq details");
    assert.equal(await questions.count(), 4);
    const titles = [];
    for (let index = 0; index < await questions.count(); index++) {
      const detail = questions.nth(index);
      const summary = detail.locator("summary");
      titles.push(await summary.innerText());
      await summary.click();
      assert.equal(await detail.getAttribute("open"), "");
      assert.equal(await detail.locator("p").isVisible(), true);
      await summary.click();
      assert.equal(await detail.getAttribute("open"), null);
    }
    await questions.first().locator("summary").focus();
    await page.keyboard.press("Enter");
    assert.equal(await questions.first().getAttribute("open"), "");
    await page.keyboard.press("Enter");
    return titles;
  });

  await check("Same-page anchor destinations exist", async () => {
    const links = await page.locator('a[href^="#"]').evaluateAll(elements => elements.map(element => ({ name: element.textContent, hash: element.getAttribute("href"), exists: Boolean(document.getElementById(element.getAttribute("href").slice(1))) })));
    assert.ok(links.every(link => link.exists));
    return links;
  });

  await check("Images load without broken sources", async () => {
    report.imageReport = await imageStatus();
    assert.ok(report.imageReport.every(image => image.loaded), JSON.stringify(report.imageReport.filter(image => !image.loaded)));
    return report.imageReport.length;
  });

  await check("Mobile menu opens, Escape restores focus, navigation link closes it", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.getByRole("button", { name: "Abrir menú", exact: true }).click();
    await page.getByRole("navigation", { name: "Navegación móvil", exact: true }).waitFor();
    assert.equal(await page.getByRole("button", { name: "Cerrar menú", exact: true }).getAttribute("aria-expanded"), "true");
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("navigation", { name: "Navegación móvil", exact: true }).count(), 0);
    assert.equal(await page.getByRole("button", { name: "Abrir menú", exact: true }).evaluate(element => element === document.activeElement), true);
    await page.getByRole("button", { name: "Abrir menú", exact: true }).click();
    await page.getByRole("navigation", { name: "Navegación móvil", exact: true }).getByRole("link", { name: "La plataforma", exact: true }).click();
    assert.equal(await page.getByRole("navigation", { name: "Navegación móvil", exact: true }).count(), 0);
    assert.equal(new URL(page.url()).hash, "#product");
  });

  await check("No horizontal overflow at 320, 390, 768, 1024 and 1440 pixels", async () => {
    const sizes = [];
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth, clippedText: [...document.querySelectorAll(".commercial-landing h1,.commercial-landing h2,.commercial-landing h3,.commercial-landing p,.gh-header a,.gh-header button,.gh-role a")].filter(element => { const rect = element.getBoundingClientRect(); return rect.width > 0 && (rect.left < -1 || rect.right > innerWidth + 1); }).map(element => ({ text: element.textContent, left: element.getBoundingClientRect().left, right: element.getBoundingClientRect().right })) }));
      sizes.push(dimensions);
      assert.ok(dimensions.document <= width && dimensions.body <= width, JSON.stringify(dimensions));
      assert.deepEqual(dimensions.clippedText, [], JSON.stringify(dimensions));
    }
    return sizes;
  });

  await check("Local account and information pages resolve", async () => {
    const destinations = [...new Set(await page.locator('a[href^="/"]').evaluateAll(elements => elements.map(element => element.getAttribute("href"))))];
    const localResults = [];
    for (const destination of destinations) {
      const response = await page.goto(new URL(destination, baseURL).toString());
      assert.equal(response.status(), 200);
      await page.locator("h1").first().waitFor();
      const heading = await page.locator("h1").first().innerText();
      assert.ok(heading.trim().length > 0);
      localResults.push({ destination, status: response.status(), heading });
    }
    return localResults;
  });

  await check("Mobile experience CTA reaches farmer mobile workspace", async () => {
    await page.goto(baseURL);
    const link = page.getByRole("link", { name: "Explorar la experiencia móvil", exact: true });
    const destination = await link.getAttribute("href");
    assert.equal(destination, "http://localhost:3000/login?role=farmer&next=/mobile");
    await link.click();
    await page.waitForURL("http://localhost:3000/login?role=farmer&next=/mobile");
    await page.getByRole("button", { name: /Agricultor/ }).click();
    await page.waitForURL("http://localhost:3000/mobile");
    await page.getByRole("heading", { name: "Mi campo", exact: true }).waitFor();
    return { destination, reached: page.url(), action: "Only selected demo farmer session; no field data changed" };
  });

  await check("Capture desktop, mobile, tablet and hero", async () => {
    await screenshot("commercial-desktop.png", 1440, 1000, true);
    await screenshot("commercial-mobile.png", 390, 844, true);
    await screenshot("commercial-tablet.png", 768, 1024, false);
    await screenshot("commercial-hero.png", 1440, 1000, false);
    await page.setViewportSize({ width: 1440, height: 1500 });
    for (const [name, selector] of [["commercial-product.png", "#product"], ["commercial-audiences.png", "#use-cases"], ["commercial-workflow.png", "#how-it-works"]]) {
      await page.locator(selector).evaluate(element => element.scrollIntoView({ block: "center", behavior: "instant" }));
      await page.locator(selector).screenshot({ path: fileURLToPath(new URL(name, screenshotDirectory)), animations: "disabled" });
      report.screenshots.push({ name, viewportWidth: 1440, viewportHeight: 1500, selector });
    }
    await screenshot("commercial-mobile-hero.png", 390, 844, false);
  });

  await check("No browser console errors or uncaught page errors", async () => {
    assert.equal(report.consoleErrors.length, 0, `${report.consoleErrors.length} console errors; first: ${report.consoleErrors[0]}`);
    assert.equal(report.pageErrors.length, 0, `${report.pageErrors.length} page errors; first: ${report.pageErrors[0]}`);
  });
} finally {
  await context.close();
  await browser.close();
  await writeFile(new URL("commercial-qa-results.json", import.meta.url), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (report.issues.length) process.exitCode = 1;
}
