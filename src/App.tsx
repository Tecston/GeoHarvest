import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { ThemeProvider } from '@/context/providers';
import { AuthProvider } from '@/context/AuthContext';

const AuthScreen = lazy(() => import('@/components/AuthScreen').then(module => ({ default: module.AuthScreen })));
const InformationPage = lazy(() => import('@/pages/InformationPage').then(module => ({ default: module.InformationPage })));

const titles: Record<string, string> = {
  '/': 'GeoHarvest | Tu campo y tu negocio, más conectados',
  '/login': 'Iniciar sesión | GeoHarvest',
  '/register': 'Crear cuenta | GeoHarvest',
  '/forgot-password': 'Recuperar acceso | GeoHarvest',
  '/reset-password': 'Nueva contraseña | GeoHarvest',
  '/privacy': 'Privacidad de la demo | GeoHarvest',
  '/terms': 'Uso de la demo | GeoHarvest',
};

function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = titles[pathname] ?? 'Página no encontrada | GeoHarvest';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return <ThemeProvider><AuthProvider><PageMetadata /><Suspense fallback={<main className="info-page"><p role="status">Cargando GeoHarvest…</p></main>}><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<AuthScreen key="login" mode="login" />} />
    <Route path="/register" element={<AuthScreen key="register" mode="register" />} />
    <Route path="/forgot-password" element={<AuthScreen key="forgot" mode="forgot" />} />
    <Route path="/reset-password" element={<AuthScreen key="reset" mode="reset" />} />
    <Route path="/privacy" element={<InformationPage kind="privacy" />} />
    <Route path="/terms" element={<InformationPage kind="terms" />} />
    <Route path="*" element={<InformationPage kind="not-found" />} />
  </Routes></Suspense></AuthProvider></ThemeProvider>;
}
