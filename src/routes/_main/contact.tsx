import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Sparkles, Code2, Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/_main/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  const developer = {
    name: "karthik kumar",
    email: "karthithelearner@gmail.com",
    role: "Senior Software Developer",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKy4JIGpq64cQdRDSgipS4djgKh3-UOCOCLUgzTD7lhnd_6KkR7=s96-c",
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10 relative overflow-hidden flex items-center justify-center">
      {/* Background Ambience Layers */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 bg-primary/5 blur-[120px] rounded-full" />

      <main className="w-full max-w-lg px-6 py-12">
        {/* Header Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Project Creator
          </div>
          <h1 className="mt-3 font-serif text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Developer Node
          </h1>
        </div>

        {/* Master Profile Blueprint Card */}
        <Card className="border-border/50 bg-background/50 backdrop-blur-md shadow-xl shadow-muted/5 rounded-[2.5rem] overflow-hidden relative group">
          {/* Main Identity Header Area */}
          <div className="p-8 pb-6 flex flex-col items-center text-center border-b border-border/40 relative z-10">
            <Avatar className="h-24 w-24 ring-4 ring-primary/10 transition-all duration-500 group-hover:scale-105 group-hover:ring-primary/20 shadow-lg">
              <AvatarImage src={developer.image} alt={developer.name} />
              <AvatarFallback className="bg-primary/5 text-lg font-bold text-primary">
                AR
              </AvatarFallback>
            </Avatar>

            <div className="mt-5 space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[9px] font-bold uppercase tracking-wider">
                <Code2 className="h-3 w-3" /> Core Engineer
              </div>
              <h2 className="text-2xl font-bold font-serif tracking-tight">
                {developer.name}
              </h2>
              <p className="text-xs font-medium text-muted-foreground">
                {developer.role}
              </p>
            </div>
          </div>

          {/* Metadata Grid Parameters */}
          <CardContent className="p-8 space-y-5 relative z-10">
            {/* Communication Node */}
            <div className="flex items-center gap-4 group/item">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/80 border border-border/60 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                <Mail className="h-4 w-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  Transmission Endpoint
                </p>
                <p className="text-sm font-semibold text-foreground tracking-tight hover:text-primary transition-colors cursor-pointer truncate">
                  {developer.email}
                </p>
              </div>
            </div>

            {/* Location Node */}
            <div className="flex items-center gap-4 group/item">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/80 border border-border/60 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  Base Coordinates
                </p>
                <p className="text-sm font-medium text-foreground/90">
                  Chennai, Tamil Nadu, India
                </p>
              </div>
            </div>

            {/* Status Node */}
            <div className="flex items-center gap-4 group/item">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/80 border border-border/60 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                <Terminal className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  Environment Availability
                </p>
                <p className="text-sm font-medium text-foreground/90 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active for Core Infrastructure
                </p>
              </div>
            </div>
          </CardContent>

          {/* Decorative Subtle Corner Flourish */}
          <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-bl-full translate-x-16 -translate-y-16 transition-transform duration-700 group-hover:translate-x-6 group-hover:-translate-y-6" />
        </Card>
      </main>
    </div>
  );
}
