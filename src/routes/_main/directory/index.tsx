import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { Search, Users, Clock } from "lucide-react";
import { DEPARTMENT_OPTIONS } from "#/lib/data";
import { AllProfiles } from "#/components/directory/all-profiles";
import { PendingProfiles } from "#/components/directory/pending-profiles";
import { RecentActivity } from "#/components/directory/recent-activity";
import { useQuery } from "@tanstack/react-query";
import { profileQueries } from "#/query/profile";
import { authQueries } from "#/query/auth";

export const Route = createFileRoute("/_main/directory/")({
  component: AlumniDirectoryPage,
});

function AlumniDirectoryPage() {
  const { data } = useQuery(authQueries.user());
  const isAlumni = data?.isAlumni;
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPending, setShowPending] = useState(false);
  const { data: pendingData } = useQuery(
    profileQueries.pendingprofiles({
      page: 1,
      limit: 12,
      department: "all",
    }),
  );
  const pendingCount = pendingData?.pagination.total ?? 0;

  useEffect(() => {
    if (pendingCount === 0) {
      setShowPending(false);
    }
  }, [pendingCount]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      {/* Hero & Search Section */}
      <section className="mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20">
            <Users className="h-3.5 w-3.5" /> Alumni Network
          </div>
          <h2 className="font-serif text-5xl font-bold text-stone-800 tracking-tight sm:text-6xl lg:text-7xl">
            The Alumni <span className="italic text-primary">Directory</span>
          </h2>
          <p className="text-lg text-stone-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Find classmates, colleagues, and friends from the years that shaped
            us.
          </p>

          {/* Controls Row */}
          <div className="flex flex-col items-center gap-4 pt-6 sm:flex-row sm:justify-center">
            {isAlumni && pendingCount > 0 && (
              <Button
                onClick={() => {
                  setShowPending(!showPending);
                }}
                variant={showPending ? "default" : "outline"}
                className="relative h-14 rounded-2xl gap-2 px-6 font-semibold transition-all duration-300 hover:scale-105"
              >
                <Clock className="h-4 w-4" />
                Pending Requests
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 p-0 flex items-center justify-center text-[10px] font-bold animate-pulse">
                  {pendingCount}
                </Badge>
              </Button>
            )}

            <div className="relative w-full sm:w-96 group">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60 group-focus-within:text-primary transition-colors" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="h-14 rounded-2xl border-stone-200 bg-stone-50 pl-12 pr-4 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary/40 transition-all"
              />
            </div>
          </div>
        </div>
        {/* Toolbar: Filters & Total Count */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-b border-stone-200 pb-6 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <button
              onClick={() => {
                setActiveFilter("all");
              }}
              className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === "all"
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                  : "bg-stone-100 text-stone-500 hover:bg-stone-200 hover:scale-105"
              }`}
            >
              All
            </button>
            {DEPARTMENT_OPTIONS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => {
                  setActiveFilter(dept.value);
                }}
                className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === dept.value
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200 hover:scale-105"
                }`}
              >
                {dept.short}
              </button>
            ))}
          </div>
        </div>
      </section>
      {showPending ? (
        <PendingProfiles department={activeFilter} searchQuery={searchQuery} />
      ) : (
        <AllProfiles department={activeFilter} searchQuery={searchQuery} />
      )}

      <RecentActivity />
    </main>
  );
}
