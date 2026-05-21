// components/skeleton/profile-details-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:px-12">
        {/* Navigation Action Skeleton */}
        <div className="mb-8 flex justify-end">
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>

        {/* 1. Header Hero Card Skeleton */}
        <section className="relative overflow-hidden bg-card p-8 md:p-10 rounded-3xl border border-border shadow-xs mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar Skeleton */}
            <div className="relative shrink-0">
              <Skeleton className="w-36 h-36 md:w-44 md:h-44 rounded-2xl" />
              <div className="absolute -bottom-2 -right-2">
                <Skeleton className="w-8 h-8 rounded-xl" />
              </div>
            </div>

            {/* Info Skeleton */}
            <div className="grow text-center md:text-left space-y-6 pt-2">
              <div>
                <Skeleton className="h-10 w-64 mx-auto md:mx-0" />
                <Skeleton className="h-4 w-32 mt-2 mx-auto md:mx-0" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 pt-4 border-t border-border">
                <div>
                  <Skeleton className="h-3 w-16 mb-2" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div>
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Skeleton className="h-3 w-12 mb-2" />
                  <Skeleton className="h-5 w-28" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Layout Grid Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Side Skeleton */}
          <div className="lg:col-span-4 space-y-6">
            {/* Contact Card Skeleton */}
            <section className="bg-card p-6 rounded-2xl border border-border shadow-xs">
              <Skeleton className="h-7 w-40 mb-5" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 items-start p-2">
                    <Skeleton className="w-4 h-4 mt-0.5 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-3 w-24 mb-1" />
                      <Skeleton className="h-4 w-full max-w-50" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Network Connectivity Skeleton */}
            <section className="bg-primary p-6 rounded-2xl">
              <Skeleton className="h-6 w-40 mb-4 bg-primary-foreground/20" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton
                    key={i}
                    className="w-10 h-10 rounded-xl bg-primary-foreground/10"
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Side Skeleton */}
          <div className="lg:col-span-8 space-y-6">
            {/* Professional Card Skeleton */}
            <section className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-5 w-24 rounded-md" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-secondary/50">
                <div>
                  <Skeleton className="h-3 w-32 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div>
                  <Skeleton className="h-3 w-28 mb-1" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </section>

            {/* Interests Tags Skeleton */}
            <section className="bg-card p-6 rounded-2xl border border-border shadow-xs">
              <Skeleton className="h-7 w-56 mb-4" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-xl" />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
