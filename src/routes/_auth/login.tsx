import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  History,
  Key,
  Users,
  Sparkles,
  HelpCircle,
  Languages,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { loginWithGoogle } from "#/services/auth.api";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const res = await loginWithGoogle();

      if (res.url) {
        window.location.href = res.url;
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* 1. Background Layer: Ghibli-inspired with Brand Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover opacity-50 transition-opacity duration-1000"
          alt="Historic college campus at sunrise"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuApPbtJRlcHeq7XE_HaYr5m7EhWRTfCa561Dwec4nzV4Ux6XumwcR--tMrCTXQsn0pbKr4ClIY3HXTdfC0GE4833LzmpzxGUsc1Loclcrmv5q2nmwbNzjhVsp9Sw4LljiIy1p73yDQR3mrE_hnnrAO0pKR6QDtYZccCnVw5oyCTcxUoaHA8uiKdTRc19NyzdfnJCZXLFzA4VA5EJ9cV8izAK_c3ch7tHj38lDmaGuMKq9eUnkAMoadkolnwGv9xB7BZivNbSh8HziZb"
        />
        {/* Gradient mask to ensure text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background" />

        {/* Decorative blur bloom */}
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-360 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-16">
        {/* 2. Left side: Brand Story */}
        <div className="flex-1 text-center md:text-left max-w-xl space-y-8">
          <div className="inline-flex items-center gap-3 py-2 px-4 rounded-full bg-primary/10 border border-primary/20">
            <History className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Preserving Legacies
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Welcome back to <br />
              <span className="italic text-primary/80 text-4xl md:text-6xl">
                ReConnect.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md font-medium">
              Step back into the halls of your alma mater and rediscover the
              connections that define you.
            </p>
          </div>

          {/* Compact Stats */}
          <div className="hidden md:flex items-center gap-8 pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-serif font-bold text-foreground">
                10k+
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 flex items-center gap-2">
                <Users className="h-3 w-3" /> Alumni Joined
              </span>
            </div>
            <Separator orientation="vertical" className="h-10 bg-border/50" />
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-serif font-bold text-foreground">
                Daily
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 flex items-center gap-2">
                <Sparkles className="h-3 w-3" /> Memories Shared
              </span>
            </div>
          </div>
        </div>

        {/* 3. Right side: Login Card (Modern Heritage Style) */}
        <div className="flex-1 w-full max-w-md">
          <Card className="relative overflow-hidden rounded-[3rem] border-border/40 bg-background/60 p-2 backdrop-blur-2xl shadow-2xl">
            <CardHeader className="text-center space-y-4 pt-10 pb-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary shadow-lg shadow-primary/20">
                <Key className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <CardTitle className="font-serif text-3xl font-bold">
                  Secure Sign In
                </CardTitle>
                <CardDescription className="text-sm font-medium tracking-tight">
                  Access your legacy and classmates
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-8 px-8 pb-12">
              <Button
                variant="outline"
                className="group w-full h-14 rounded-2xl border-border/60 bg-background/50 text-base font-bold transition-all hover:border-primary/30 hover:bg-primary/5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-background/50 disabled:hover:border-border/60 disabled:active:scale-100"
                onClick={handleSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.67l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 px-6 leading-relaxed">
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <Separator className="bg-border/40" />

              <div className="flex justify-center gap-8">
                <a
                  href="#"
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors"
                >
                  <HelpCircle className="h-3.5 w-3.5" /> Support
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors"
                >
                  <Languages className="h-3.5 w-3.5" /> Language
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Loading overlay when redirecting */}
          {isLoading && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-3 py-3 px-6 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/40 shadow-lg">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Redirecting to Google...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Footer: Bottom Signature */}
      <footer className="absolute bottom-0 w-full z-10 py-8 border-t border-border/20 bg-background/40 backdrop-blur-sm">
        <div className="max-w-360 mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
            © 2026 ReConnect.
          </span>
        </div>
      </footer>
    </main>
  );
}
