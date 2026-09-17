# Ajuste comercial de GeoHarvest

Fecha de revisión: 17 de septiembre de 2026.

## Fuentes y comparación

- ZIP proporcionado: `C:\Users\User\Downloads\GeoHarvest-main.zip`.
- Repositorio: <https://github.com/Tecston/GeoHarvest.git>.
- Referencia revisada: [`d8492c81f1bab874d21490ccd643badd84bd159f`](https://github.com/Tecston/GeoHarvest/tree/d8492c81f1bab874d21490ccd643badd84bd159f), rama `main`, commit del 23 de abril de 2025.

El ZIP contiene seis archivos y dos entradas de directorio. Los seis archivos coinciden **byte por byte**, mediante SHA-256, con el commit revisado. No se encontraron etiquetas de versión, README ni archivo LICENSE. El material se inspeccionó y extrajo en un directorio nuevo de referencia, sin sobrescribir ninguno de los proyectos existentes.

## Aportes seleccionados para la landing

| Fuente del material original | Aporte comercial aprovechable |
| --- | --- |
| `index.html:48–140` | Explicar el problema desde las decisiones del productor y la necesidad de visibilidad por parcela. |
| `dashboard.html:1358–1698` | Diferenciar el valor para agricultor, financiador y comercializador. |
| `index.html:437–495` | Dar protagonismo a una vista del producto y a un CTA para explorar la demostración. |
| `assets/demo-data.js` | Comprender escenarios de campo, evaluación y comercialización; conservar su naturaleza sintética. |

La adaptación destaca capacidades comprobables de la plataforma local: consultar parcelas, registrar observaciones, atender alertas, revisar solicitudes, publicar producción y seguir pedidos. La dirección de mensaje es **conocer el campo y respaldar decisiones con contexto**, sin prometer resultados económicos. Se conservan el logo y los activos originales y se enlaza la demostración funcional actual.

## Afirmaciones descartadas como promesas públicas

- Ahorro de agua del 18%, mejora de rendimiento del 12.5%, ROI del 39.5% o 100.1% e ingresos proyectados.
- Precio de $1,063,000 MXN, recuperación en menos de 12 meses, entrega en cuatro meses, garantías y prueba gratuita de 30 días.
- Afiliaciones con MIT, Oxford, ITESM o Stanford; certificaciones, experiencia del equipo y métricas de clientes sin evidencia adicional.
- Predicciones satelitales, detección automática de plagas, recomendaciones de IA, clima en vivo o scoring validado como integraciones terminadas.

Estas afirmaciones aparecen en `index.html:144–436`, `dashboard.html` y `assets/demo-data.js`, pero el repositorio no aporta validación. `dashboard.js:612–660` y `dashboard.js:964–1003` simulan indicadores con valores aleatorios; el clima se define estáticamente desde `dashboard.js:865`. El prototipo no contiene backend, autenticación ni procesamiento satelital. La imagen referenciada `assets/dashboard-preview.jpg` tampoco está incluida.

## Alcance

El trabajo se limita al ajuste de la **landing local existente**, utilizando el material como referencia comercial y conectando con el producto demostrable. No sustituye la plataforma, no incorpora el dashboard estático como producto operativo y no publica ni despliega el sitio. Las capturas o indicadores de demostración deben identificarse como tales.

## Cambios implementados

- Portada fotográfica con el mensaje «Tu campo. Tu negocio. Más conectados.» y accesos a plataforma y contacto.
- Verde profundo, acentos lima y fondo claro; estilos limitados a la landing para conservar los formularios existentes.
- Tres tarjetas de solución según el perfil, con acceso a la demo correspondiente.
- Selector accesible de agricultor, financiador y comercializador, con capturas reales de la plataforma local y beneficios específicos.
- Experiencia móvil mostrada con una captura real, recorrido de uso y preguntas frecuentes sobre alcance y pilotos.
- Llamadas a solicitar un piloto mediante el correo existente y metadatos comerciales actualizados.
- Cinco activos WebP: fotografía principal de 330 KB y capturas de 26–80 KB. Las capturas se comprimieron sin pérdida; los originales permanecen intactos.

La búsqueda de inspiración con 21st devolvió HTTP 401. No se descargaron componentes ni se incorporaron dependencias; la solución utiliza los componentes y recursos locales.

## Validación

- Compilación de producción y comprobación de TypeScript correctas (`npm run build`).
- Navegación por los tres perfiles con clic y teclado; enlaces a la plataforma comprobados.
- Trece comprobaciones de navegador correctas, incluido el acceso desde el CTA móvil a `/mobile` después de seleccionar Agricultor.
- Menú móvil, retorno de foco con Escape, anclas, preguntas frecuentes y rutas de cuenta/información verificados.
- Sin desbordamiento horizontal a 320, 390, 768, 1024 y 1440 px; imágenes cargadas y sin errores de consola o ejecución en la revisión final.
- Capturas reales revisadas en `docs/screenshots/commercial-*.png`. Informe de navegador en `docs/qa/commercial-qa-results.json`.

El control de navegador puede repetirse con `node docs/qa/commercial-qa.mjs`; requiere el proyecto hermano `geoharvest` con Playwright instalado, Chrome y ambos servidores locales en funcionamiento. La configuración de datos y las limitaciones de producción de la plataforma permanecen documentadas en su proyecto.
