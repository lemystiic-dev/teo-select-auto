import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { useDeleteVehicle, useVehiclesQuery } from "@/lib/vehicle-api";
import { formatPrice, type Vehicle } from "@/lib/vehicles";

export const Route = createFileRoute("/admin/")({
  component: AdminVehicles,
});

function AdminVehicles() {
  const { data: vehicles = [], isLoading } = useVehiclesQuery();
  const del = useDeleteVehicle();
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [creating, setCreating] = useState(false);

  if (creating || editing) {
    return (
      <VehicleForm
        vehicle={editing ?? undefined}
        onDone={() => {
          setCreating(false);
          setEditing(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-[color:var(--color-primary-hover)]"
        >
          <Plus className="h-4 w-4" /> Adaugă vehicul
        </button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Se încarcă...</p>
      ) : vehicles.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <p className="text-muted-foreground">Niciun vehicul adăugat. Începe cu primul.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-card text-left text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="p-4">Vehicul</th>
                <th className="p-4">An</th>
                <th className="p-4">Km</th>
                <th className="p-4">Preț</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id} className="border-t border-border">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {v.images[0] ? (
                        <img src={v.images[0]} alt="" className="h-12 w-16 rounded-md object-cover" />
                      ) : (
                        <div className="h-12 w-16 rounded-md bg-secondary" />
                      )}
                      <div>
                        <div className="font-medium">{v.brand} {v.model}</div>
                        <div className="text-xs text-muted-foreground">{v.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{v.year}</td>
                  <td className="p-4">{v.mileage.toLocaleString("ro-RO")}</td>
                  <td className="p-4 font-medium text-primary">{formatPrice(v.price)}</td>
                  <td className="p-4">
                    <span className="rounded-full border border-border px-2 py-0.5 text-xs">
                      {v.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => setEditing(v)}
                        className="rounded-md border border-border p-2 hover:border-primary hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm(`Ștergi ${v.brand} ${v.model}?`)) return;
                          try {
                            await del.mutateAsync(v.id);
                            toast.success("Vehicul șters");
                          } catch (e) {
                            toast.error(e instanceof Error ? e.message : "Eroare");
                          }
                        }}
                        className="rounded-md border border-border p-2 hover:border-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}