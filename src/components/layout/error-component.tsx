import { useRouter } from "@tanstack/react-router";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ErrorComponentProps {
  error: Error;
  reset?: () => void;
}

export function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  useEffect(() => {
    // Log exception context securely to structural monitoring streams
    console.error("Layout Boundary Fault:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background text-foreground px-6">
      <div className="relative max-w-lg w-full bg-card p-6 md:p-8 rounded-3xl border border-destructive/20 shadow-xs overflow-hidden">
        {/* Subtle warning hue flare */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-destructive/5 rounded-bl-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-5">
          {/* Destructive Themed Icon Box */}
          <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center border border-destructive/20 backdrop-blur-xs">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>

          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl font-bold text-foreground tracking-tight">
              Execution Fault Encountered
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-destructive">
              Pipeline Disrupted
            </p>
          </div>

          {/* Secure Debug Message Box */}
          <div className="w-full bg-secondary/40 border border-border/60 p-3.5 rounded-xl text-left max-h-28 overflow-y-auto">
            <p className="text-[11px] font-mono text-muted-foreground break-all whitespace-pre-wrap leading-normal">
              {error?.message ||
                "An unhandled runtime mutation interrupted core view parameters."}
            </p>
          </div>

          <p className="text-xs text-muted-foreground/80 leading-normal max-w-sm">
            Operational connectivity failed to compile this section. Try cycling
            the active route or reloading state parameters.
          </p>

          {/* Dynamic Recovery Control Grid */}
          <div className="grid grid-cols-2 gap-3 w-full pt-4 border-t border-border">
            <Button
              variant="outline"
              className="rounded-xl text-xs font-semibold border-border hover:bg-secondary/60"
              onClick={() => {
                reset?.();
                router.invalidate();
              }}
            >
              <RefreshCw className="w-3.5 h-3.5 mr-2" /> Re-Evaluate
            </Button>
            <Button
              className="rounded-xl text-xs font-semibold bg-primary hover:bg-primary/90"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="w-3.5 h-3.5 mr-2" /> Hard Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
