import { useState } from "react";
import { toast } from "sonner";
import { GripVertical, Star, Upload, X, Youtube, Link as LinkIcon, Crop } from "lucide-react";
import { uploadVehicleFile, useSaveVehicle, type VehicleInput } from "@/lib/vehicle-api";
import { bodyTypes, fuelTypes, slugify, transmissions, type Vehicle } from "@/lib/vehicles";
import { ImageCropper } from "./ImageCropper";

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

function emptyInput(): VehicleInput {
  return {
    slug: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    mileage: 0,
    price: 0,
    fuel_type: "Motorină",
    transmission: "Manuală",
    body_type: "Berlină",
    color: "",
    engine: "",
    engine_capacity: 0,
    horsepower: 0,
    vin: "",
    description: "",
    status: "AVAILABLE",
    has_warranty: true,
    warranty_months: 12,
    tags: [],
    featured: false,
    images: [],
    video_url: null,
  };
}

function fromVehicle(v: Vehicle): VehicleInput {
  return {
    slug: v.slug,
    brand: v.brand,
    model: v.model,
    year: v.year,
    mileage: v.mileage,
    price: v.price,
    fuel_type: v.fuelType,
    transmission: v.transmission,
    body_type: v.bodyType,
    color: v.color,
    engine: v.engine,
    engine_capacity: v.engineCapacity,
    horsepower: v.horsepower,
    vin: v.vin,
    description: v.description,
    status: v.status,
    has_warranty: v.hasWarranty,
    warranty_months: v.warrantyMonths,
    tags: v.tags,
    featured: v.featured,
    images: v.images,
    video_url: v.videoUrl ?? null,
  };
}

