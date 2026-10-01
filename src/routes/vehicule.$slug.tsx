import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Fuel, Gauge, MessageCircle, Palette, Settings2, ShieldCheck, X, Zap } from "lucide-react";
import { LoanCalculator } from "@/components/site/LoanCalculator";
import { formatMileage, formatPrice } from "@/lib/vehicles";
import { useVehicleBySlug } from "@/lib/vehicle-api";

export const Route = createFileRoute("/vehicule/$slug")({
  component: VehicleDetail,
  notFoundComponent: NotFound,
  head: () => ({
    meta: [{ title: "Vehicul — Teo Select Auto" }],
  }),
});

// Helper: detectează YouTube și extrage ID-ul
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-4xl font-semibold">Vehicul indisponibil</h1>
      <p className="mt-4 text-muted-foreground">Acest vehicul nu mai este în stoc.</p>
      <Link to="/vehicule" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
        Înapoi la stoc
      </Link>
    </div>
  );
}

function VehicleDetail() {
  const { slug } = Route.useParams();
  const { data: v, isLoading } = useVehicleBySlug(slug);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return <div className="mx-auto max-w-2xl px-6 py-32 text-center text-muted-foreground">Se încarcă...</div>;
  }
  if (!v) return <NotFound />;

  const wa = `https://wa.me/40760323331?text=${encodeURIComponent(`Bună, sunt interesat de ${v.brand} ${v.model} (${v.year}) — ${formatPrice(v.price)}`)}`;
  const total = v.images.length;
  const go = (dir: 1 | -1) => setActiveImg((i) => (i + dir + total) % total);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null || total < 2) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current && v.images.length > 0) {
      const currentIndex = activeImg;
      let newIndex;
      if (direction === 'left') {
        newIndex = currentIndex === 0 ? v.images.length - 1 : currentIndex - 1;
      } else {
        newIndex = currentIndex === v.images.length - 1 ? 0 : currentIndex + 1;
      }
      
      setActiveImg(newIndex);
      
      const container = scrollContainerRef.current;
      const thumbnails = container.querySelectorAll('button');
      if (thumbnails[newIndex]) {
        thumbnails[newIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  const ytId = v.videoUrl ? getYouTubeId(v.videoUrl) : null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <nav className="mb-8 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Acasă</Link>
        <span className="mx-2">/</span>
        <Link to="/vehicule" className="hover:text-primary">Vehicule</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/80">{v.brand} {v.model}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <div
            className="group relative overflow-hidden rounded-3xl border border-border bg-card"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {v.images[activeImg] ? (
              <>
                <button
                  type="button"
                  onClick={() => setLightbox(true)}
                  className="block w-full"
                  aria-label="Mărește imaginea"
                >
                  <img
                    src={v.images[activeImg]}
                    alt={`${v.brand} ${v.model}`}
                    width={1200}
                    height={900}
                    loading="eager"
                    decoding="async"
                    className="aspect-[4/3] w-full cursor-zoom-in object-cover"
                  />
                </button>
              </>
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center bg-black text-muted-foreground">
                Fără imagine
              </div>
            )}
          </div>
          
          {v.images.length > 1 && (
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => scrollThumbnails('left')}
                className="flex h-12 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background/80 text-muted-foreground transition hover:border-primary hover:text-primary"
                aria-label="Scroll stânga"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <div 
                ref={scrollContainerRef}
                className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent"
                style={{ scrollbarWidth: 'thin' }}
              >
                {v.images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveImg(i)}
                    className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition hover:scale-105 ${
                      i === activeImg 
                        ? "border-primary shadow-lg shadow-primary/30" 
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={src} 
                      alt={`${v.brand} ${v.model}`} 
                      width={96}
                      height={64}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover" 
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollThumbnails('right')}
                className="flex h-12 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background/80 text-muted-foreground transition hover:border-primary hover:text-primary"
                aria-label="Scroll dreapta"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {v.videoUrl && (
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-black">
              {ytId ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}`}
                    title={`${v.brand} ${v.model} - Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="h-full w-full"
                  />
                </div>
              ) : (
                <video 
                  controls 
                  playsInline 
                  preload="metadata"
                  className="w-full"
                  onError={(e) => {
                    console.log("Video error, retrying...");
                    const target = e.target as HTMLVideoElement;
                    setTimeout(() => target.load(), 2000);
                  }}
                >
                  <source src={v.videoUrl} type="video/quicktime" />
                  <source src={v.videoUrl} type="video/mp4" />
                  <p className="p-4 text-center text-muted-foreground">
                    Browserul tău nu suportă videoclipuri.
                  </p>
                </video>
              )}
            </div>
          )}

          {lightbox && v.images[activeImg] && (
            <Lightbox
              src={v.images[activeImg]}
              index={activeImg}
              total={total}
              onClose={() => setLightbox(false)}
              onPrev={() => go(-1)}
              onNext={() => go(1)}
            />
          )}

          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">{v.brand} · {v.year}</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{v.model}</h1>
            <p className="mt-4 text-3xl font-semibold gold-gradient-text">{formatPrice(v.price)}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {v.tags.map((t: string) => (
                <span key={t} className="rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-xs uppercase tracking-wider text-primary">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Spec icon={Calendar} label="An fabricație" value={String(v.year)} />
            <Spec icon={Gauge} label="Kilometraj" value={formatMileage(v.mileage)} />
            <Spec icon={Fuel} label="Combustibil" value={v.fuelType} />
            <Spec icon={Settings2} label="Transmisie" value={v.transmission} />
            <Spec icon={Zap} label="Motor" value={`${v.engine} · ${v.horsepower} CP`} />
            <Spec icon={Palette} label="Culoare" value={v.color} />
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-card p-8">
            <h2 className="text-xl font-semibold">Descriere</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground whitespace-pre-line">{v.description}</p>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card p-8">
            <h2 className="text-xl font-semibold">Date tehnice</h2>
            <dl className="mt-6 grid gap-x-8 gap-y-4 text-sm md:grid-cols-2">
              <Row k="VIN" v={v.vin} />
              <Row k="Capacitate cilindrică" v={`${v.engineCapacity} cm³`} />
              <Row k="Putere" v={`${v.horsepower} CP`} />
              <Row k="Caroserie" v={v.bodyType} />
              <Row k="Garanție" v={`${v.warrantyMonths} luni`} />
              <Row k="Status" v={v.status === "AVAILABLE" ? "Disponibil" : v.status === "RESERVED" ? "Rezervat" : "Vândut"} />
            </dl>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-medium">Garanție inclusă {v.warrantyMonths} luni</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Verificare tehnică 150 puncte · Raport VIN carVertical · Transfer proprietate asistat.
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:var(--color-primary-hover)]"
            >
              <MessageCircle className="h-4 w-4" />
              Discută pe WhatsApp
            </a>
            <a
              href="tel:+40760323331"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Programează vizionare
            </a>
          </div>

          <LoanCalculator price={v.price} />
        </aside>
      </div>
    </div>
  );
}

function Spec({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-primary">
        <Icon className="h-4 w-4" />
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <p className="mt-2 text-base font-medium text-foreground">{value}</p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium text-foreground">{v}</dd>
    </div>
  );
}

function Lightbox({
  src, index, total, onClose, onPrev, onNext,
}: { src: string; index: number; total: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4" onClick={onClose}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Închide"
        className="absolute right-4 top-4 rounded-full border border-border/60 bg-black/60 p-2 text-foreground transition hover:text-primary"
      >
        <X className="h-5 w-5" />
      </button>
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-border/60 bg-black/60 p-3 text-foreground transition hover:text-primary"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Următor"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-border/60 bg-black/60 p-3 text-foreground transition hover:text-primary"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs text-foreground">
            {index + 1} / {total}
          </div>
        </>
      )}
      <img
        src={src}
        alt=""
        loading="eager"
        decoding="async"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain"
      />
    </div>
  );
}