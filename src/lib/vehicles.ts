export type VehicleStatus = "AVAILABLE" | "RESERVED" | "SOLD";
export type FuelType = "Benzină" | "Motorină" | "Hibrid" | "Electric" | "GPL";
export type Transmission = "Manuală" | "Automată";
export type BodyType = "Berlină" | "Hatchback" | "SUV" | "Break" | "Coupe";

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  fuelType: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  color: string;
  engine: string;
  engineCapacity: number;
  horsepower: number;
  vin: string;
  description: string;
  status: VehicleStatus;
  hasWarranty: boolean;
  warrantyMonths: number;
  tags: string[];
  featured: boolean;
  images: string[];
  videoUrl?: string | null;
}

// Interfață pentru filtre
export interface VehicleFilters {
  brand?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  minMileage?: number;
  maxMileage?: number;
  body?: BodyType;
  fuel?: FuelType;
  transmission?: Transmission;
  hasWarranty?: boolean;
  tags?: string[];
}

// Tip pentru sortare
export type SortOption = "price-asc" | "price-desc" | "year-desc" | "km-asc";

export const budgetRanges = [
  { label: "Sub 3.000€", min: 0, max: 3000 },
  { label: "3.000€ - 5.000€", min: 3000, max: 5000 },
  { label: "5.000€ - 10.000€", min: 5000, max: 10000 },
  { label: "10.000€ - 15.000€", min: 10000, max: 15000 },
  { label: "Peste 15.000€", min: 15000, max: 999999 },
] as const;

export const bodyTypes: BodyType[] = ["Berlină", "Hatchback", "SUV", "Break", "Coupe"];
export const fuelTypes: FuelType[] = ["Benzină", "Motorină", "Hibrid", "Electric", "GPL"];
export const transmissions: Transmission[] = ["Manuală", "Automată"];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(km: number): string {
  return `${new Intl.NumberFormat("ro-RO").format(km)} km`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

// deno-lint-ignore no-explicit-any
export function dbToVehicle(row: any): Vehicle {
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    year: row.year,
    mileage: row.mileage,
    price: row.price,
    fuelType: row.fuel_type as FuelType,
    transmission: row.transmission as Transmission,
    bodyType: row.body_type as BodyType,
    color: row.color ?? "",
    engine: row.engine ?? "",
    engineCapacity: row.engine_capacity ?? 0,
    horsepower: row.horsepower ?? 0,
    vin: row.vin ?? "",
    description: row.description ?? "",
    status: row.status as VehicleStatus,
    hasWarranty: row.has_warranty,
    warrantyMonths: row.warranty_months,
    tags: row.tags ?? [],
    featured: row.featured,
    images: row.images ?? [],
    videoUrl: row.video_url ?? null,
  };
}