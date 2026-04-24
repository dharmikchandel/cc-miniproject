import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(69,215,255,0.16),transparent_52%)]" />
      <div className="pointer-events-none absolute right-[-10rem] top-20 h-80 w-80 rounded-full bg-primary-bright/10 blur-3xl" />
      <div className="pointer-events-none absolute left-[-8rem] top-1/2 h-72 w-72 rounded-full bg-primary-neon/10 blur-3xl" />

      <main className="app-shell flex min-h-screen items-center">
        <section className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="eyebrow">
              <Sparkles className="mr-2 size-4" />
              Decision Intelligence Engine
            </div>

            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold text-white sm:text-6xl lg:text-7xl">
                Cloud Strategy,
                <span className="bg-gradient-to-r from-white via-primary to-primary-bright bg-clip-text text-transparent">
                  {" "}Rendered as Intelligence.
                </span>
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Evaluate your organization against the Cloud Cube Model and surface the best-fit cloud business model through a premium AI-style recommendation workflow.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/assess">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Assessment
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Dashboard
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="metric-tile">
                <div className="mb-3 flex size-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <BarChart3 className="size-5" />
                </div>
                <div className="text-sm font-medium text-white">Precision Matching</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Score cloud business models against organizational priorities and operational constraints.
                </p>
              </div>

              <div className="metric-tile">
                <div className="mb-3 flex size-11 items-center justify-center rounded-2xl border border-[rgba(25,230,140,0.22)] bg-[rgba(25,230,140,0.12)] text-[var(--color-safe)]">
                  <ShieldCheck className="size-5" />
                </div>
                <div className="text-sm font-medium text-white">Risk Visibility</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Highlight trade-offs across security, compliance, portability, and control dimensions.
                </p>
              </div>

              <div className="metric-tile">
                <div className="mb-3 flex size-11 items-center justify-center rounded-2xl border border-primary-bright/20 bg-primary-bright/10 text-primary-bright">
                  <Sparkles className="size-5" />
                </div>
                <div className="text-sm font-medium text-white">Executive Ready</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Move from assessment to recommendation review with a clean data-intelligence dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="app-panel panel-glow relative overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                    Live Insight Panel
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    Cloud Cube Decision Matrix
                  </h2>
                </div>
                <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Active
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="metric-tile">
                  <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Signal Strength</div>
                  <div className="mt-3 text-4xl font-semibold text-white">94%</div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                    <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-primary to-primary-bright shadow-[0_0_18px_rgba(69,215,255,0.4)]" />
                  </div>
                </div>

                <div className="metric-tile">
                  <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Recommendation</div>
                  <div className="mt-3 text-xl font-semibold text-white">Hybrid Intelligence Model</div>
                  <div className="mt-3 inline-flex rounded-full border border-[rgba(25,230,140,0.25)] bg-[rgba(25,230,140,0.12)] px-3 py-1 text-xs font-semibold text-[var(--color-safe)]">
                    High confidence fit
                  </div>
                </div>
              </div>

              <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="text-sm font-medium text-white">Model Vectors</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">4 dimensions</div>
                </div>
                <div className="space-y-4">
                  {["Internal Control", "Openness", "Perimeter Security", "Insourcing"].map((label, index) => (
                    <div key={label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium text-white">{[88, 74, 91, 69][index]}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-bright shadow-[0_0_16px_rgba(47,128,255,0.35)]"
                          style={{ width: `${[88, 74, 91, 69][index]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
