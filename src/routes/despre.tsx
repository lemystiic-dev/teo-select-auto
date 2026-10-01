import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  Sparkles, 
  FileCheck2, 
  Handshake, 
  ShieldCheck, 
  Wrench, 
  FileText,
  ArrowRight,
  Search,
  Eye,
  ClipboardCheck
} from "lucide-react";

export const Route = createFileRoute("/despre")({
  component: About,
  head: () => ({
    meta: [
      { title: "Despre noi — Teo Select Auto" },
      { name: "description", content: "Descoperă Teo Select Auto, dealer auto specializat în autoturisme rulate atent selecționate, cu accent pe transparență, verificare și suport pentru clienți." },
      { property: "og:title", content: "Despre noi — Teo Select Auto" },
    ],
    links: [{ rel: "canonical", href: "/despre" }],
  }),
});

function About() {
  return (
    <>
      {/* HERO / INTRODUCERE */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Despre noi</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-6xl">
            Mașini atent selecționate.{" "}
            <span className="gold-gradient-text">Un proces în care poți avea încredere.</span>
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            Teo Select Auto este un dealer auto specializat în autoturisme rulate atent selecționate. 
            Ne concentrăm pe alegerea unor mașini care oferă un raport bun între preț, stare, echipare 
            și istoricul disponibil.
          </p>
        </div>
      </section>

      {/* SECȚIUNEA „MISIUNEA NOASTRĂ” */}
      <section className="border-y border-border/60 bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="glass rounded-2xl p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Misiunea noastră</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Să facem cumpărarea unei mașini rulate mai simplă și mai transparentă.
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Știm că alegerea unei mașini rulate poate veni cu multe întrebări. De aceea, 
                  ne concentrăm pe un proces clar: selectăm cu atenție autoturismele pe care le 
                  oferim, verificăm informațiile disponibile și prezentăm cât mai transparent 
                  ceea ce știm despre fiecare mașină.
                </p>
                <p>
                  Scopul nostru nu este să avem cel mai mare stoc, ci să construim un stoc în 
                  care fiecare autoturism să merite atenția unui client.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECȚIUNEA „VALORILE NOASTRE” */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Valorile noastre</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Trei principii după care lucrăm.
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <ValueCard 
              icon={Sparkles} 
              title="Selecție atentă" 
              desc="Nu urmărim să avem cel mai mare stoc, ci să alegem autoturisme care merită prezentate clienților noștri." 
            />
            <ValueCard 
              icon={FileCheck2} 
              title="Transparență" 
              desc="Prezentăm informațiile disponibile despre mașină, istoricul cunoscut și starea acesteia, fără promisiuni inutile sau informații ascunse." 
            />
            <ValueCard 
              icon={Handshake} 
              title="Suport" 
              desc="Te ajutăm pe parcursul procesului de achiziție, de la primele informații despre mașină până la documentele necesare." 
            />
          </div>
        </div>
      </section>

      {/* SECȚIUNEA „CUM LUCRĂM” */}
      <section className="border-y border-border/60 bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Cum lucrăm</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Un proces clar, de la selecție la livrare.
              </h2>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <ProcessStep 
                number="01" 
                icon={Search} 
                title="Selectăm" 
                desc="Căutăm și selectăm autoturisme care se potrivesc criteriilor noastre de achiziție." 
              />
              <ProcessStep 
                number="02" 
                icon={ClipboardCheck} 
                title="Verificăm" 
                desc="Verificăm informațiile disponibile despre autoturism, seria VIN și starea cunoscută a mașinii." 
              />
              <ProcessStep 
                number="03" 
                icon={Eye} 
                title="Prezentăm" 
                desc="Îți prezentăm cât mai clar caracteristicile, dotările și informațiile relevante despre autoturism." 
              />
              <ProcessStep 
                number="04" 
                icon={Handshake} 
                title="Livrăm" 
                desc="Te sprijinim cu pașii necesari pentru finalizarea achiziției și documentele aferente." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECȚIUNEA „DE CE TEO SELECT AUTO” */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">De ce Teo Select Auto</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Mai multă claritate. <span className="gold-gradient-text">Mai puține surprize.</span>
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <TrustCard 
              icon={ShieldCheck} 
              title="Garanție" 
              desc="Pentru autoturismele care beneficiază de garanție, aceasta este oferită conform condițiilor contractuale." 
            />
            <TrustCard 
              icon={FileCheck2} 
              title="VIN & istoric verificat" 
              desc="Verificăm seria VIN și informațiile disponibile despre istoricul autoturismului." 
            />
            <TrustCard 
              icon={Wrench} 
              title="Mașini verificate" 
              desc="Urmărim ca informațiile relevante despre starea autoturismului să fie prezentate cât mai transparent." 
            />
            <TrustCard 
              icon={FileText} 
              title="Acte clare & suport" 
              desc="Oferim documentele necesare și suport pe parcursul procesului de cumpărare." 
            />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-y border-border/60 bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Găsește următoarea ta mașină</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Poate următoarea ta mașină este deja în stoc.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Descoperă autoturismele disponibile și găsește modelul potrivit pentru tine.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/vehicule"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:var(--color-primary-hover)]"
              >
                Vezi stocul
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Contactează-ne
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ValueCard({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-gold)] flex flex-col h-full">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-primary/10 text-primary shrink-0">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-1">{desc}</p>
    </div>
  );
}

function ProcessStep({ number, icon: Icon, title, desc }: { number: string; icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-gold)] flex flex-col h-full relative">
      <div className="flex items-start justify-between">
        <span className="text-4xl font-bold text-primary/10 select-none">{number}</span>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-primary/10 text-primary shrink-0">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">{desc}</p>
    </div>
  );
}

function TrustCard({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="group flex gap-4 p-4 rounded-xl border border-border bg-card transition-all hover:border-primary/60 hover:shadow-[var(--shadow-gold)]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-primary/10 text-primary transition-colors group-hover:border-primary/40">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}