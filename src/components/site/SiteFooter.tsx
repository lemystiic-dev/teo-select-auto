import { Link } from "@tanstack/react-router";
import { Facebook, Mail, MapPin, Phone, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {/* Coloana 1 - Brand */}
        <div>
          <div className="text-2xl font-semibold tracking-tight">
            <span className="gold-gradient-text">Teo Select Auto</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Mașini rulate selectate cu atenție, cu informații clare și un proces simplu de cumpărare.
          </p>
          <p className="mt-4 text-xs text-muted-foreground/60">
            TEO SELECT AUTO SRL
          </p>
        </div>

        {/* Coloana 2 - Navigare */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-primary">
            Navigare
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li><Link to="/vehicule" className="hover:text-primary transition-colors">Vehicule</Link></li>
            <li><Link to="/rascumparare" className="hover:text-primary transition-colors">Răscumpărare</Link></li>
            <li><Link to="/despre" className="hover:text-primary transition-colors">Despre noi</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Coloana 3 - Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-primary shrink-0" />
              <span>
                Strada Constantin Solomon nr. 13
                <br />
                Tecuci, județul Galați
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <a 
                href="tel:+40760323331" 
                className="hover:text-primary transition-colors"
              >
                0760 323 331
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-4 w-4 text-primary shrink-0"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 10h.01" />
                <path d="M12 10h.01" />
                <path d="M16 10h.01" />
              </svg>
              <a 
                href="https://wa.me/40760323331" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <a 
                href="mailto:teo.select.auto@gmail.com" 
                className="hover:text-primary transition-colors"
              >
                teo.select.auto@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Coloana 4 - Urmărește-ne */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-primary">Urmărește-ne</h4>
          <div className="mt-5 flex gap-3">
            <a 
              href="https://www.facebook.com/people/Teo-Select-Auto/61582338790680/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook" 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a 
              href="https://www.tiktok.com/@teo.select.auto" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok" 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a 
              href="https://www.youtube.com/@TeoSelectAuto" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="YouTube" 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ANPC SAL & SOL - Plachete oficiale */}
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <div className="flex flex-col items-center justify-center gap-4 my-4 sm:flex-row sm:gap-6">
            <a 
              href="https://anpc.ro/ce-este-sal/" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block"
            >
              <img 
                loading="lazy"
                src="https://e-advertising.co/anpc/eadv-sal.png" 
                alt="Soluționarea Alternativă a Litigiilor" 
                className="w-[250px] max-w-full h-auto border-0 block"
              />
            </a>
            <a 
              href="https://ec.europa.eu/consumers/odr" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block"
            >
              <img 
                loading="lazy"
                src="https://e-advertising.co/anpc/eadv-sol.png" 
                alt="Soluționarea Online a Litigiilor" 
                className="w-[250px] max-w-full h-auto border-0 block"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Zona inferioară */}
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground md:flex-row">
            <p>© {new Date().getFullYear()} Teo Select Auto. Toate drepturile rezervate.</p>
            <p className="text-center text-muted-foreground/60">
              TEO SELECT AUTO SRL · CUI 52713368 · J2025079044007
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}