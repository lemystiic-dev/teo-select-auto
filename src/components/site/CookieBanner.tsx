import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "teo-cookie-consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(STORAGE_KEY, "all");
    setIsVisible(false);
    window.dispatchEvent(new Event("cookies-accepted"));
  };

  const acceptNecessary = () => {
    localStorage.setItem(STORAGE_KEY, "necessary");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6">
      <div className="mx-auto max-w-4xl glass rounded-2xl border border-border/60 p-5 sm:p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-primary/10 text-primary">
            <Cookie className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Cookie className="h-4 w-4 text-primary sm:hidden" />
              Folosim cookies
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Folosim cookies pentru a-ți oferi o experiență mai bună, pentru a analiza traficul și pentru a-ți
              arăta reclame relevante. Poți accepta toate cookies sau doar pe cele necesare.{" "}
              <Link
                to="/politica-cookies"
                className="text-primary hover:underline"
              >
                Detalii
              </Link>
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs sm:text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:var(--color-primary-hover)]"
              >
                Accept toate
              </button>
              <button
                onClick={acceptNecessary}
                className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-xs sm:text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Doar necesare
              </button>
            </div>
          </div>

          <button
            onClick={acceptNecessary}
            className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-primary"
            aria-label="Închide"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}