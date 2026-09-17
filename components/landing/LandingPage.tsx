import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Layers3,
  Leaf,
  MapPinned,
  Menu,
  ShieldCheck,
  Smartphone,
  Sprout,
  Store,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Brand } from "@/components/Brand";
import { demoUrl, PILOT_EMAIL, type ProductRole } from "@/lib/platform";
import "./commercial.css";

const audiences = [
  {
    role: "farmer" as ProductRole,
    name: "Agricultor",
    icon: Sprout,
    title: "Tu operación, con una visión completa.",
    description:
      "Conoce tus parcelas, registra tus visitas y conserva el detalle de lo que ocurre en el campo.",
    action: "Quiero gestionar mi campo",
    image: "/images/agricultores.png",
    alt: "Hortalizas recién cosechadas en un campo",
    screenshot: "/images/commercial/platform-farmer.webp",
    screenshotHeight: 1299,
    productTitle: "Cada parcela cuenta. Cada acción también.",
    productBody:
      "Del mapa al seguimiento diario, reúne la información de tu operación en un solo espacio.",
    features: [
      "Parcelas y cultivos en el mapa",
      "Observaciones y alertas de campo",
      "Producción y operaciones vinculadas",
    ],
  },
  {
    role: "financier" as ProductRole,
    name: "Financiador",
    icon: ShieldCheck,
    title: "Más contexto para evaluar proyectos.",
    description:
      "Relaciona las solicitudes de financiación con las parcelas y la información disponible de cada proyecto.",
    action: "Quiero explorar proyectos",
    image: "/images/financiadores.png",
    alt: "Dos personas estrechan sus manos junto al cultivo",
    screenshot: "/images/commercial/platform-financier.webp",
    screenshotHeight: 1575,
    productTitle: "Detrás de cada proyecto, un territorio.",
    productBody:
      "Consulta solicitudes y evidencia de campo para organizar la revisión de oportunidades agrícolas.",
    features: [
      "Proyectos ligados a su parcela",
      "Información para la evaluación",
      "Seguimiento de solicitudes",
    ],
  },
  {
    role: "commercial" as ProductRole,
    name: "Comercializador",
    icon: Store,
    title: "Conecta la producción con su mercado.",
    description:
      "Explora la oferta disponible, conoce su origen y organiza el seguimiento de tus operaciones comerciales.",
    action: "Quiero encontrar producción",
    image: "/images/comercializadores.png",
    alt: "Cosechadora trabajando entre hileras de un cultivo",
    screenshot: "/images/commercial/platform-commercial.webp",
    screenshotHeight: 1368,
    productTitle: "Conoce qué hay disponible y de dónde viene.",
    productBody:
      "Une la oferta agrícola con la información de su origen y mantén a la vista el avance de cada pedido.",
    features: [
      "Oferta y disponibilidad agrícola",
      "Origen vinculado a cada parcela",
      "Pedidos y seguimiento comercial",
    ],
  },
];

const questions = [
  {
    title: "¿Qué puedo hacer en la demo?",
    answer:
      "Puedes explorar parcelas, registrar observaciones, revisar alertas y recorrer los flujos de financiación y comercialización según tu perfil. La demo guarda los cambios de prueba para mostrar cómo se conecta el trabajo entre las distintas vistas.",
  },
  {
    title: "¿La información que veo corresponde a campos reales?",
    answer:
      "No. Las capturas y la demo usan parcelas, indicadores y operaciones de ejemplo. No hay procesamiento satelital en vivo, evaluación crediticia automática ni pagos conectados. Un piloto permite definir qué información de tu operación necesitamos integrar.",
  },
  {
    title: "¿Puedo usar GeoHarvest desde mi teléfono?",
    answer:
      "Sí. La plataforma incluye una experiencia web para móvil donde puedes consultar parcelas, registrar observaciones y revisar alertas. Para enviar y actualizar información necesitas conexión a internet.",
  },
  {
    title: "¿Cómo empezamos un piloto con mi operación?",
    answer:
      "Escríbenos con tu perfil, cultivo, superficie aproximada y la necesidad que quieres resolver. Con esa información podremos conversar sobre el alcance, los datos necesarios y las condiciones del piloto.",
  },
];

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="gh-eyebrow">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