export function VehicleForm({ vehicle, onDone }: { vehicle?: Vehicle; onDone: () => void }) {
  const [f, setF] = useState<VehicleInput>(vehicle ? fromVehicle(vehicle) : emptyInput());
  const [tagInput, setTagInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [ytInput, setYtInput] = useState("");
  const save = useSaveVehicle();

  // Crop state
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [cropTargetIndex, setCropTargetIndex] = useState<number | null>(null);

  const upd = <K extends keyof VehicleInput>(k: K, v: VehicleInput[K]) => setF((s) => ({ ...s, [k]: v }));

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= f.images.length) return;
    const next = [...f.images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    upd("images", next);
  };

  const makeCover = (i: number) => moveImage(i, 0);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  async function uploadCroppedBlob(blob: Blob, slug: string): Promise<string> {
    const file = new File([blob], `crop-${Date.now()}.webp`, { type: "image/webp" });
    return await uploadVehicleFile(slug, file);
  }

  // Upload poze fără crop (pentru pozele secundare)
  async function handleImageUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    const slug = f.slug || slugify(`${f.brand}-${f.model}-${f.year}-${Date.now()}`);
    if (!f.slug) upd("slug", slug);
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadVehicleFile(slug, file);
        urls.push(url);
      }
      upd("images", [...f.images, ...urls]);
      toast.success(`${urls.length} imagine(i) încărcate`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Eroare upload");
    } finally {
      setUploading(false);
    }
  }

  // Deschide crop pentru o poză nouă de copertă
  function handleCoverSelect(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setCropTargetIndex(null);
      setCropSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  // Deschide crop pentru o poză existentă
  function handleRecrop(index: number) {
    const url = f.images[index];
    if (!url) return;
    setCropTargetIndex(index);
    setCropSrc(url);
  }

  async function handleCropDone(croppedBlob: Blob) {
    const slug = f.slug || slugify(`${f.brand}-${f.model}-${f.year}-${Date.now()}`);
    if (!f.slug) upd("slug", slug);
    setUploading(true);
    try {
      const url = await uploadCroppedBlob(croppedBlob, slug);
      
      if (cropTargetIndex === null) {
        // Poză nouă de copertă — o punem prima
        upd("images", [url, ...f.images]);
        toast.success("Copertă încărcată");
      } else {
        // Re-crop la o poză existentă
        const next = [...f.images];
        next[cropTargetIndex] = url;
        upd("images", next);
        toast.success("Imagine actualizată");
      }
      
      setCropSrc(null);
      setCropTargetIndex(null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Eroare upload");
    } finally {
      setUploading(false);
    }
  }

  function handleCropCancel() {
    setCropSrc(null);
    setCropTargetIndex(null);
  }

  async function handleVideoUpload(file: File | null) {
    if (!file) return;
    const slug = f.slug || slugify(`${f.brand}-${f.model}-${f.year}-${Date.now()}`);
    if (!f.slug) upd("slug", slug);
    setUploading(true);
    try {
      const url = await uploadVehicleFile(slug, file);
      upd("video_url", url);
      toast.success("Video încărcat");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Eroare upload");
    } finally {
      setUploading(false);
    }
  }

  function handleYouTubeAdd() {
    const trimmed = ytInput.trim();
    if (!trimmed) return;
    const ytId = getYouTubeId(trimmed);
    if (!ytId) {
      toast.error("Link YouTube invalid. Format acceptat: youtube.com/watch?v=... sau youtu.be/...");
      return;
    }
    upd("video_url", trimmed);
    setYtInput("");
    toast.success("Link YouTube adăugat");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const finalSlug = f.slug || slugify(`${f.brand}-${f.model}-${f.year}`);
    try {
      await save.mutateAsync({ id: vehicle?.id, input: { ...f, slug: finalSlug } });
      toast.success(vehicle ? "Vehicul actualizat" : "Vehicul adăugat");
      onDone();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Eroare la salvare");
    }
  }

  const inp = "w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm focus:border-primary focus:outline-none";
  const lbl = "text-xs uppercase tracking-widest text-muted-foreground";

  const currentYtId = f.video_url ? getYouTubeId(f.video_url) : null;

  return (
    <>
      {cropSrc && (
        <ImageCropper
          imageSrc={cropSrc}
          aspect={4 / 3}
          onCancel={handleCropCancel}
          onCropDone={handleCropDone}
        />
      )}

      <form onSubmit={submit} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{vehicle ? "Editează vehicul" : "Adaugă vehicul nou"}</h2>
          <button type="button" onClick={onDone} className="text-sm text-muted-foreground hover:text-primary">
            ← Înapoi la listă
          </button>
        </div>

        <section className="glass rounded-2xl p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Informații generale</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className={lbl}>Marcă *</label><input required className={inp} value={f.brand} onChange={(e) => upd("brand", e.target.value)} /></div>
            <div><label className={lbl}>Model *</label><input required className={inp} value={f.model} onChange={(e) => upd("model", e.target.value)} /></div>
            <div><label className={lbl}>An *</label><input type="number" required className={inp} value={f.year} onChange={(e) => upd("year", +e.target.value)} /></div>
            <div><label className={lbl}>Kilometraj *</label><input type="number" required className={inp} value={f.mileage} onChange={(e) => upd("mileage", +e.target.value)} /></div>
            <div><label className={lbl}>Preț (€) *</label><input type="number" required className={inp} value={f.price} onChange={(e) => upd("price", +e.target.value)} /></div>
            <div><label className={lbl}>Slug URL</label><input className={inp} value={f.slug} onChange={(e) => upd("slug", slugify(e.target.value))} placeholder="auto-generat" /></div>
            <div><label className={lbl}>Culoare</label><input className={inp} value={f.color} onChange={(e) => upd("color", e.target.value)} /></div>
            <div><label className={lbl}>VIN</label><input className={inp} value={f.vin} onChange={(e) => upd("vin", e.target.value)} /></div>
          </div>
        </section>

        <section className="glass rounded-2xl p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Specificații tehnice</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className={lbl}>Caroserie</label>
              <select className={inp} value={f.body_type} onChange={(e) => upd("body_type", e.target.value)}>
                {bodyTypes.map((b) => <option key={b}>{b}</option>)}
              </select></div>
            <div><label className={lbl}>Combustibil</label>
              <select className={inp} value={f.fuel_type} onChange={(e) => upd("fuel_type", e.target.value)}>
                {fuelTypes.map((b) => <option key={b}>{b}</option>)}
              </select></div>
            <div><label className={lbl}>Transmisie</label>
              <select className={inp} value={f.transmission} onChange={(e) => upd("transmission", e.target.value)}>
                {transmissions.map((b) => <option key={b}>{b}</option>)}
              </select></div>
            <div><label className={lbl}>Status</label>
              <select className={inp} value={f.status} onChange={(e) => upd("status", e.target.value)}>
                <option value="AVAILABLE">Disponibil</option>
                <option value="RESERVED">Rezervat</option>
                <option value="SOLD">Vândut</option>
              </select></div>
            <div><label className={lbl}>Motor</label><input className={inp} value={f.engine} onChange={(e) => upd("engine", e.target.value)} placeholder="ex: 2.0 TDI" /></div>
            <div><label className={lbl}>Capacitate (cm³)</label><input type="number" className={inp} value={f.engine_capacity} onChange={(e) => upd("engine_capacity", +e.target.value)} /></div>
            <div><label className={lbl}>Putere (CP)</label><input type="number" className={inp} value={f.horsepower} onChange={(e) => upd("horsepower", +e.target.value)} /></div>
            <div><label className={lbl}>Garanție (luni)</label><input type="number" className={inp} value={f.warranty_months} onChange={(e) => upd("warranty_months", +e.target.value)} /></div>
          </div>
          <div className="mt-4 flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={f.has_warranty} onChange={(e) => upd("has_warranty", e.target.checked)} />
              Include garanție
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={f.featured} onChange={(e) => upd("featured", e.target.checked)} />
              Recomandat pe homepage
            </label>
          </div>
        </section>

        <section className="glass rounded-2xl p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Descriere & etichete</h3>
          <label className={lbl}>Descriere</label>
          <textarea rows={5} className={inp} value={f.description} onChange={(e) => upd("description", e.target.value)} />
          <label className={`${lbl} mt-4 block`}>Etichete</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {f.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-xs text-primary">
                {t}
                <button type="button" onClick={() => upd("tags", f.tags.filter((x) => x !== t))}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              className={inp}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Adaugă etichetă și apasă Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (tagInput.trim()) {
                    upd("tags", [...f.tags, tagInput.trim()]);
                    setTagInput("");
                  }
                }
              }}
            />
          </div>
        </section>

        <section className="glass rounded-2xl p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Media</h3>

          <label className={lbl}>Imagini ({f.images.length})</label>
          <p className="mt-1 text-xs text-muted-foreground">
            <strong className="text-primary">Coperta</strong> (prima imagine) se decupează la 4:3. Restul se încarcă direct. Trage pentru a reordona.
          </p>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {f.images.map((url, i) => (
              <div
                key={url}
                draggable
                onDragStart={(e) => {
                  setDragIndex(i);
                  e.dataTransfer.effectAllowed = "move";
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                  if (overIndex !== i) setOverIndex(i);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragIndex !== null && dragIndex !== i) moveImage(dragIndex, i);
                  setDragIndex(null);
                  setOverIndex(null);
                }}
                onDragEnd={() => {
                  setDragIndex(null);
                  setOverIndex(null);
                }}
                className={`group relative aspect-[4/3] cursor-grab overflow-hidden rounded-lg border-2 transition active:cursor-grabbing ${
                  dragIndex === i
                    ? "border-primary opacity-40"
                    : overIndex === i && dragIndex !== null
                      ? "border-primary"
                      : "border-border"
                }`}
              >
                <img src={url} alt="" draggable={false} className="h-full w-full select-none object-cover" />
                {i === 0 && (
                  <span className="absolute left-1 top-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                    Copertă
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => upd("images", f.images.filter((_, j) => j !== i))}
                  className="absolute right-1 top-1 rounded-full bg-black/80 p-1 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-black/70 px-1 py-1 opacity-0 transition group-hover:opacity-100">
                  <span className="flex items-center gap-1 text-[10px] text-white/80">
                    <GripVertical className="h-3.5 w-3.5" /> Trage
                  </span>
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => handleRecrop(i)}
                      aria-label="Decupează imaginea"
                      title="Decupează"
                      className="rounded p-1 text-white hover:text-primary"
                    >
                      <Crop className="h-3.5 w-3.5" />
                    </button>
                    {i !== 0 && (
                      <button
                        type="button"
                        onClick={() => makeCover(i)}
                        aria-label="Setează ca copertă"
                        title="Setează ca copertă"
                        className="rounded p-1 text-white hover:text-primary"
                      >
                        <Star className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Buton Copertă (cu crop) */}
            <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/50 bg-primary/5 text-xs text-primary hover:border-primary hover:bg-primary/10 transition-colors">
              <Star className="h-5 w-5" />
              {uploading ? "Se încarcă..." : "Adaugă copertă"}
              <input type="file" accept="image/*" hidden onChange={(e) => handleCoverSelect(e.target.files)} />
            </label>
            
            {/* Buton Imagini (fără crop) */}
            <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              <Upload className="h-5 w-5" />
              {uploading ? "Se încarcă..." : "Adaugă imagini"}
              <input type="file" accept="image/*" multiple hidden onChange={(e) => handleImageUpload(e.target.files)} />
            </label>
          </div>

          <label className={`${lbl} mt-6 block`}>Video (opțional)</label>
          <p className="mt-1 text-xs text-muted-foreground">
            Poți încărca un fișier video (max 50 MB) SAU lipi un link YouTube (recomandat — nu consumă spațiu).
          </p>

          {f.video_url ? (
            <div className="mt-3 space-y-3">
              {currentYtId ? (
                <div className="rounded-lg border border-border bg-black">
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${currentYtId}`}
                      title="Preview video"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                </div>
              ) : (
                <video src={f.video_url} controls className="h-32 rounded-lg border border-border" />
              )}

              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${
                  currentYtId 
                    ? "bg-red-500/10 text-red-400 border border-red-500/30" 
                    : "bg-primary/10 text-primary border border-primary/30"
                }`}>
                  {currentYtId ? (
                    <>
                      <Youtube className="h-3.5 w-3.5" />
                      YouTube
                    </>
                  ) : (
                    <>
                      <LinkIcon className="h-3.5 w-3.5" />
                      Fișier video
                    </>
                  )}
                </span>
                <button 
                  type="button" 
                  onClick={() => upd("video_url", null)} 
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  Șterge video
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3 space-y-4">
              <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Youtube className="h-4 w-4 text-red-500" />
                  <span className="text-xs font-medium text-foreground">Opțiunea 1: Link YouTube (recomandat)</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    className={inp}
                    value={ytInput}
                    onChange={(e) => setYtInput(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleYouTubeAdd();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleYouTubeAdd}
                    className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-[color:var(--color-primary-hover)]"
                  >
                    Adaugă
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Acceptă: youtube.com/watch?v=..., youtu.be/..., youtube.com/shorts/...
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border/60" />
                <span className="text-xs text-muted-foreground">SAU</span>
                <div className="h-px flex-1 bg-border/60" />
              </div>

              <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Upload className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-foreground">Opțiunea 2: Încarcă fișier video (max 50 MB)</span>
                </div>
                <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-3 text-xs text-muted-foreground hover:border-primary hover:text-primary">
                  <Upload className="h-4 w-4" />
                  {uploading ? "Se încarcă..." : "Selectează fișier video"}
                  <input type="file" accept="video/*" hidden onChange={(e) => handleVideoUpload(e.target.files?.[0] ?? null)} />
                </label>
              </div>
            </div>
          )}
        </section>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onDone} className="rounded-full border border-border px-6 py-2.5 text-sm hover:border-primary hover:text-primary">
            Anulează
          </button>
          <button
            type="submit"
            disabled={save.isPending || uploading}
            className="rounded-full bg-primary px-8 py-2.5 text-sm font-medium text-primary-foreground hover:bg-[color:var(--color-primary-hover)] disabled:opacity-50"
          >
            {save.isPending ? "Se salvează..." : vehicle ? "Salvează modificările" : "Adaugă vehicul"}
          </button>
        </div>
      </form>
    </>
  );
}