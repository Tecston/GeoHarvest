import { MapPinned, Satellite, Sprout } from "lucide-react";

type FieldVisualProps = { compact?: boolean; className?: string; imageSrc?: string; imageAlt?: string };

export function FieldVisual({ compact = false, className = "", imageSrc = "/images/zonaprod.jpeg", imageAlt = "Vista satelital de campos agrícolas con un área prioritaria destacada" }: FieldVisualProps) {
  return (
    <div className={`field-visual ${compact ? "field-visual--compact" : ""} ${className}`}>
      <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" loading={compact ? "lazy" : "eager"} />
      <div className="field-visual__wash" aria-hidden="true" />
      <div className="field-visual__boundary field-visual__boundary--one" aria-hidden="true" />
      <div className="field-visual__boundary field-visual__boundary--two" aria-hidden="true" />
      <div className="field-visual__priority" aria-hidden="true"><span /></div>
      <div className="field-visual__label"><span className="field-visual__dot" /><span>Zona de atención · ejemplo</span></div>
      {!compact && <div className="field-visual__meta"><span>Campo 04</span><span className="field-visual__meta-divider" /><span className="text-mint">Datos de ejemplo</span></div>}
    </div>
  );
}

export function ProductWorkspace() {
  return (
    <div className="product-workspace" aria-label="Vista ilustrativa de GeoHarvest con datos sintéticos">
      <div className="product-workspace__topbar"><div className="flex items-center gap-2"><span className="product-workspace__brand-mark"><Sprout size={13} /></span><span className="text-[11px] font-semibold tracking-[-0.01em] text-ink">GeoHarvest</span></div><div className="hidden items-center gap-5 text-[10px] font-medium text-stone-500 sm:flex"><span>Resumen</span><span className="text-ink">Campos</span><span>Actividad</span></div><div className="product-workspace__avatar">GH</div></div>
      <div className="product-workspace__body"><aside className="product-workspace__sidebar"><div className="mb-7 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.12em] text-stone-400"><Satellite size={11} /> Monitoreo</div><div className="product-workspace__side-item product-workspace__side-item--active"><span /> Todos los campos <b>12</b></div><div className="product-workspace__side-item"><span /> Requieren revisión <b>03</b></div><div className="product-workspace__side-item"><span /> Actividad reciente</div><div className="mt-auto hidden border-t border-stone-200/70 pt-4 text-[9px] text-stone-400 sm:block">Observación de ejemplo<br /><strong className="font-medium text-stone-600">14 sep 2026</strong></div></aside>
        <div className="product-workspace__content"><div className="mb-5 flex items-end justify-between"><div><p className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-stone-400">Monitoreo de campo</p><h3 className="text-[20px] font-semibold tracking-[-0.04em] text-ink sm:text-[25px]">Operación Sur de Sonora</h3></div><span className="demo-label">DEMO ILUSTRATIVA</span></div><div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(190px,.6fr)]"><div className="product-workspace__map-wrap"><FieldVisual compact /><div className="product-workspace__map-caption"><MapPinned size={12} /> 12 campos monitoreados</div></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><div className="product-stat"><div className="product-stat__label"><span className="product-stat__status product-stat__status--green" /> Atención actual</div><strong>03 áreas</strong><p>Marcadas para una revisión más cercana</p></div><div className="product-stat"><div className="product-stat__label"><span className="product-stat__status product-stat__status--amber" /> Señal reciente</div><strong>Campo 04</strong><p>Observación sintética para revisión</p></div></div></div><div className="product-workspace__timeline"><div className="flex items-center justify-between text-[9px] text-stone-400"><span>Actividad del campo</span><span>01 sep — 14 sep</span></div><div className="product-workspace__sparkline"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div></div>
      </div>
    </div>
  );
}

export function ParcelCluster() {
  return <div className="parcel-cluster" aria-hidden="true"><span className="parcel parcel--a" /><span className="parcel parcel--b" /><span className="parcel parcel--c" /><span className="parcel parcel--d" /><span className="parcel parcel--e" /><span className="parcel parcel--f" /><span className="parcel parcel--g" /><span className="parcel parcel--h" /><span className="parcel parcel--i" /><span className="parcel-cluster__pulse" /></div>;
}

