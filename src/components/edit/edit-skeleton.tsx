import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function EditProfileSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:px-12">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-border/60">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-3 w-80" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-20 rounded-xl" />
          <Skeleton className="h-9 w-36 rounded-xl" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Photo + Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Profile Photo */}
          <Card className="md:col-span-4 border-border/60 shadow-xs">
            <CardHeader>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-48 mt-1" />
            </CardHeader>
            <CardContent className="space-y-6 flex flex-col items-center text-center pt-2">
              <Skeleton className="w-36 h-36 rounded-2xl" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-16 mx-auto" />
                <Skeleton className="h-3 w-40 mx-auto" />
              </div>
            </CardContent>
          </Card>

          {/* Personal Details */}
          <Card className="md:col-span-8 border-border/60 shadow-xs">
            <CardHeader>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3 w-64 mt-1" />
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-9 w-full rounded-xl" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Communication Nodes */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader>
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-3 w-72 mt-1" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-9 w-full rounded-xl" />
                    <div className="flex items-center gap-2 pt-1">
                      <Skeleton className="h-4 w-4 rounded-sm" />
                      <Skeleton className="h-3 w-40" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-36" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-1.5">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-9 w-full rounded-xl" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader>
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-3 w-64 mt-1" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3.5 w-3.5 rounded-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-9 w-full rounded-xl" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Professional Overview */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader>
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-3 w-72 mt-1" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-9 w-full rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-9 w-full rounded-xl" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-36" />
              <Skeleton className="h-28 w-full rounded-xl" />
            </div>
          </CardContent>
        </Card>

        {/* Career History */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4 mb-4">
            <div>
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-3 w-64 mt-1" />
            </div>
            <Skeleton className="h-8 w-28 rounded-xl" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="p-5 border border-border/60 rounded-xl space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="space-y-1.5">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-9 w-full rounded-xl" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-9 w-full rounded-xl" />
                  </div>
                  <div className="flex items-center gap-2 pt-7">
                    <Skeleton className="h-4 w-4 rounded-sm" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-18 w-full rounded-xl" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader>
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3 w-56 mt-1" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-7 w-24 rounded-full" />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-48 rounded-xl" />
              <Skeleton className="h-9 w-16 rounded-xl" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 mt-12 pt-6 border-t border-border/60">
        <Skeleton className="h-9 w-20 rounded-xl" />
        <Skeleton className="h-9 w-40 rounded-xl" />
      </div>
    </main>
  );
}