export function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeRole, setActiveRole] = useState(0);
  const menuButton = useRef<HTMLButtonElement>(null);
  const roleTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = audiences[activeRole];
  const navItems = [
    ["Soluciones", "#use-cases"],
    ["La plataforma", "#product"],
    ["Cómo funciona", "#how-it-works"],
  ];

  useEffect(() => {
    if (!mobileOpen) return;
    const close = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1001px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    window.addEventListener("keydown", close);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", close);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileOpen]);

  function navigateTabs(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % audiences.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + audiences.length) % audiences.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = audiences.length - 1;
    else return;
    event.preventDefault();
    setActiveRole(next);
    roleTabs.current[next]?.focus();
  }

  return (
    <div className="commercial-landing">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <header className="gh-header">
        <div className="gh-header__inner">
          <Brand />
          <nav className="gh-nav" aria-label="Navegación principal">
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="gh-header__actions">
            <a href={demoUrl()} className="gh-login">
              Entrar a la demo <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href="#contact" className="gh-button gh-button--green">
              Hablemos <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <button
            ref={menuButton}
            className="gh-menu-button"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {mobileOpen && (
          <nav
            id="mobile-navigation"
            className="gh-mobile-nav"
            aria-label="Navegación móvil"
          >
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileOpen(false)}>
                {label}
                <ChevronRight size={17} aria-hidden="true" />
              </a>
            ))}
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              Acceso con cuenta <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a href={demoUrl()} className="gh-button gh-button--green">
              Explorar demo <ArrowRight size={17} aria-hidden="true" />
            </a>
          </nav>
        )}
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="gh-hero" id="top" aria-labelledby="hero-heading">
          <img
            className="gh-hero__image"
            src="/images/commercial/hero-field.webp"
            alt="Vista aérea de maquinaria trabajando en un extenso campo de cultivo"
            width="1608"
            height="917"
            loading="eager"
          />
          <div className="gh-hero__shade" aria-hidden="true" />
          <div className="gh-hero__content">
            <Eyebrow>INTELIGENCIA QUE NACE EN EL CAMPO</Eyebrow>
            <h1 id="hero-heading">
              Tu campo.
              <br />
              Tu negocio.
              <br />
              <span>Más conectados.</span>
            </h1>
            <p className="gh-hero__lede">
              Reúne parcelas, trabajo de campo y oportunidades de negocio en una
              plataforma para producir, financiar y comercializar con más
              contexto.
            </p>
            <div className="gh-hero__actions">
              <a href={demoUrl()} className="gh-button gh-button--lime">
                Explorar la plataforma{" "}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
              <a href="#contact" className="gh-hero__contact">
                Hablar con el equipo <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <p className="gh-hero__note">
              <span aria-hidden="true" />
              Explora la demo con datos de ejemplo.
            </p>
          </div>
          <a className="gh-hero__story" href="#use-cases">
            <div className="gh-hero__story-icons" aria-hidden="true">
              <Sprout size={19} />
              <ShieldCheck size={19} />
              <Store size={19} />
            </div>
            <span>
              Una plataforma.
              <br />
              <strong>Conecta la cadena agrícola.</strong>
            </span>
            <ArrowDown size={20} aria-hidden="true" />
          </a>
          <div className="gh-hero__caption" aria-hidden="true">
            <span>DEL TERRITORIO A LA OPORTUNIDAD</span>
            <span>GEOHARVEST / 01</span>
          </div>
        </section>

        <section
          className="gh-value gh-shell"
          id="why-geoharvest"
          aria-label="Beneficios de GeoHarvest"
        >
          {[
            {
              icon: MapPinned,
              title: "Ve lo que importa",
              body: "Una referencia compartida por parcela.",
            },
            {
              icon: ClipboardCheck,
              title: "Da el siguiente paso",
              body: "Observaciones, alertas y acciones conectadas.",
            },
            {
              icon: Layers3,
              title: "Conecta tu operación",
              body: "Del trabajo de campo al seguimiento comercial.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div className="gh-value__item" key={title}>
              <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h2>{title}</h2>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </section>

        <section
          className="gh-audiences gh-shell gh-section"
          id="use-cases"
          aria-labelledby="audiences-heading"
        >
          <div className="gh-section-heading">
            <div>
              <Eyebrow>CRECEMOS DESDE EL MISMO CAMPO</Eyebrow>
              <h2 id="audiences-heading">
                Tres perspectivas.
                <br />
                <span>Más posibilidades.</span>
              </h2>
            </div>
            <p>
              Quien produce, quien financia y quien comercializa necesita mirar
              el mismo territorio. GeoHarvest conecta esas perspectivas.
            </p>
          </div>
          <div className="gh-role-grid">
            {audiences.map(
              (
                {
                  role,
                  name,
                  icon: Icon,
                  title,
                  description,
                  action,
                  image,
                  alt,
                },
                index,
              ) => (
                <article className="gh-role" key={role}>
                  <div className="gh-role__image">
                    <img
                      src={image}
                      alt={alt}
                      width="480"
                      height="300"
                      loading="lazy"
                    />
                    <span className="gh-role__badge">
                      <Icon size={15} aria-hidden="true" />
                      {name}
                    </span>
                    <span className="gh-role__number" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="gh-role__copy">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <a href={demoUrl(role)}>
                      {action}
                      <ArrowUpRight size={20} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <section
          className="gh-product gh-section"
          id="product"
          aria-labelledby="product-heading"
        >
          <div className="gh-shell">
            <div className="gh-section-heading">
              <div>
                <Eyebrow>MENOS INFORMACIÓN DISPERSA</Eyebrow>
                <h2 id="product-heading">
                  Todo empieza con
                  <br />
                  <span>una visión más clara.</span>
                </h2>
              </div>
              <p>
                Un espacio para entender el territorio, revisar lo que necesita
                atención y dar seguimiento a tu próximo movimiento.
              </p>
            </div>
            <div
              className="gh-product__tabs"
              role="tablist"
              aria-label="Explora la plataforma por perfil"
            >
              {audiences.map(({ role, name, icon: Icon }, index) => (
                <button
                  key={role}
                  type="button"
                  role="tab"
                  id={`tab-${role}`}
                  aria-controls={`panel-${role}`}
                  aria-selected={activeRole === index}
                  tabIndex={activeRole === index ? 0 : -1}
                  ref={(node) => {
                    roleTabs.current[index] = node;
                  }}
                  onClick={() => setActiveRole(index)}
                  onKeyDown={(event) => navigateTabs(event, index)}
                >
                  <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                  {name}
                  <ArrowUpRight
                    size={16}
                    className="gh-tab-arrow"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
            {audiences.map((audience, index) => (
              <div
                key={audience.role}
                id={`panel-${audience.role}`}
                role="tabpanel"
                aria-labelledby={`tab-${audience.role}`}
                hidden={activeRole !== index}
                tabIndex={0}
                className="gh-product__panel"
              >
                {activeRole === index && (
                  <>
                    <div className="gh-product__copy">
                      <span className="gh-demo-badge">
                        <span aria-hidden="true" />
                        ENTORNO DEMO
                      </span>
                      <h3>{audience.productTitle}</h3>
                      <p>{audience.productBody}</p>
                      <ul>
                        {audience.features.map((feature) => (
                          <li key={feature}>
                            <Check size={17} aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={demoUrl(audience.role)}
                        className="gh-button gh-button--lime"
                      >
                        Explorar como {audience.name.toLowerCase()}{" "}
                        <ArrowRight size={17} aria-hidden="true" />
                      </a>
                    </div>
                    <a
                      href={demoUrl(audience.role)}
                      className="gh-product__screen"
                      aria-label={`Abrir demo de ${audience.name.toLowerCase()}`}
                    >
                      <div className="gh-browser-bar" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                        <p>GeoHarvest · {audience.name}</p>
                        <ArrowUpRight size={14} />
                      </div>
                      <img
                        src={audience.screenshot}
                        alt={`Captura real de la plataforma GeoHarvest, vista de ${audience.name.toLowerCase()}, con datos de ejemplo`}
                        width="1440"
                        height={audience.screenshotHeight}
                        loading="lazy"
                      />
                      <span className="gh-product__screen-action">
                        Explora esta experiencia{" "}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </span>
                    </a>
                  </>
                )}
              </div>
            ))}
            <p className="gh-product__note">
              Capturas del producto actual. Parcelas, indicadores y operaciones
              de demostración; no representan resultados reales.
            </p>
          </div>
        </section>

        <section
          className="gh-workflow gh-shell gh-section"
          id="how-it-works"
          aria-labelledby="workflow-heading"
        >
          <div className="gh-mobile-showcase">
            <img
              className="gh-mobile-showcase__background"
              src="/images/field-rows.jpg"
              alt=""
              loading="lazy"
              width="1600"
              height="899"
            />
            <div className="gh-mobile-showcase__label">
              <Smartphone size={18} aria-hidden="true" />
              <span>CONTIGO, A PIE DE CAMPO.</span>
            </div>
            <div className="gh-phone">
              <img
                src="/images/commercial/mobile-field.webp"
                alt="Captura de la vista móvil de GeoHarvest con parcelas de demostración"
                loading="lazy"
                width="390"
                height="844"
              />
            </div>
            <div className="gh-mobile-showcase__tag">
              <span>
                <Check size={17} aria-hidden="true" />
              </span>
              <div>
                El campo sigue contigo.
                <small>Consulta y registra desde tu móvil.</small>
              </div>
            </div>
          </div>
          <div className="gh-workflow__copy">
            <Eyebrow>DEL MAPA A LA ACCIÓN</Eyebrow>
            <h2 id="workflow-heading">
              El trabajo no se queda
              <br />
              <span>en la oficina.</span>
            </h2>
            <p>
              Una experiencia que acompaña a tu equipo desde la revisión de una
              parcela hasta el seguimiento de una oportunidad.
            </p>
            <ol className="gh-steps">
              {[
                [
                  "Conoce tu territorio",
                  "Ubica las parcelas y consulta el contexto de cada cultivo.",
                ],
                [
                  "Registra lo que ocurre",
                  "Reúne observaciones de campo y revisa las alertas que requieren atención.",
                ],
                [
                  "Conecta el siguiente paso",
                  "Relaciona la información con solicitudes, oferta agrícola y operaciones.",
                ],
              ].map(([title, body], index) => (
                <li key={title}>
                  <span className="gh-steps__number">0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href={`${demoUrl("farmer")}&next=/mobile`}
              className="gh-inline-link"
            >
              Explorar la experiencia móvil{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          className="gh-faq gh-shell gh-section"
          aria-labelledby="faq-heading"
        >
          <div>
            <Eyebrow>ANTES DE DAR EL PRIMER PASO</Eyebrow>
            <h2 id="faq-heading">
              Hablemos
              <br />
              <span>con claridad.</span>
            </h2>
            <p>Lo que necesitas saber para empezar a explorar GeoHarvest.</p>
            <a href={PILOT_EMAIL} className="gh-inline-link">
              Contactar al equipo <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="gh-faq__list">
            {questions.map(({ title, answer }) => (
              <details key={title}>
                <summary>
                  {title}
                  <ChevronDown size={20} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="gh-contact"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="gh-contact__art" aria-hidden="true">
            <Leaf size={310} strokeWidth={0.65} />
          </div>
          <div className="gh-shell gh-contact__inner">
            <div>
              <Eyebrow>EL FUTURO SE CULTIVA EN EQUIPO</Eyebrow>
              <h2 id="contact-heading">
                Tu próxima oportunidad
                <br />
                empieza en el campo.
              </h2>
              <p>
                Cuéntanos qué cultivas, el tamaño de tu operación y qué
                necesitas resolver. Demos juntos el siguiente paso.
              </p>
            </div>
            <div className="gh-contact__actions">
              <a href={PILOT_EMAIL} className="gh-button gh-button--lime">
                Solicitar un piloto{" "}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
              <a
                href="mailto:support@geoharvest.org"
                className="gh-contact__email"
              >
                support@geoharvest.org
              </a>
              <span>Conversemos sobre tu operación.</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="gh-footer gh-shell">
        <div className="gh-footer__top">
          <div className="gh-footer__brand">
            <Brand footer />
            <p>
              Conectamos el territorio con las decisiones que hacen avanzar al
              campo.
            </p>
            <span>Del campo. Para el campo.</span>
          </div>
          <div>
            <h2>Explora</h2>
            <a href="#use-cases">Soluciones por perfil</a>
            <a href="#product">La plataforma</a>
            <a href="#how-it-works">Cómo funciona</a>
            <a href={demoUrl(selected.role)}>Abrir demo</a>
          </div>
          <div>
            <h2>Conversemos</h2>
            <a href="#contact">Solicitar un piloto</a>
            <a href={PILOT_EMAIL}>Contacto</a>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/register">Crear cuenta</Link>
          </div>
          <div>
            <h2>Información</h2>
            <Link to="/privacy">Privacidad de la demo</Link>
            <Link to="/terms">Uso de la demo</Link>
            <Link to="/forgot-password">Recuperar acceso</Link>
          </div>
        </div>
        <div className="gh-footer__bottom">
          <span>
            © {new Date().getFullYear()} GeoHarvest. Todos los derechos
            reservados.
          </span>
          <span>
            <span aria-hidden="true" />
            Creciendo con cada perspectiva.
          </span>
        </div>
      </footer>
    </div>
  );
}
