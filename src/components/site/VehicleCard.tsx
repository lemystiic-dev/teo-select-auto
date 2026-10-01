import { Link } from "@tanstack/react-router";
import { Fuel, Gauge, Settings2, ShieldCheck } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import { formatMileage, formatPrice } from "@/lib/vehicles";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      to="/vehicule/$slug"
      params={{ slug: vehicle.slug }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-gold)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        {vehicle.images[0] ? (
          <img
            src={vehicle.images[0]}
            alt={`${vehicle.brand} ${vehicle.model}`}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest text-muted-foreground">
            Fără imagine
          </div>
        )}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          {vehicle.hasWarranty && (
            <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Garanție {vehicle.warrantyMonths} luni
            </span>
          )}
          {vehicle.status !== "AVAILABLE" && (
            <span className="glass rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-foreground/80">
              {vehicle.status === "RESERVED" ? "Rezervat" : "Vândut"}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {vehicle.brand} · {vehicle.year}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground group-hover:text-primary">
            {vehicle.model}
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3 border-y border-border/60 py-4 text-xs text-muted-foreground">
          <div className="flex flex-col items-center gap-1">
            <Gauge className="h-4 w-4 text-primary" />
            <span>{formatMileage(vehicle.mileage)}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Fuel className="h-4 w-4 text-primary" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Settings2 className="h-4 w-4 text-primary" />
            <span>{vehicle.transmission}</span>
          </div>
        </div>

        {vehicle.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {vehicle.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between pt-2">
          <span className="text-2xl font-semibold gold-gradient-text">
            {formatPrice(vehicle.price)}
          </span>
          <span className="text-xs text-muted-foreground group-hover:text-primary">
            Vezi detalii →
          </span>
        </div>
      </div>
    </Link>
  );
}