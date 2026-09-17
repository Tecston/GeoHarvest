import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Brand } from '@/components/Brand';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { demoUrl } from '@/lib/platform';

type AuthMode = 'login' | 'register' | 'forgot' | 'reset';
const content: Record<AuthMode, { title: string; description: string; submit: string }> = {
  login: { title: 'Bienvenido a GeoHarvest', description: 'Inicia sesión con tu cuenta para continuar.', submit: 'Iniciar sesión' },
  register: { title: 'Crea tu cuenta', description: 'Conecta con una nueva perspectiva de tu campo.', submit: 'Crear cuenta' },
  forgot: { title: 'Recupera tu acceso', description: 'Te enviaremos un enlace para restablecer tu contraseña.', submit: 'Enviar enlace' },
  reset: { title: 'Tu nueva contraseña', description: 'Elige una contraseña de al menos ocho caracteres.', submit: 'Guardar contraseña' },
};

function accountError(message: string): string {
  if (/invalid login credentials/i.test(message)) return 'El correo o la contraseña no son correctos.';
  if (/email not confirmed/i.test(message)) return 'Confirma tu correo electrónico antes de iniciar sesión.';
  if (/rate limit|too many/i.test(message)) return 'Has realizado varios intentos. Espera unos minutos y vuelve a intentar.';
  if (/already registered|already exists/i.test(message)) return 'Esta cuenta ya existe. Inicia sesión o recupera tu acceso.';
  if (/password/i.test(message)) return 'La contraseña no cumple los requisitos del servicio. Prueba con una contraseña más segura.';
  if (/expired|invalid.*token|session.*missing/i.test(message)) return 'El enlace ya no es válido. Solicita un nuevo enlace de recuperación.';
  return 'No pudimos completar la solicitud. Revisa tus datos y vuelve a intentar.';
}

