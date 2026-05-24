import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  FileText,
  Lock,
  Eye,
  Scale,
  Globe,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_main/privacy-and-terms")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");

  const metadata = {
    lastUpdated: "May 2026",
    version: "v2.4.0",
    jurisdiction: "Global Core Stack",
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10 relative overflow-hidden">
      {/* Background Ambience Layers */}
      <div className="absolute top-12 left-1/4 -z-10 h-96 w-96 bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-12 right-1/4 -z-10 h-96 w-96 bg-primary/5 blur-[120px] rounded-full" />

      <main className="mx-auto max-w-5xl px-6 pt-16 pb-24 lg:px-8">
        {/* Header Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Legal Framework
            </div>
            <h1 className="mt-4 font-serif text-4xl font-black leading-[1.15] tracking-tight text-foreground md:text-5xl">
              Compliance Center <br />
              <span className="italic text-primary/80">& Governance.</span>
            </h1>
          </div>

          {/* Tab Selection Interface Controls */}
          <div className="flex p-1.5 rounded-xl bg-secondary border border-border/40 shrink-0 self-start md:self-auto shadow-xs">
            <Button
              variant={activeTab === "privacy" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("privacy")}
              className="rounded-lg text-xs font-bold uppercase tracking-wider h-9 px-4 transition-all duration-200"
            >
              <Eye className="h-3.5 w-3.5 mr-2" /> Privacy Policy
            </Button>
            <Button
              variant={activeTab === "terms" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("terms")}
              className="rounded-lg text-xs font-bold uppercase tracking-wider h-9 px-4 transition-all duration-200"
            >
              <Scale className="h-3.5 w-3.5 mr-2" /> Terms of Service
            </Button>
          </div>
        </div>

        {/* Legal Grid Content Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Metadata Details Widget */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="border-border/50 bg-background/50 backdrop-blur-sm rounded-2xl overflow-hidden relative group">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-primary/80 flex items-center gap-2">
                  <RefreshCw className="h-3 w-3 animate-pulse" /> Document
                  Metadata
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2 space-y-4 text-xs font-medium">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-muted-foreground">Revision Cycle</span>
                  <span className="text-foreground font-semibold">
                    {metadata.lastUpdated}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-muted-foreground">System Version</span>
                  <span className=" font-mono font-bold text-primary">
                    {metadata.version}
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-muted-foreground">Scope Linkage</span>
                  <span className="text-foreground flex items-center gap-1">
                    <Globe className="h-3 w-3 text-muted-foreground/80" />{" "}
                    Global Public Network
                  </span>
                </div>
              </CardContent>
            </Card>

            <blockquote className="border-l-2 border-primary/40 pl-4 py-1 text-xs italic text-muted-foreground/90 leading-relaxed">
              "We architecturalize platforms with privacy engineered into the
              baseline layer, avoiding bloated tracking tracking mechanics
              entirely."
            </blockquote>
          </div>

          {/* Right Column: Active Legal Document Render Area */}
          <div className="lg:col-span-8">
            <Card className="border-border/50 bg-background/50 backdrop-blur-md shadow-xl shadow-muted/5 rounded-4xl p-8 md:p-10">
              {activeTab === "privacy" ? (
                /* PRIVACY BODY CONTAINER */
                <article className="space-y-8 prose prose-sm max-w-none">
                  <div>
                    <h2 className="text-2xl font-serif font-bold tracking-tight text-foreground flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary/80" /> Privacy &
                      Data Protocol
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Understanding how your identity elements are preserved
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                      1. Information Encryption Matrices
                    </h3>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed">
                      We strictly process essential data points required to
                      maintain user sessions, directory validation layouts, and
                      localized client-side configurations. All credentials
                      undergo structural encryption hashing before database
                      commit cycles.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                      2. Non-Disclosure & Zero-Tracing
                    </h3>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed">
                      Your identity logs are never monetized, traded, or shared
                      with third-party verification brokers. We employ clean
                      session handlers instead of aggressive, behavioral
                      advertising cookies.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                      3. User Sovereignty & Right of Deletion
                    </h3>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed">
                      You retain structural authority over your metadata
                      payload. At any moment, users can initialize full identity
                      purges via their account profile configurations, removing
                      all associated entries from active servers.
                    </p>
                  </div>
                </article>
              ) : (
                /* TERMS BODY CONTAINER */
                <article className="space-y-8 prose prose-sm max-w-none">
                  <div>
                    <h2 className="text-2xl font-serif font-bold tracking-tight text-foreground flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary/80" /> Terms of
                      Architecture Use
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Operational guidelines for ecosystem access
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                      1. Acceptable Interface Usage
                    </h3>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed">
                      Users agree not to target application APIs via automated
                      headless scrapers, flood networks with simulated requests,
                      or reverse-engineer core bundle logic compiled within web
                      structures.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                      2. Account Authenticity Integrity
                    </h3>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed">
                      When configuring profiles within verification nodes, you
                      confirm that details represent accurate, verified
                      identities. Impersonating entities or generating fake
                      credentials flags structural system blocks.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                      3. Limitations of Liability Parameters
                    </h3>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed">
                      The core codebase and interface assets are served on an
                      "As-Is" framework without explicit uptime guarantees. We
                      are not liable for transient localized sync drops or
                      layout performance variances across older desktop
                      environments.
                    </p>
                  </div>
                </article>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
