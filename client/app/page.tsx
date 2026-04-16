import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-bg-0 text-white relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-neon opacity-10 blur-[100px] rounded-full pointer-events-none" />
      
      <main className="z-10 flex flex-col items-center text-center max-w-3xl space-y-8">
        <div className="inline-flex items-center rounded-full border border-primary-neon/30 bg-primary-neon/10 px-3 py-1 text-sm font-medium text-primary-neon">
          Decision Intelligence Engine
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Cloud Strategy, <br className="hidden md:block" /> Engineered.
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Evaluate your organizational needs against the Cloud Cube Model. Get high-precision recommendations for your optimal cloud business model—without the sales pitch.
        </p>
        
        <div className="pt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/assess">
            <Button size="lg" className="w-full sm:w-auto bg-primary-neon text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(47,128,255,0.4)] px-8 text-lg h-14">
              Start Assessment
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-border bg-bg-1 hover:bg-bg-2 text-white px-8 text-lg h-14">
              View Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
