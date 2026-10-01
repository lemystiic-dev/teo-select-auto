import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import logo from "/favicon.png";
import { useIsAdmin } from "@/lib/vehicle-api";

const nav = [
  { to: "/", label: "Acasă" },
  { to: "/vehicule", label: "Vehicule" },
  { to: "/rascumparare", label: "Răscumpărare" },
  { to: "/despre", label: "Despre" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { data: isAdmin } = useIsAdmin();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-3" aria-label="Teo Select Auto">
          <img
            src={logo}
            alt="Teo Select Auto"
            className="h-10 w-auto md:h-12"
            loading="eager"
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAdmin && (
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
            >
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Link>
          )}
          <a
            href="tel:+40700000000"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            +40 760 323 331
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-md p-2 text-foreground lg:hidden"
          aria-label="Meniu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1 px-6 py-6">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-secondary hover:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}