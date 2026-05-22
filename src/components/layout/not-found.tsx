import { Link, useRouter } from "@tanstack/react-router";
import { Compass, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundComponent() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background text-foreground px-6 select-none">
      <div className="relative max-w-md w-full text-center space-y-8 bg-card p-8 md:p-10 rounded-3xl border border-border shadow-xs overflow-hidden">
        {/* Decorative background flare */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-accent/20 rounded-bl-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Accent Icon Holder */}
          <div className="w-16 h-16 rounded-2xl bg-secondary/60 flex items-center justify-center mb-6 border border-border/60 backdrop-blur-xs">
            <Compass className="w-8 h-8 text-primary animate-pulse" />
          </div>

          <h1 className="font-serif text-5xl font-black text-foreground tracking-tight mb-2">
            404
          </h1>
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
            Route Uncharted
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
            The profile segment, workspace, or connection loop you are seeking
            does not exist or has been modified.
          </p>
        </div>

        {/* Action Footers */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 border-t border-border relative z-10">
          <Button
            variant="outline"
            className="rounded-xl border-border hover:bg-secondary/60 text-xs font-semibold"
            onClick={() => router.history.back()}
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Go Back
          </Button>
          <Button
            asChild
            className="rounded-xl text-xs font-semibold shadow-xs shadow-primary/10"
          >
            <Link to="/">
              <Home className="w-3.5 h-3.5 mr-2" /> My Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
