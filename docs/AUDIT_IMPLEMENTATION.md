# Landing GeoHarvest — Auditoría e implementación

Fecha: 16 septiembre 2026 (America/Phoenix).

## Estado inicial y decisiones

El directorio conservaba una migración Next.js → React 18 + Vite 6 + TypeScript + Tailwind 3. El repositorio ya contenía numerosos cambios sin commit. Las fuentes no generadas del archivo `landingpage.zip` coincidían con las del directorio. No se reemplazó la raíz, no se revirtió trabajo previo y no se realizó commit.

| Área | Decisión | Resultado |
| --- | --- | --- |
| React, Vite, TypeScript, Router | KEEP | Se conserva arquitectura existente. |
| Identidad e imágenes | KEEP | Logo de hoja original y fotografías locales reutilizados. |
| Landing editorial | REFACTOR | Ocho secciones: presentación, problema, producto, funcionamiento, perfiles, valor, validación, contacto. |
| Navegación y CTAs | REFACTOR | Demo conectada a plataforma; anclas principales y contacto conservados. |
| Preview visual | REFACTOR | Datos sintéticos visibles y sin botón decorativo inerte. |
| Formularios de cuenta | REFACTOR | UI compartida, validación, estados, mensajes en español, sesión y guardas. |
| Recuperación, páginas informativas, 404 | CREATE | Rutas con navegación utilizable. |
| Componentes históricos | KEEP | Fuera de la ruta activa; conservados para evitar pérdida de trabajo. |
| SEO/accesibilidad | REFACTOR | Metadatos sociales, favicon, títulos por ruta, skip link, focus, Escape, labels y reduced-motion. |
| Publicación | Pendiente | Se conserva Cloudflare Pages; no se desplegó. |

No se alteraron enlaces Figma. Se preservó `mailto:support@geoharvest.org?subject=GeoHarvest%20pilot%20interest` y el enlace LinkedIn existente, aunque sigue apuntando al dominio genérico y debe sustituirse únicamente con una URL verificada del propietario. Los enlaces legales `#` se reemplazaron por páginas informativas locales explícitas, porque eran acciones sin destino útil.

## Contrato de plataforma

`lib/platform.ts` resuelve `VITE_PLATFORM_URL` o usa `http://localhost:3000` en desarrollo y `https://app.geoharvest.org` en producción. Solo acepta URL HTTP(S), sin credenciales. Limpia query/hash del base configurado. Los CTA por rol usan `/login?role=farmer|financier|commercial` y requieren entrada explícita en plataforma. El parámetro no es una autorización.

## Cuenta y demo

El servicio Supabase previo se mantiene opcional. No se crea cliente si falta configuración válida. Se retiraron las cookies fijadas a localhost y redirecciones inconsistentes al puerto 3001. El SDK usa almacenamiento soportado y la sesión queda limitada al origen de la landing. No se implementó ni se afirma SSO con la plataforma.

Implementados en código: inicio y cierre de sesión, registro con confirmación de correo cuando aplica, solicitud de recuperación y actualización de contraseña para sesión válida. Sin credenciales de servicio no se ejecutó el envío de correos ni un flujo de autenticación externo. El backend de demo de plataforma es independiente.

## Referencia visual

Se aplicó `21st-ui-build` reutilizando el sistema editorial existente y los assets de la marca. El catálogo de 21st devolvió HTTP401 durante el trabajo principal; no se incorporaron dependencias ni diseños remotos. `21st review` terminó con 45 observaciones informativas sobre colores literales del CSS existente, sin errores ni autofixes. Los tokens activos y la decisión se actualizaron en `.21st/design.json` y `.21st/DESIGN.md`.

El preview representa la experiencia con información sintética, no un motor satelital activo. No se afirma fidelidad completa a todas las pantallas Figma desde esta landing; la matriz de producto se documenta en el proyecto principal.

## Verificación realizada

| Comprobación | Resultado |
| --- | --- |
| Build inicial | PASS: JS principal 446.19 KB / 137.39 KB gzip; CSS 74.75 KB / 15.84 KB gzip. |
| Build después de implementación | PASS: JS inicial 295.82 KB / 89.97 KB gzip; cuenta e información cargan por separado. |
| TypeScript | PASS, incluido en build y ejecutado separadamente. |
| Estructura en navegador | Un h1, ocho secciones, ningún enlace `href="#"`. |
| Desktop 1440×1000 | Inspeccionado visualmente; sin desbordamiento horizontal. |
| Tablet 768×1024 | Inspeccionado visualmente; sin desbordamiento horizontal. |
| Mobile 390×844 | Inspeccionado visualmente; sin desbordamiento horizontal. |
| Menú móvil | Abre, expone enlaces, cierra con Escape y devuelve foco. |
| Perfiles | URLs farmer, financier y commercial verificadas en DOM. |
| Imágenes | Sin imágenes cargadas rotas; carga diferida de imágenes de perfiles verificada al navegar. |
| Cuenta sin configuración | Inputs y envío deshabilitados, explicación visible y demo accesible. |
| Recuperación | Navegación login → forgot-password comprobada; reset sin sesión no permite envío. |
| Rutas auxiliares | Registro, privacidad, uso de demo y fallback 404 navegados y comprobados en navegador. |
| Consola | Sin errores de aplicación observados. Flags de compatibilidad del Router aplicados para eliminar sus avisos. |

Estas verificaciones no reemplazan una prueba de autenticación con Supabase real ni una auditoría completa de accesibilidad. La transición landing → /login?role=farmer se comprobó en navegador con preselección visible. Se detectó un rechazo de origen en la entrada de plataforma y se comunicó al equipo principal, que aplicó una corrección. Las mutaciones de plataforma y la regresión de esa corrección se validan en el proyecto principal.

## Capturas reales

- `screenshots/landing-desktop.png` — hero en 1440×1000.
- `screenshots/landing-tablet.png` — hero en 768×1024.
- `screenshots/landing-mobile.png` — hero en 390×844.
- `screenshots/landing-roles.png` — perfiles en desktop.
- `screenshots/login-mobile.png` — cuenta sin servicio configurado.

## Limitaciones y siguiente paso

1. Configurar y probar correo/auth Supabase si se decide mantener este proveedor para producción; unificar identidad con la plataforma antes de habilitar cuentas reales.
2. Revisar y aprobar avisos legales definitivos y URL pública canónica antes de publicar. Se omitió canonical para no inventar dominio de la landing.
3. Confirmar URL LinkedIn de GeoHarvest; se conserva la original genérica.
4. Validar analítica/consentimiento y captación si se requieren; el contacto actual abre correo, no crea un lead de backend.
5. Las imágenes y preview existentes son material de presentación. Las métricas de la demo no son observaciones satelitales procesadas.
6. CSS y componentes históricos siguen presentes; una depuración futura puede reducir estilos después de decidir qué piezas se conservarán para otras páginas.


`git diff --check` detectó únicamente espacios al final de línea en `components/Team.tsx:69` y `components/WhoWeHelp.tsx:83`, cambios previos ajenos a esta intervención. El chequeo de los archivos modificados en esta ejecución pasa.
