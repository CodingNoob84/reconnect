import { Image as ImageIcon, Users } from "lucide-react";

export function MemoryLaneSkeleton() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="mb-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-stone-200 px-4 py-1 h-6 w-32 mx-auto" />
          <div className="h-16 bg-stone-200 rounded-lg w-3/4 mx-auto" />
          <div className="h-20 bg-stone-200 rounded-lg w-full mx-auto" />

          <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center">
            <div className="h-14 w-36 bg-stone-200 rounded-2xl" />
            <div className="h-14 w-36 bg-stone-200 rounded-2xl" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        {/* Sidebar Skeleton */}
        <aside className="hidden lg:block lg:col-span-2 sticky top-24 self-start">
          <nav className="flex flex-col gap-6 border-l-2 border-stone-100 pl-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-stone-200 rounded w-24" />
                <div className="space-y-2 pl-2">
                  {[1, 2].map((j) => (
                    <div key={j} className="space-y-1">
                      <div className="h-5 bg-stone-200 rounded w-32" />
                      <div className="h-3 bg-stone-200 rounded w-20" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content Skeleton */}
        <div className="lg:col-span-10 space-y-40 pb-32">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="grid grid-cols-1 xl:grid-cols-10 gap-12 items-start"
            >
              {/* Info Block Skeleton */}
              <div
                className={`xl:col-span-3 space-y-6 ${index % 2 !== 0 ? "xl:order-last" : ""}`}
              >
                <div className="space-y-3">
                  <div className="h-6 bg-stone-200 rounded-full w-24" />
                  <div className="h-8 bg-stone-200 rounded w-3/4" />
                  <div className="h-16 bg-stone-200 rounded w-full" />
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-stone-300" />
                    <div className="h-3 bg-stone-200 rounded w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-3 h-3 text-stone-300" />
                    <div className="h-3 bg-stone-200 rounded w-20" />
                  </div>
                </div>
              </div>

              {/* Gallery Skeleton */}
              <div className="xl:col-span-7">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((img) => (
                    <div
                      key={img}
                      className={`bg-stone-200 rounded-2xl overflow-hidden ${
                        img === 1 ? "row-span-2 min-h-100" : "aspect-4/3"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
