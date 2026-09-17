# GeoHarvest — Landing

Sitio de presentación de GeoHarvest y punto de entrada a la plataforma de inteligencia territorial y operativa para agricultura. Conserva React, TypeScript, Vite y Tailwind del proyecto existente.

## Ejecutar localmente

Requisitos: Node.js 20.19+ o 22+ y npm.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev -- --host 127.0.0.1 --port 5173
```

Abre http://127.0.0.1:5173. La plataforma se ejecuta por separado en el directorio hermano `geoharvest`, puerto 3000. Consulta su README para iniciar el entorno completo.

No necesitas Supabase para recorrer la landing o entrar a la demo. La demo requiere que la plataforma esté ejecutándose.

## Configuración

| Variable | Uso |
| --- | --- |
| `VITE_PLATFORM_URL` | URL base de plataforma. Por defecto `http://localhost:3000` en desarrollo y `https://app.geoharvest.org` en producción. |
| `VITE_SUPABASE_URL` | Opcional: URL del proyecto Supabase para el servicio de cuentas existente. |
| `VITE_SUPABASE_ANON_KEY` | Opcional: clave pública anon/publishable. Nunca usar una clave service_role. |

Las variables Vite se incorporan al construir el sitio; reinicia el servidor al cambiarlas. No publiques el valor localhost de `.env.example` en una compilación de producción. Define allí `VITE_PLATFORM_URL=https://app.geoharvest.org` o la URL autorizada para el entorno.

## Rutas y entradas

- `/`: landing comercial con soluciones por perfil, capturas del producto, preguntas frecuentes y entrada a demo.
- `/login`, `/register`: acceso con cuenta y registro existentes, consolidados visualmente.
- `/forgot-password`, `/reset-password`: recuperación de acceso para Supabase configurado.
- `/privacy`, `/terms`: alcance informativo de la demo; no son documentos legales definitivos de producción.
- Cualquier ruta desconocida muestra una página de recuperación de navegación.

Las entradas por perfil llevan a `/login?role=farmer`, `/login?role=financier` o `/login?role=commercial` en la plataforma. Esto preselecciona el perfil; no autentica ni concede permisos. La confirmación de entrada corresponde a la plataforma.

## Servicio de cuentas opcional

Si faltan variables válidas, los formularios quedan deshabilitados con una explicación y un enlace a la demo. No se crea un cliente ficticio ni se envían solicitudes a un host placeholder.

Para probar autenticación real configura Supabase, habilita el proveedor de correo y agrega las URL de redirección de cada entorno a la lista permitida:

- `http://127.0.0.1:5173/login`
- `http://127.0.0.1:5173/reset-password`
- Equivalentes del dominio real de la landing.

Las sesiones del servicio de cuentas se conservan únicamente en el origen de la landing mediante el almacenamiento soportado por Supabase. **No hay SSO con la demo de la plataforma**. La integración de identidad de producción entre ambos proyectos queda pendiente. Registro y recuperación necesitan un servicio de correo Supabase configurado.

## Verificar y construir

```powershell
npm run typecheck
npm run build
npm run start -- --host 127.0.0.1
```

`build` ejecuta TypeScript y genera `dist/`. `start` sirve la compilación existente en el puerto de preview de Vite (4173 por defecto). `npm run preview` vuelve a construir antes de servir.

Se conserva la configuración Cloudflare Pages en `wrangler.toml`. Configura fallback SPA a `index.html` si usas otro hosting para que funcionen las rutas directas. No se publicó ni desplegó el sitio durante esta implementación.

## Estructura

- `components/landing/LandingPage.tsx`: portada comercial y selector accesible de las tres perspectivas del producto.
- `components/landing/commercial.css`: estilos de la landing, aislados de las páginas de cuenta.
- `components/AuthScreen.tsx`: formulario común de acceso, registro y recuperación.
- `components/Brand.tsx`: logo original compartido.
- `context/AuthContext.tsx`: sesión opcional y gestión de errores.
- `lib/platform.ts`: contrato de enlaces a plataforma.
- `app/globals.css`: sistema visual existente y ajustes de MVP.
- `public/images/`: activos originales reutilizados.
- `docs/AUDIT_IMPLEMENTATION.md`: auditoría, decisiones y validación.
- `docs/COMMERCIAL_REFRESH.md`: comparación con el ZIP/repositorio de referencia y cambios comerciales.
- `docs/screenshots/`: capturas reales en escritorio, tablet y móvil.

Los componentes históricos no usados por la ruta principal permanecen disponibles para conservar trabajo útil; no se activan los planes comerciales ni las integraciones de plantilla.

## Presentación comercial

La portada conserva el logo original, usa fotografía agrícola local optimizada y muestra capturas reales de la plataforma en un entorno de demostración. El selector Agricultor / Financiador / Comercializador cambia la captura, los beneficios y el enlace de entrada. Se puede operar con clic, flechas, Inicio y Fin. Las preguntas frecuentes usan controles nativos y el menú móvil admite Escape.

Las llamadas a explorar abren la plataforma configurada; el contacto comercial abre el cliente de correo con `support@geoharvest.org`. La landing no simula envíos de formularios ni ofrece cobros, precios o rentabilidad garantizada.
