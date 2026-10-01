import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/vehicles";

const APR = 0.12;

export function LoanCalculator({ price }: { price: number }) {
  const [advance, setAdvance] = useState(0);
  const [months, setMonths] = useState(48);

  const monthly = useMemo(() => {
    const principal = Math.max(price - advance, 0);
    const r = APR / 12;
    if (principal === 0) return 0;
    return (principal * r) / (1 - Math.pow(1 + r, -months));
  }, [price, advance, months]);

  const total = monthly * months + advance;

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Calculator credit</p>
        <h3 className="mt-1 text-xl font-semibold">Rată lunară estimată</h3>
        <p className="mt-1 text-xs text-muted-foreground">DAE 12% · 0 avans posibil</p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="advance" className="text-muted-foreground">Avans</label>
            <span className="font-medium text-foreground">{formatPrice(advance)}</span>
          </div>
          <input
            id="advance"
            type="range"
            min={0}
            max={price}
            step={100}
            value={advance}
            onChange={(e) => setAdvance(Number(e.target.value))}
            className="mt-2 w-full accent-[color:var(--color-primary)]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="months" className="text-muted-foreground">Perioadă</label>
            <span className="font-medium text-foreground">{months} luni</span>
          </div>
          <input
            id="months"
            type="range"
            min={12}
            max={60}
            step={6}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="mt-2 w-full accent-[color:var(--color-primary)]"
          />
        </div>

        <div className="rounded-xl border border-primary/40 bg-primary/5 p-5 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Rată lunară</p>
          <p className="mt-2 text-4xl font-semibold gold-gradient-text">
            {formatPrice(Math.round(monthly))}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Total plătit: {formatPrice(Math.round(total))}
          </p>
        </div>

        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Calcul orientativ. Oferta finală depinde de evaluarea instituției financiare.
        </p>
      </div>
    </div>
  );
}