import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Wrench, 
  Search, 
  FileCheck2, 
  FileText, 
  MessageCircle, 
  CarFront, 
  Fingerprint, 
  Gauge, 
  ListChecks,
  ChevronDown,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-car.jpg";
import { VehicleCard } from "@/components/site/VehicleCard";
import { budgetRanges } from "@/lib/vehicles";
import { useVehiclesQuery } from "@/lib/vehicle-api";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: vehicles = [] } = useVehiclesQuery();
  const featured = vehicles.filter((v) => v.featured).slice(0, 6);
  const list = featured.length ? featured : vehicles.slice(0, 6);
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImage}
            alt="Auto rulate premium Teo Select Auto"
            width={1920}
            height={1080}
            fetchpriority="high"
            decoding="async"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-32 pt-32 lg:px-10 lg:pt-40">
          <div className="max-w-3xl">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Selecție 2026
            </span>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl">
              Teo Select Auto.{" "}
              <span className="gold-gradient-text">Excelență în fiecare mașină.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Descoperă selecția noastră de vehicule premium. Fiecare mașină este verificată tehnic în service autorizat și livrată cu garanție de 12 luni.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/vehicule"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:var(--color-primary-hover)]"
              >
                Vezi stocul
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/rascumparare"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Îți cumpărăm mașina
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto -mt-12 max-w-7xl px-4 sm:px-6 pb-24 lg:px-10">
          <div className="glass rounded-2xl p-4 sm:p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-primary text-center sm:text-left">
              Alege după buget
            </p>
            <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-5">
              {budgetRanges.map((r) => (
                <Link
                  key={r.label}
                  to="/vehicule"
                  search={{ maxPrice: r.max === 999999 ? undefined : r.max }}
                  className={`rounded-xl border border-border bg-background/40 px-2 sm:px-4 py-3 sm:py-4 text-center text-xs sm:text-sm font-medium text-foreground/90 transition-all hover:border-primary hover:bg-primary/5 hover:text-primary ${
                    r.max === 999999 ? "col-span-2 md:col-span-1" : ""
                  }`}
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Stoc curent</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
              Vehicule recomandate
            </h2>
          </div>
          <Link to="/vehicule" className="hidden text-sm text-muted-foreground hover:text-primary md:inline-flex">
            Vezi toate →
          </Link>
        </div>

        {list.length === 0 ? (
          <p className="text-center text-muted-foreground">Nu există vehicule în stoc momentan.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {list.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
          </div>
        )}
      </section>

      <section className="border-y border-border/60 bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">De ce Teo Select Auto</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
              Selecție atentă. Transparență. Încredere.
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Advantage 
              icon={ShieldCheck} 
              title="Garanție 12 luni" 
              desc="Fiecare autoturism este livrat cu garanție, conform condițiilor contractuale. Ai mai multă siguranță după achiziție." 
            />
            <Advantage 
              icon={FileCheck2} 
              title="VIN & Istoric verificat" 
              desc="Verificăm seria VIN și informațiile disponibile despre istoricul autoturismului înainte de achiziție." 
            />
            <Advantage 
              icon={Wrench} 
              title="Mașini verificate" 
              desc="Verificăm principalele componente tehnice și prezentăm transparent starea cunoscută a autoturismului înainte de achiziție." 
            />
            <Advantage 
              icon={FileText} 
              title="Acte clare & suport" 
              desc="Factură, contract și documentele necesare, cu suport din partea noastră pe parcursul procesului de cumpărare." 
            />
          </div>
        </div>
      </section>

      {/* Secțiunea CUM CUMPERI */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Cum cumperi</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Simplu. Transparent. Fără bătăi de cap.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            De la prima întrebare până la momentul în care pleci cu mașina, te ajutăm să parcurgi fiecare pas.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-primary/20 -translate-y-1/2" />
          <div className="hidden lg:block absolute top-1/2 left-[12.5%] right-[12.5%] h-[2px] bg-primary/40 -translate-y-1/2" />
          
          <Step 
            number="01" 
            icon={Search} 
            title="Alegi mașina" 
            desc="Descoperi autoturismele disponibile și alegi modelul potrivit pentru tine și bugetul tău." 
          />
          <Step 
            number="02" 
            icon={MessageCircle} 
            title="Ne contactezi" 
            desc="Îți oferim toate informațiile despre mașină și răspundem întrebărilor tale înainte de vizionare." 
          />
          <Step 
            number="03" 
            icon={CarFront} 
            title="Vezi & verifici" 
            desc="Vii să vezi mașina, faci un test-drive și poți solicita verificări suplimentare înainte de achiziție." 
          />
          <Step 
            number="04" 
            icon={FileCheck2} 
            title="Acte & livrare" 
            desc="Pregătim documentele necesare și te ajutăm să parcurgi simplu ultimii pași până la livrare." 
          />
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-medium text-foreground">Ai găsit mașina potrivită?</p>
          <Link
            to="/vehicule"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:var(--color-primary-hover)]"
          >
            Vezi stocul
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Secțiunea ȘTII CE CUMPERI */}
      <section className="border-y border-border/60 bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Transparență</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
              Știi ce cumperi.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Fiecare mașină trebuie să vină cu informații clare. Îți prezentăm datele relevante despre autoturism pentru ca tu să poți lua o decizie informată.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
            <TrustItem 
              icon={Fingerprint} 
              title="VIN verificat" 
              desc="Verificăm seria VIN și informațiile disponibile despre istoricul autoturismului." 
            />
            <TrustItem 
              icon={Gauge} 
              title="Kilometraj" 
              desc="Îți prezentăm kilometrajul declarat și informațiile disponibile despre acesta." 
            />
            <TrustItem 
              icon={ListChecks} 
              title="Dotări reale" 
              desc="Ai acces la echiparea și dotările relevante ale autoturismului." 
            />
            <TrustItem 
              icon={Wrench} 
              title="Stare transparentă" 
              desc="Îți comunicăm aspectele importante cunoscute despre starea mașinii înainte de achiziție." 
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Nu promitem perfecțiune. Promitem{' '}
              <span className="gold-gradient-text font-medium">transparență</span>.
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/vehicule"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:var(--color-primary-hover)]"
            >
              Vezi stocul
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Secțiunea Răscumpărare */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-10">
        <div className="glass relative overflow-hidden rounded-3xl p-10 md:p-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Răscumpărare</p>
              <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
                Îți cumpărăm mașina în{" "}
                <span className="gold-gradient-text">48 de ore</span>
              </h2>
              <p className="mt-5 text-muted-foreground">
                Trimite-ne specificațiile și câteva poze. Îți facem o ofertă
                onestă, plata pe loc, transferul făcut de noi.
              </p>
              <Link
                to="/rascumparare"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-[color:var(--color-primary-hover)]"
              >
                Trimite propunere <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex justify-end">
              <Search className="h-40 w-40 text-primary/30" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* Secțiunea ÎNTREBĂRI FRECVENTE */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Întrebări frecvente</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
              Ai întrebări? Avem răspunsuri.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Am adunat cele mai frecvente întrebări despre achiziția unui autoturism de la Teo Select Auto.
            </p>
          </div>

          <div className="mt-12 space-y-1">
            <FAQItem 
              question="Mașinile sunt importate din Europa?"
              answer="Selectăm și importăm autoturisme rulate din piețele auto europene. Pentru fiecare mașină prezentăm informațiile disponibile despre proveniență și istoricul acesteia."
            />
            <FAQItem 
              question="Pot verifica mașina înainte să o cumpăr?"
              answer="Da. Încurajăm verificarea autoturismului înainte de achiziție. Poți vedea mașina, poți face un test-drive și poți solicita verificări suplimentare."
            />
            <FAQItem 
              question="Pot face test-drive?"
              answer="Da, test-drive-ul poate fi făcut în condițiile stabilite pentru autoturismul respectiv. Pentru a evita așteptarea, recomandăm programarea în prealabil."
            />
            <FAQItem 
              question="Oferiți garanție?"
              answer="Autoturismele beneficiază de garanție conform condițiilor contractuale aplicabile fiecărui vehicul. Detaliile garanției sunt prezentate înainte de achiziție."
            />
            <FAQItem 
              question="Pot verifica mașina într-un service ales de mine?"
              answer="Poți solicita o verificare suplimentară a autoturismului înainte de achiziție. Stabilim împreună detaliile și disponibilitatea în funcție de locație și program."
            />
            <FAQItem 
              question="Ce documente primesc la achiziție?"
              answer="Primești documentele necesare achiziției și actele aferente autoturismului, împreună cu factura și contractul de vânzare-cumpărare."
            />
            <FAQItem 
              question="Oferiți finanțare?"
              answer="Dacă pentru autoturismul respectiv este disponibilă o soluție de finanțare, îți prezentăm opțiunile disponibile și te ajutăm cu pașii necesari."
            />
            <FAQItem 
              question="Faceți livrare în alte localități din România?"
              answer="Da, putem discuta opțiunile de livrare pentru autoturismul dorit. Costul și condițiile se stabilesc în funcție de destinație."
            />
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg font-medium text-foreground">Mai ai o întrebare?</p>
            <p className="text-sm text-muted-foreground mt-1">Suntem aici să te ajutăm.</p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:var(--color-primary-hover)]"
            >
              Vorbește cu noi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Secțiunea CONTACT */}
      <section className="border-y border-border/60 bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Stânga - Text și CTA */}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Contact</p>
              <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
                Ai găsit mașina potrivită?
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Vorbește cu noi, află mai multe despre mașină și hai să o vezi.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/40760323331"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:var(--color-primary-hover)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Vorbește pe WhatsApp
                </a>
                <a
                  href="tel:+40760323331"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  Sună-ne
                </a>
              </div>

              <div className="mt-8">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Vizionările se stabilesc telefonic.</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Contactează-ne înainte de a veni pentru a confirma disponibilitatea autoturismului dorit.
                </p>
              </div>
            </div>

            {/* Dreapta - Informații contact */}
            <div className="glass rounded-2xl p-8 md:p-10">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Locație</h4>
                    <p className="text-sm text-muted-foreground">
                      Strada Constantin Solomon nr. 13
                      <br />
                      Tecuci, județul Galați
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Telefon</h4>
                    <a 
                      href="tel:+40760323331" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      0760 323 331
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Email</h4>
                    <a 
                      href="mailto:teo.select.auto@gmail.com" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      teo.select.auto@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/40">
                <p className="text-xs text-muted-foreground text-center">
                  Teo Select Auto — mașini rulate selectate cu atenție.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Advantage({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
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

function Step({ number, icon: Icon, title, desc }: { number: string; icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
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

function TrustItem({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="text-center group">
      <div className="flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-primary/10 text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/20">
          <Icon className="h-7 w-7" />
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{desc}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/40 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary group"
        aria-expanded={isOpen}
      >
        <span className={`text-base font-medium transition-colors ${isOpen ? 'text-primary' : 'text-foreground'}`}>
          {question}
        </span>
        <ChevronDown 
          className={`h-5 w-5 shrink-0 transition-transform duration-300 text-muted-foreground group-hover:text-primary ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-sm text-muted-foreground leading-relaxed pr-4">
          {answer}
        </p>
      </div>
    </div>
  );
}