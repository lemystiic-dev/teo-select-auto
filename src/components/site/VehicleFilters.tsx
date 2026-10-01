import type { BodyType, FuelType, Transmission, VehicleFilters } from "@/lib/vehicles";
import { bodyTypes, fuelTypes, transmissions } from "@/lib/vehicles";
import { useState, useEffect } from "react";

interface VehicleFiltersProps {
  value: VehicleFilters;
  onChange: (f: VehicleFilters) => void;
  onReset: () => void;
  brands: string[];
  models: string[];
}

export function VehicleFilters({
  value,
  onChange,
  onReset,
  brands,
  models,
}: VehicleFiltersProps) {
  const [localMinPrice, setLocalMinPrice] = useState(value.minPrice ?? 0);
  const [localMaxPrice, setLocalMaxPrice] = useState(value.maxPrice ?? 50000);
  const [localMinYear, setLocalMinYear] = useState(value.minYear ?? 1990);
  const [localMaxYear, setLocalMaxYear] = useState(value.maxYear ?? 2025);
  const [localMinMileage, setLocalMinMileage] = useState(value.minMileage ?? 0);
  const [localMaxMileage, setLocalMaxMileage] = useState(value.maxMileage ?? 300000);

  useEffect(() => {
    setLocalMinPrice(value.minPrice ?? 0);
    setLocalMaxPrice(value.maxPrice ?? 50000);
    setLocalMinYear(value.minYear ?? 1990);
    setLocalMaxYear(value.maxYear ?? 2025);
    setLocalMinMileage(value.minMileage ?? 0);
    setLocalMaxMileage(value.maxMileage ?? 300000);
  }, [value]);

  const set = <K extends keyof VehicleFilters>(k: K, v: VehicleFilters[K]) => {
    const newValue = { ...value, [k]: v };
    if (k === "brand") {
      newValue.model = undefined;
    }
    onChange(newValue);
  };

  const handlePriceChange = (min: number, max: number) => {
    setLocalMinPrice(min);
    setLocalMaxPrice(max);
    set("minPrice", min);
    set("maxPrice", max);
  };

  const handleYearChange = (min: number, max: number) => {
    setLocalMinYear(min);
    setLocalMaxYear(max);
    set("minYear", min);
    set("maxYear", max);
  };

  const handleMileageChange = (min: number, max: number) => {
    setLocalMinMileage(min);
    setLocalMaxMileage(max);
    set("minMileage", min);
    set("maxMileage", max);
  };

  return (
    <aside className="glass rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
          Filtre
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Resetează
        </button>
      </div>

      {/* Marcă */}
      <Field label="Marcă">
        <select
          value={value.brand ?? ""}
          onChange={(e) => set("brand", e.target.value || undefined)}
          className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">Toate mărcile</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </Field>

      {/* Model - dependent de marcă */}
      <Field label="Model">
        <select
          value={value.model ?? ""}
          onChange={(e) => set("model", e.target.value || undefined)}
          className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">Toate modelele</option>
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </Field>

      {/* Preț - Range Slider */}
      <Field label={`Preț: ${localMinPrice}€ - ${localMaxPrice}€`}>
        <div className="relative pt-4 pb-2">
          <div className="relative h-1 rounded-full bg-primary/20">
            <div 
              className="absolute h-1 rounded-full bg-primary"
              style={{
                left: `${(localMinPrice / 50000) * 100}%`,
                right: `${100 - (localMaxPrice / 50000) * 100}%`
              }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={50000}
            step={500}
            value={localMinPrice}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val <= localMaxPrice) {
                handlePriceChange(val, localMaxPrice);
              }
            }}
            className="absolute top-0 left-0 w-full h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
          />
          <input
            type="range"
            min={0}
            max={50000}
            step={500}
            value={localMaxPrice}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= localMinPrice) {
                handlePriceChange(localMinPrice, val);
              }
            }}
            className="absolute top-0 left-0 w-full h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
          />
          <div className="flex justify-between mt-3 text-xs text-muted-foreground">
            <span>{localMinPrice}€</span>
            <span>{localMaxPrice}€</span>
          </div>
        </div>
      </Field>

      {/* An - Range Slider */}
      <Field label={`An: ${localMinYear} - ${localMaxYear}`}>
        <div className="relative pt-4 pb-2">
          <div className="relative h-1 rounded-full bg-primary/20">
            <div 
              className="absolute h-1 rounded-full bg-primary"
              style={{
                left: `${((localMinYear - 1990) / 35) * 100}%`,
                right: `${100 - ((localMaxYear - 1990) / 35) * 100}%`
              }}
            />
          </div>
          <input
            type="range"
            min={1990}
            max={2025}
            step={1}
            value={localMinYear}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val <= localMaxYear) {
                handleYearChange(val, localMaxYear);
              }
            }}
            className="absolute top-0 left-0 w-full h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
          />
          <input
            type="range"
            min={1990}
            max={2025}
            step={1}
            value={localMaxYear}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= localMinYear) {
                handleYearChange(localMinYear, val);
              }
            }}
            className="absolute top-0 left-0 w-full h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
          />
          <div className="flex justify-between mt-3 text-xs text-muted-foreground">
            <span>{localMinYear}</span>
            <span>{localMaxYear}</span>
          </div>
        </div>
      </Field>

      {/* Kilometraj - Range Slider */}
      <Field label={`Km: ${localMinMileage} - ${localMaxMileage}`}>
        <div className="relative pt-4 pb-2">
          <div className="relative h-1 rounded-full bg-primary/20">
            <div 
              className="absolute h-1 rounded-full bg-primary"
              style={{
                left: `${(localMinMileage / 300000) * 100}%`,
                right: `${100 - (localMaxMileage / 300000) * 100}%`
              }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={300000}
            step={5000}
            value={localMinMileage}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val <= localMaxMileage) {
                handleMileageChange(val, localMaxMileage);
              }
            }}
            className="absolute top-0 left-0 w-full h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
          />
          <input
            type="range"
            min={0}
            max={300000}
            step={5000}
            value={localMaxMileage}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= localMinMileage) {
                handleMileageChange(localMinMileage, val);
              }
            }}
            className="absolute top-0 left-0 w-full h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
          />
          <div className="flex justify-between mt-3 text-xs text-muted-foreground">
            <span>{localMinMileage} km</span>
            <span>{localMaxMileage} km</span>
          </div>
        </div>
      </Field>

      {/* Caroserie */}
      <Field label="Caroserie">
        <select
          value={value.body ?? ""}
          onChange={(e) => set("body", (e.target.value || undefined) as BodyType | undefined)}
          className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">Toate</option>
          {bodyTypes.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </Field>

      {/* Combustibil */}
      <Field label="Combustibil">
        <select
          value={value.fuel ?? ""}
          onChange={(e) => set("fuel", (e.target.value || undefined) as FuelType | undefined)}
          className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">Toate</option>
          {fuelTypes.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </Field>

      {/* Transmisie */}
      <Field label="Transmisie">
        <select
          value={value.transmission ?? ""}
          onChange={(e) => set("transmission", (e.target.value || undefined) as Transmission | undefined)}
          className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">Toate</option>
          {transmissions.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </Field>
    </aside>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}