import { Link } from 'react-router-dom';

export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link to="/" className={`brand ${footer ? 'brand--footer' : ''}`} aria-label="GeoHarvest, inicio"><img src="/images/Logo.png" width="28" height="48" alt="" /><span>Geo<span className="brand__accent">Harvest</span></span></Link>;
}
