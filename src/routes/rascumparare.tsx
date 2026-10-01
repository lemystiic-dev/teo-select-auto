import { createFileRoute } from "@tanstack/react-router";
import { 
  CarFront, 
  Phone, 
  Mail, 
  Search, 
  FileText, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export const Route = createFileRoute("/rascumparare")({
  component: BuyBack,
  head: () => ({
    meta: [
      { title: "Răscumpărare auto — Teo Select Auto" },
      { name: "description", content: "Vrei să îți vinzi mașina? Contactează Teo Select Auto pentru a discuta despre răscumpărarea autoturismului tău." },
      { property: "og:title", content: "Răscumpărare auto — Teo Select Auto" },
    ],
    links: [{ rel: "canonical", href: "/rascumparare" }],
  }),
});

function BuyBack() {
  return (
    <>
      {/* HERO / INTRODUCERE */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Răscumpărare auto</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-6xl">
            Vrei să îți vinzi mașina?{" "}
            <span className="gold-gradient-text">O putem cumpăra noi.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Trimite-ne informațiile despre autoturismul tău, iar echipa Teo Select Auto va analiza 
            mașina și îți va comunica dacă aceasta se potrivește criteriilor noastre de achiziție.
          </p>
        </div>
      </section>

      {/* CUM FUNCȚIONEAZĂ */}
      <section className="border-y border-border/60 bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Cum funcționează</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Simplu și fără drumuri inutile.
              </h2>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              <Step 
                number="01" 
                icon={CarFront} 
                title="Ne contactezi" 
                desc="Ne trimiți informațiile de bază despre autoturism și câteva detalii despre acesta." 
              />
              <Step 
                number="02" 
                icon={Search} 
                title="Analizăm mașina" 
                desc="Evaluăm informațiile disponibile despre autoturism, inclusiv modelul, anul, kilometrajul și starea cunoscută." 
              />
              <Step 
                number="03" 
                icon={FileText} 
                title="Discutăm oferta" 
                desc="Dacă autoturismul se potrivește criteriilor noastre de achiziție, discutăm împreună următorii pași." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* CE INFORMAȚII SĂ NE TRIMIȚI */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Pentru o evaluare mai rapidă</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Ce avem nevoie să știm despre mașina ta?
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <InfoItem text="Marcă și model" />
            <InfoItem text="Anul fabricației" />
            <InfoItem text="Kilometraj" />
            <InfoItem text="Motorizare" />
            <InfoItem text="Cutie de viteze" />
            <InfoItem text="Număr de proprietari (dacă este cunoscut)" />
            <InfoItem text="Starea generală a mașinii" />
            <InfoItem text="Eventuale daune sau probleme cunoscute" />
            <InfoItem text="Câteva fotografii ale autoturismului" />
          </div>
        </div>
      </section>

      {/* NOTĂ DE TRANSPARENȚĂ */}
      <section className="border-y border-border/60 bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Evaluarea și oferta de achiziție depind de modelul autoturismului, anul, kilometrajul, 
                  starea tehnică și estetică, istoricul și cererea actuală de pe piață.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="glass relative overflow-hidden rounded-3xl p-10 md:p-16">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Vrei să îți vinzi mașina?</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Hai să <span className="gold-gradient-text">discutăm.</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Pentru moment, ne poți trimite detaliile autoturismului prin email sau ne poți contacta telefonic.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:+40760323331"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:var(--color-primary-hover)]"
                >
                  <Phone className="h-4 w-4" />
                  Sună-ne
                </a>
                <a
                  href="mailto:teo.select.auto@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  Trimite detaliile pe email
                </a>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Poți include marca, modelul, anul, kilometrajul, motorizarea și câteva fotografii.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ number, icon: Icon, title, desc }: { 
  number: string; 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  desc: string;
}) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-gold)] flex flex-col h-full">
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

function InfoItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-card/30 transition-all hover:border-primary/30 hover:bg-primary/5">
      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
      <span className="text-sm text-foreground">{text}</span>
    </div>
  );
}