export function AuthScreen({ mode }: { mode: AuthMode }) {
  const { user, loading: sessionLoading, error: sessionError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [recoverySession, setRecoverySession] = useState(false);
  const configured = Boolean(supabase);
  const copy = content[mode];

  useEffect(() => {
    if (!supabase || mode !== 'reset') return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' && session) setRecoverySession(true);
    });
    // Existing valid sessions can change their password; invalid links still require login.
    supabase.auth.getSession().then(({ data }) => setRecoverySession(Boolean(data.session))).catch(() => setRecoverySession(false));
    return () => subscription.unsubscribe();
  }, [mode]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || pending) return;
    setError(null); setSuccess(null);
    if ((mode === 'register' || mode === 'reset') && password.length < 8) {
      setError('Usa una contraseña de al menos ocho caracteres.'); return;
    }
    if (mode === 'reset' && password !== confirmation) {
      setError('Las contraseñas no coinciden.'); return;
    }
    setPending(true);
    try {
      if (mode === 'login') {
        const result = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (result.error) throw result.error;
        setSuccess('Tu sesión está activa. Puedes continuar a la demo de la plataforma.');
      } else if (mode === 'register') {
        const result = await supabase.auth.signUp({ email: email.trim(), password, options: { data: { full_name: name.trim() }, emailRedirectTo: `${window.location.origin}/login` } });
        if (result.error) throw result.error;
        setSuccess(result.data.session ? 'Cuenta creada y sesión activa.' : 'Revisa tu correo para confirmar la cuenta. Si ya existe, inicia sesión o recupera tu acceso.');
      } else if (mode === 'forgot') {
        const result = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
        if (result.error) throw result.error;
        setSuccess('Si existe una cuenta con este correo, recibirás un enlace de recuperación. Revisa también la carpeta de correo no deseado.');
      } else {
        const result = await supabase.auth.updateUser({ password });
        if (result.error) throw result.error;
        setSuccess('Tu contraseña se guardó correctamente.');
      }
      setPassword(''); setConfirmation('');
    } catch (issue) { setError(accountError(issue instanceof Error ? issue.message : String((issue as { message?: string })?.message ?? issue))); }
    finally { setPending(false); }
  }

  async function signOut() {
    if (!supabase) return;
    setPending(true); setError(null);
    try { const result = await supabase.auth.signOut(); if (result.error) throw result.error; setSuccess(null); }
    catch { setError('No pudimos cerrar la sesión. Vuelve a intentar.'); }
    finally { setPending(false); }
  }

  const showSession = Boolean(user) && (mode === 'login' || mode === 'register');
  const blockedReset = mode === 'reset' && !sessionLoading && !recoverySession && !user;

  return <main className="auth-page">
    <aside className="auth-story"><Brand /><div><h2>El campo tiene mucho que contarte.</h2><p>Reúne el contexto de tus parcelas y convierte las observaciones en acciones con seguimiento.</p></div><p>GeoHarvest · Inteligencia territorial y operativa</p></aside>
    <section className="auth-panel" aria-labelledby="auth-title"><Brand /><h1 id="auth-title">{copy.title}</h1><p className="auth-description">{copy.description}</p>
      {!configured && <div className="auth-notice"><p>El acceso con cuenta requiere que el administrador conecte el servicio de autenticación. Mientras tanto, puedes <a href={demoUrl()}>explorar la demo sin crear una cuenta</a>.</p></div>}
      {sessionLoading && <p role="status" className="auth-description">Comprobando tu sesión…</p>}
      {sessionError && <p role="alert" className="auth-error">{sessionError}</p>}
      {error && <p role="alert" className="auth-error" id="auth-error">{error}</p>}
      {success && <p role="status" className="auth-success">{success}</p>}
      {showSession ? <div className="auth-notice"><p>Sesión activa: {user?.email}</p><p>La demo utiliza su propio entorno de ejemplo.</p><button type="button" className="button button--ghost" disabled={pending} onClick={signOut}>Cerrar sesión</button></div> : <form className="auth-form" onSubmit={onSubmit} aria-busy={pending} aria-describedby={error ? 'auth-error' : undefined}>
        {mode === 'register' && <div className="auth-field"><label htmlFor="full-name">Nombre completo</label><input id="full-name" name="name" autoComplete="name" required minLength={2} maxLength={100} value={name} onChange={event => setName(event.target.value)} disabled={!configured || pending} /></div>}
        {mode !== 'reset' && <div className="auth-field"><label htmlFor="email">Correo electrónico</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} placeholder="tu@correo.com" disabled={!configured || pending} /></div>}
        {(mode === 'login' || mode === 'register' || mode === 'reset') && <div className="auth-field"><label htmlFor="password">{mode === 'reset' ? 'Nueva contraseña' : 'Contraseña'}</label><input id="password" name="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required minLength={mode === 'login' ? 1 : 8} maxLength={128} value={password} onChange={event => setPassword(event.target.value)} disabled={!configured || pending || blockedReset} />{mode !== 'login' && <span className="auth-help">Al menos ocho caracteres.</span>}</div>}
        {mode === 'reset' && <div className="auth-field"><label htmlFor="confirm-password">Confirma tu contraseña</label><input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} value={confirmation} onChange={event => setConfirmation(event.target.value)} disabled={!configured || pending || blockedReset} /></div>}
        {blockedReset && configured && <p className="auth-error">Abre el enlace de recuperación enviado a tu correo para continuar.</p>}
        <button type="submit" className="button button--dark" disabled={!configured || pending || sessionLoading || blockedReset}>{pending ? 'Procesando…' : copy.submit}</button>
      </form>}
      <div className="auth-links">{mode === 'login' && <><Link to="/forgot-password">¿Olvidaste tu contraseña?</Link><span>¿Aún no tienes cuenta? <Link to="/register">Regístrate</Link></span></>}{mode === 'register' && <span>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></span>}{(mode === 'forgot' || mode === 'reset') && <><Link to="/login">Volver a iniciar sesión</Link>{mode === 'reset' && <Link to="/forgot-password">Solicitar un nuevo enlace</Link>}</>}</div>
      <hr className="auth-divider" /><a className="button button--ghost auth-demo" href={demoUrl()}>Explorar la demo <ArrowRight size={16} aria-hidden="true" /></a><p className="auth-demo-note">Datos sintéticos · Elige tu rol al entrar</p>
    </section>
  </main>;
}

