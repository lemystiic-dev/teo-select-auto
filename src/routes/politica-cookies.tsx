import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-cookies")({
  component: PoliticaCookies,
  head: () => ({
    meta: [
      { title: "Politica de cookies — Teo Select Auto" },
      { name: "description", content: "Informații despre modul în care Teo Select Auto folosește cookies." },
    ],
    links: [{ rel: "canonical", href: "/politica-cookies" }],
  }),
});

function PoliticaCookies() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
      <p className="text-xs uppercase tracking-[0.25em] text-primary">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
        Politica de <span className="gold-gradient-text">cookies</span>
      </h1>

      <div className="mt-12 space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Ce sunt cookies?</h2>
          <p>
            Cookies sunt fișiere text mici stocate pe dispozitivul dumneavoastră atunci când vizitați un site web.
            Acestea ajută site-ul să funcționeze corect și să vă ofere o experiență mai bună.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Ce cookies folosim?</h2>
          <div className="space-y-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-medium text-foreground">Cookies necesare</h3>
              <p className="mt-1 text-sm">
                Esențiale pentru funcționarea site-ului. Fără ele, site-ul nu poate funcționa corect.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-medium text-foreground">Cookies de analiză</h3>
              <p className="mt-1 text-sm">
                Ne ajută să înțelegem cum este folosit site-ul (Google Analytics). Datele sunt anonimizate.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-medium text-foreground">Cookies de marketing</h3>
              <p className="mt-1 text-sm">
                Folosite pentru a vă arăta reclame relevante (Facebook Pixel, Google Ads).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Cum puteți controla cookies?</h2>
          <p>
            Puteți accepta toate cookies, doar pe cele necesare, sau le puteți șterge oricând din setările
            browserului dumneavoastră. Rețineți că dezactivarea cookies poate afecta funcționarea site-ului.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
          <p>
            Pentru întrebări despre cookies, ne puteți contacta la{" "}
            <a href="mailto:teo.select.auto@gmail.com" className="text-primary hover:underline">
              teo.select.auto@gmail.com
            </a>
          </p>
        </section>

        <p className="pt-8 text-xs text-muted-foreground/60 border-t border-border/40">
          Ultima actualizare: {new Date().toLocaleDateString("ro-RO", { year: "numeric", month: "long" })}
        </p>
      </div>
    </div>
  );
}