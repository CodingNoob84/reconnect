// components/skeletons/AlumniCardSkeleton.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AlumniCardSkeleton() {
  return (
    <Card className="rounded-3xl border border-stone-200 bg-white/80 backdrop-blur-sm p-1">
      <CardContent className="p-6">
        <div className="flex items-center gap-5">
          {/* Avatar Skeleton */}
          <div className="relative shrink-0">
            <Skeleton className="h-20 w-20 rounded-full ring-4 ring-white" />
          </div>

          {/* Info Skeleton */}
          <div className="flex-1 min-w-0 space-y-3">
            <Skeleton className="h-5 w-32" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AllProfilesSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <AlumniCardSkeleton key={index} />
      ))}
    </div>
  );
}
