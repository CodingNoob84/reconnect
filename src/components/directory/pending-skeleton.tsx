// components/skeletons/PendingRequestSkeleton.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PendingRequestCardSkeleton() {
  return (
    <div className="group rounded-2xl bg-white/80 backdrop-blur-sm border border-stone-200 p-6">
      {/* Top: Avatar + Info */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative">
          <Skeleton className="relative h-16 w-16 rounded-full ring-4 ring-white" />
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-5 w-28" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Time Ago */}
      <div className="flex items-center mb-5">
        <Skeleton className="h-4 w-16" />
      </div>

      {/* View Details Link */}
      <div className="mb-5">
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Bottom: Action Buttons */}
      <div className="flex gap-2.5 pt-4 border-t border-stone-100">
        <Skeleton className="flex-1 h-10 rounded-xl" />
        <Skeleton className="flex-1 h-10 rounded-xl" />
      </div>
    </div>
  );
}

export function PendingRequestsGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <Card className="rounded-3xl border-2 border-primary/10 bg-linear-to-br from-primary/5 to-transparent shadow-xl">
      <CardContent className="p-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-7 w-48" />
            </div>
            <Skeleton className="h-4 w-40 ml-9" />
          </div>
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: count }).map((_, index) => (
            <PendingRequestCardSkeleton key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
