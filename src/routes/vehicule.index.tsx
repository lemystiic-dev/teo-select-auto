import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { VehicleCard } from "@/components/site/VehicleCard";
import { VehicleFilters } from "@/components/site/VehicleFilters";
import type { VehicleFilters as FiltersType } from "@/lib/vehicles";
import { useVehiclesQuery } from "@/lib/vehicle-api";

const searchSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minYear: z.number().optional(),
  maxYear: z.number().optional(),
  minMileage: z.number().optional(),
  maxMileage: z.number().optional(),
  body: z.string().optional(),
  fuel: z.string().optional(),
  transmission: z.string().optional(),
  sort: z.enum(["price-asc", "price-desc", "year-desc", "km-asc"]).optional(),
});

export const Route = createFileRoute("/vehicule/")({
  validateSearch: searchSchema,
  component: VehiclesPage,
  head: () => ({
    meta: [
      { title: "Stoc auto rulate — Teo Select Auto" },
      { name: "description", content: "Explorează stocul complet de auto rulate verificate tehnic, cu filtre avansate și garanție 12 luni." },
      { property: "og:title", content: "Stoc auto rulate — Teo Select Auto" },
    ],
    links: [{ rel: "canonical", href: "/vehicule" }],
  }),
});

function VehiclesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { data: vehicles = [], isLoading } = useVehiclesQuery();

  const brands = useMemo(
    () => [...new Set(vehicles.map((v) => v.brand))].sort(),
    [vehicles],
  );

  const models = useMemo(() => {
    const filtered = vehicles.filter((v) => 
      !search.brand || v.brand === search.brand
    );
    return [...new Set(filtered.map((v) => v.model))].sort();
  }, [vehicles, search.brand]);

  const filters: FiltersType = search as FiltersType;

  const setFilters = (f: FiltersType) => {
    navigate({ search: { ...search, ...f } });
  };

  const resetFilters = () => navigate({ search: {} });

  const filtered = useMemo(() => {
    let list = vehicles.filter((v) => {
      if (filters.brand && v.brand !== filters.brand) return false;
      if (filters.model && v.model !== filters.model) return false;
      if (filters.minPrice !== undefined && v.price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && v.price > filters.maxPrice) return false;
      if (filters.minYear !== undefined && v.year < filters.minYear) return false;
      if (filters.maxYear !== undefined && v.year > filters.maxYear) return false;
      if (filters.minMileage !== undefined && v.mileage < filters.minMileage) return false;
      if (filters.maxMileage !== undefined && v.mileage > filters.maxMileage) return false;
      if (filters.body && v.bodyType !== filters.body) return false;
      if (filters.fuel && v.fuelType !== filters.fuel) return false;
      if (filters.transmission && v.transmission !== filters.transmission) return false;
      return true;
    });

    switch (search.sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "year-desc": list = [...list].sort((a, b) => b.year - a.year); break;
      case "km-asc": list = [...list].sort((a, b) => a.mileage - b.mileage); break;
    }
    return list;
  }, [vehicles, filters, search.sort]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Stoc</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          Toate vehiculele disponibile
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {filtered.length} vehicule găsite. Toate cu garanție 12 luni și inspecție tehnică completă.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <VehicleFilters 
          value={filters} 
          onChange={setFilters} 
          onReset={resetFilters} 
          brands={brands}
          models={models}
        />

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground">{filtered.length} rezultate</span>
            <select
              value={search.sort ?? ""}
              onChange={(e) => navigate({ search: { ...search, sort: (e.target.value || undefined) as typeof search.sort } })}
              className="rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              <option value="">Sortează</option>
              <option value="price-asc">Preț crescător</option>
              <option value="price-desc">Preț descrescător</option>
              <option value="year-desc">Cele mai noi</option>
              <option value="km-asc">Km puțini</option>
            </select>
          </div>

          {isLoading ? (
            <div className="glass rounded-2xl p-16 text-center">
              <p className="text-muted-foreground">Se încarcă stocul...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="glass rounded-2xl p-16 text-center">
              <p className="text-muted-foreground">Niciun vehicul nu se potrivește filtrelor.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filtered.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}