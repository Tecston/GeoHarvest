import { Link } from 'react-router-dom';
import { Brand } from '@/components/Brand';
import { demoUrl } from '@/lib/platform';

export function InformationPage({ kind }: { kind: 'privacy' | 'terms' | 'not-found' }) {
  return <main className="info-page"><Brand />{kind === 'privacy' ? <>
    <h1>Privacidad en esta demostración</h1>
    <p>Esta página describe el alcance de la demostración local de GeoHarvest. No sustituye el aviso de privacidad que deberá acompañar a un servicio de producción.</p>
    <h2>Explorar la demo</h2><p>La experiencia de ejemplo utiliza datos sintéticos. Evita introducir datos personales, financieros o documentos reales durante la demostración. Las acciones de la plataforma pueden conservarse en su base de datos de demostración.</p>
    <h2>Acceso con cuenta</h2><p>Los formularios de cuenta solo se habilitan cuando el administrador configura Supabase. En ese caso, el correo, la contraseña y el nombre de registro se envían al servicio de autenticación configurado. La sesión se almacena en este navegador. Puedes cerrarla desde la página de acceso.</p>
    <h2>Contacto</h2><p>El botón de piloto abre tu aplicación de correo. Puedes escribir a <a href="mailto:support@geoharvest.org">support@geoharvest.org</a> para consultar el manejo de información antes de compartir datos de una operación real.</p>
  </> : kind === 'terms' ? <>
    <h1>Alcance de uso de la demo</h1>
    <p>GeoHarvest se presenta como una demostración de inteligencia territorial y operativa enfocada en agricultura. Este texto explica el entorno actual y no constituye los términos definitivos de un servicio comercial.</p>
    <h2>Datos y resultados</h2><p>Las parcelas, observaciones e indicadores de demostración son sintéticos. No representan monitoreo satelital en vivo, una evaluación financiera validada ni una recomendación agronómica.</p>
    <h2>Exploración y piloto</h2><p>Puedes recorrer las vistas por perfil y probar las acciones disponibles con datos de ejemplo. Las condiciones de un piloto, sus fuentes de datos y las responsabilidades deben acordarse con el equipo antes de utilizar información real.</p>
    <h2>Contacto</h2><p>Solicita información en <a href="mailto:support@geoharvest.org">support@geoharvest.org</a>.</p>
  </> : <><h1>No encontramos esa página.</h1><p>Vuelve al inicio o continúa a la plataforma para explorar GeoHarvest.</p></>}
    <Link className="button button--dark" to="/">Volver al inicio</Link>{kind === 'not-found' && <a className="button button--ghost" href={demoUrl()}>Abrir la demo</a>}
  </main>;
}
