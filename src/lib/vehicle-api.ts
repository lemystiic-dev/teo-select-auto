import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { dbToVehicle, type Vehicle } from "@/lib/vehicles";

const SIGNED_TTL = 60 * 60 * 24 * 365 * 5; // 5 years

export async function fetchVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(dbToVehicle);
}

export async function fetchVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? dbToVehicle(data) : null;
}

export function useVehiclesQuery() {
  return useQuery({ queryKey: ["vehicles"], queryFn: fetchVehicles });
}

export function useVehicleBySlug(slug: string) {
  return useQuery({
    queryKey: ["vehicle", slug],
    queryFn: () => fetchVehicleBySlug(slug),
  });
}

export async function uploadVehicleFile(vehicleSlug: string, file: File): Promise<string> {
  let fileToUpload: File = file;

  // Comprimă doar imaginile (nu videoclipurile)
  if (file.type.startsWith("image/")) {
    try {
      const imageCompression = (await import("browser-image-compression")).default;
      const options = {
        maxSizeMB: 0.5,           // max 500 KB
        maxWidthOrHeight: 1920,   // max 1920px
        useWebWorker: true,
        fileType: "image/webp",   // convertim în WebP
      };
      fileToUpload = await imageCompression(file, options);
      console.log(
        `Comprimat: ${(file.size / 1024 / 1024).toFixed(2)} MB → ${(fileToUpload.size / 1024).toFixed(0)} KB`
      );
    } catch (err) {
      console.warn("Compresia a eșuat, se încarcă originalul:", err);
    }
  }

  const ext = fileToUpload.name.split(".").pop() ?? "bin";
  const path = `${vehicleSlug}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("vehicle-media")
    .upload(path, fileToUpload, { cacheControl: "31536000", upsert: false });
  if (error) throw error;
  const { data, error: sErr } = await supabase.storage
    .from("vehicle-media")
    .createSignedUrl(path, SIGNED_TTL);
  if (sErr || !data) throw sErr ?? new Error("Nu s-a putut genera URL semnat");
  return data.signedUrl;
}

export interface VehicleInput {
  slug: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  color: string;
  engine: string;
  engine_capacity: number;
  horsepower: number;
  vin: string;
  description: string;
  status: string;
  has_warranty: boolean;
  warranty_months: number;
  tags: string[];
  featured: boolean;
  images: string[];
  video_url: string | null;
}

export function useSaveVehicle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id?: string; input: VehicleInput }) => {
      if (id) {
        const { error } = await supabase.from("vehicles").update(input).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("vehicles").insert(input);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["vehicles"] }),
  });
}

export function useDeleteVehicle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("vehicles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["vehicles"] }),
  });
}

export function useIsAdmin() {
  return useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: sess } = await supabase.auth.getUser();
      if (!sess.user) return false;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.user.id)
        .eq("role", "admin")
        .maybeSingle();
      return !!data;
    },
  });
}