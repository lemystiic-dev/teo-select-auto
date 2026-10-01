import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Teo Select Auto" },
      { name: "description", content: "Contactează Teo Select Auto pentru informații despre autoturismele din stoc, achiziție și detalii despre vehiculele disponibile." },
      { property: "og:title", content: "Contact — Teo Select Auto" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  return (
    <>
      {/* HERO / INTRODUCERE */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Contact</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-6xl">
            Hai să vorbim despre{" "}
            <span className="gold-gradient-text">următoarea ta mașină.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Ai găsit o mașină care îți place sau vrei să afli mai multe despre stocul nostru? 
            Ne poți contacta telefonic sau prin email și îți răspundem cu informațiile de care ai nevoie.
          </p>
        </div>
      </section>

      {/* DATE DE CONTACT - Carduri */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            <ContactCard 
              icon={Phone} 
              title="Telefon" 
              value="0760 323 331"
              href="tel:+40760323331"
            />
            <ContactCard 
              icon={Mail} 
              title="Email" 
              value="teo.select.auto@gmail.com"
              href="mailto:teo.select.auto@gmail.com"
            />
            <ContactCard 
              icon={MapPin} 
              title="Adresă" 
              value={
                <>
                  Str. Constantin Solomon nr. 13
                  <br />
                  Tecuci, Galați
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* SECȚIUNEA „UNDE NE GĂSEȘTI” */}
      <section className="border-y border-border/60 bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-primary">Locație</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                  Ne găsești în <span className="gold-gradient-text">Tecuci, Galați.</span>
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Strada Constantin Solomon nr. 13, Tecuci, județul Galați.
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Strada+Constantin+Solomon+13,+Tecuci,+Galati,+Romania"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <MapPin className="h-4 w-4" />
                  Deschide în Google Maps
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="glass rounded-2xl p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Teo Select Auto</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Strada Constantin Solomon nr. 13
                      <br />
                      Tecuci, Județul Galați
                      <br />
                      România
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border/40">
                  <p className="text-xs text-muted-foreground">
                    Pentru a ne asigura că te putem ajuta cât mai bine, recomandăm să ne contactezi telefonic înainte de a veni la adresă.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECȚIUNEA „CONTACTEAZĂ-NE” */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="glass relative overflow-hidden rounded-3xl p-10 md:p-16">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Ai o întrebare?</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Suntem aici să te ajutăm.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Pentru informații despre o mașină din stoc, detalii despre achiziție sau orice altă întrebare, ne poți contacta direct.
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
                  Trimite email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ 
  icon: Icon, 
  title, 
  value, 
  href 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  value: React.ReactNode; 
  href?: string;
}) {
  const content = (
    <>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      <p className="mt-2 text-lg font-medium text-foreground">
        {value}
      </p>
    </>
  );

  const className = "group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-gold)] flex flex-col h-full";

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
}