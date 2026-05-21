// components/skeletons/ActivityCardSkeleton.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ActivityCardSkeleton() {
  return (
    <Card className="rounded-3xl border border-stone-200 bg-white/80 backdrop-blur-sm p-1">
      <CardContent className="p-6">
        {/* Action Badge */}
        <div className="mb-4">
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        {/* Avatar + Info */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative shrink-0">
            <Skeleton className="h-16 w-16 rounded-full ring-4 ring-white" />
            {/* Status Indicator */}
            <Skeleton className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full ring-2 ring-white" />
          </div>

          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-5 w-28" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        </div>

        {/* View Details Link */}
        <div className="mb-5">
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Bottom: Moderator + Timestamp */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          {/* Moderator Info */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-8" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-5 w-5 rounded-full ring-2 ring-white" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3.5 w-3.5" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ActivityGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <ActivityCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
