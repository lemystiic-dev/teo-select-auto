import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/lib/vehicle-api";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Admin — Teo Select Auto" }, { name: "robots", content: "noindex" }] }),
});

function AdminLayout() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const { data: isAdmin, isLoading } = useIsAdmin();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate({ to: "/auth" });
      else setChecking(false);
    });
  }, [navigate]);

  if (checking || isLoading) {
    return <div className="mx-auto max-w-2xl px-6 py-32 text-center text-muted-foreground">Se verifică accesul...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="text-3xl font-semibold">Acces restricționat</h1>
        <p className="mt-4 text-muted-foreground">
          Contul tău nu are rol de administrator. Rulează în baza de date:
        </p>
        <pre className="mt-4 overflow-auto rounded-lg border border-border bg-card p-4 text-left text-xs">
{`insert into public.user_roles (user_id, role)
values ((select id from auth.users where email = 'EMAIL_TAU'), 'admin');`}
        </pre>
        <button
          onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}
          className="mt-6 rounded-full border border-border px-6 py-2 text-sm hover:border-primary hover:text-primary"
        >
          Ieși din cont
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Panou administrare</p>
          <h1 className="mt-2 text-3xl font-semibold gold-gradient-text">Gestiune vehicule</h1>
        </div>
        <div className="flex gap-3">
          <Link to="/" className="rounded-full border border-border px-4 py-2 text-xs hover:border-primary hover:text-primary">
            Vezi site
          </Link>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}
            className="rounded-full border border-border px-4 py-2 text-xs hover:border-primary hover:text-primary"
          >
            Ieșire
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  );
}