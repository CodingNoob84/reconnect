import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Users,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { memoryQueries } from "#/query/memory";
import { MemoryLaneHeader } from "#/components/memory/header";
import { MemoryLaneSkeleton } from "#/components/memory/memory-skeleton";

export const Route = createFileRoute("/_main/memorylane")({
  component: MemoryLanePage,
});

// Updated interfaces to match API exactly
interface MemoryImage {
  id: string;
  image_url: string;
  sort_order: number;
}

interface UploadedByProfile {
  id: string;
  name: string;
}

interface ApiMemory {
  id: string;
  title: string;
  description: string;
  memory_date: string;
  uploaded_at: string;
  uploaded_by_profile: UploadedByProfile | null;
  images: MemoryImage[];
}

// Lightbox image type
interface LightboxImage {
  id: string;
  url: string;
  title: string;
  sort_order: number;
}

function MemoryLanePage() {
  const page = 1;
  const limit = 5;
  const { data: memoriesData, isLoading } = useQuery(
    memoryQueries.memories({ page, limit }),
  );
  const memories = (memoriesData?.data as ApiMemory[]) || [];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeMemoryId, setActiveMemoryId] = useState<string | null>(null);
  const [currentViewAllMemory, setCurrentViewAllMemory] =
    useState<ApiMemory | null>(null);
  const collectionRefs = useRef<Record<string, HTMLElement>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Shuffle array function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get shuffled limited images (max 3-4) for display
  const getDisplayImages = (images: MemoryImage[]) => {
    const shuffled = shuffleArray(images);
    const maxImages = Math.min(images.length, 3);
    return shuffled.slice(0, maxImages);
  };

  // Convert API images to lightbox format
  const convertToLightboxImages = (
    images: MemoryImage[],
    title: string,
  ): LightboxImage[] => {
    return images.map((img) => ({
      id: img.id,
      url: img.image_url,
      title: title,
      sort_order: img.sort_order,
    }));
  };

  // Format date to show month and year
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleString("default", { month: "long" }),
      year: date.getFullYear().toString(),
    };
  };

  // Get random span for bento layout based on image index
  const getImageSpan = (index: number, totalImages: number) => {
    if (totalImages === 1) return "full";
    if (totalImages === 2) return index === 0 ? "large" : "single";
    if (index === 0) return "large";
    if (index === 1 && totalImages > 2) return "half";
    return "single";
  };

  const setCollectionRef = useCallback((el: HTMLElement | null, id: string) => {
    if (el) {
      collectionRefs.current[id] = el;
    }
  }, []);

  // Get images for current memory only (for lightbox)
  const getCurrentMemoryLightboxImages = useCallback((): LightboxImage[] => {
    if (!activeMemoryId) return [];
    const memory = memories.find((m: ApiMemory) => m.id === activeMemoryId);
    if (!memory) return [];
    return convertToLightboxImages(memory.images, memory.title);
  }, [activeMemoryId, memories]);

  const openLightbox = (memoryId: string, imageId: string) => {
    setActiveMemoryId(memoryId);
    setCurrentViewAllMemory(null);
    const memory = memories.find((m: ApiMemory) => m.id === memoryId);
    const index = memory?.images.findIndex((img) => img.id === imageId) || 0;
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const openViewAllLightbox = (memory: ApiMemory) => {
    setCurrentViewAllMemory(memory);
    setActiveMemoryId(memory.id);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentViewAllMemory(null);
  };

  const goToPrevious = () => {
    const images = currentViewAllMemory
      ? currentViewAllMemory.images
      : getCurrentMemoryLightboxImages();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    const images = currentViewAllMemory
      ? currentViewAllMemory.images
      : getCurrentMemoryLightboxImages();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, goToPrevious, goToNext]);

  // Intersection Observer for active sidebar highlighting
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | undefined;

        let bestRatio = 0;

        for (const entry of entries) {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;

            bestEntry = entry;
          }
        }

        if (bestEntry?.isIntersecting) {
          const id = bestEntry.target.getAttribute("data-memory-id");

          if (id && id !== activeMemoryId) {
            setActiveMemoryId(id);
          }
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-10% 0px -30% 0px",
      },
    );

    Object.values(collectionRefs.current).forEach((ref) => {
      if (ref) {
        observerRef.current?.observe(ref);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [memories, activeMemoryId]);

  const getImageSpanClass = (span: string) => {
    switch (span) {
      case "large":
        return "row-span-2 min-h-[300px] md:min-h-[400px]";
      case "full":
        return "md:col-span-2 aspect-[21/9]";
      case "half":
        return "aspect-video";
      default:
        return "aspect-[4/3]";
    }
  };

  const scrollToMemory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveMemoryId(id);
    }
  };

  // Group memories by month/year for sidebar
  const groupedMemories: Record<string, ApiMemory[]> = {};
  memories.forEach((memory: ApiMemory) => {
    const { month, year } = formatDate(memory.memory_date);
    const key = `${month} ${year}`;
    if (!groupedMemories[key]) groupedMemories[key] = [];
    groupedMemories[key].push(memory);
  });

  const currentLightboxImages = currentViewAllMemory
    ? convertToLightboxImages(
        currentViewAllMemory.images,
        currentViewAllMemory.title,
      )
    : getCurrentMemoryLightboxImages();
  const currentImage =
    lightboxOpen && currentLightboxImages.length > 0
      ? currentLightboxImages[currentImageIndex]
      : null;
  const activeMemory = memories.find((m: ApiMemory) => m.id === activeMemoryId);

  if (isLoading) {
    return <MemoryLaneSkeleton />;
  }

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      {/* Hero Section */}
      <MemoryLaneHeader memoryLength={memories.length} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        {/* Navigation Sidebar with Memory Titles */}
        <aside className="hidden lg:block lg:col-span-2 sticky top-24 self-start">
          <nav className="flex flex-col gap-6 border-l-2 border-stone-100 pl-6">
            {Object.entries(groupedMemories).map(([monthYear, mems]) => (
              <div key={monthYear} className="space-y-3">
                <span className="block text-xs font-bold text-stone-400 uppercase tracking-widest">
                  {monthYear}
                </span>
                <div className="space-y-2 pl-2">
                  {mems.map((memory: ApiMemory) => (
                    <button
                      key={memory.id}
                      onClick={() => scrollToMemory(memory.id)}
                      className={`text-left group block w-full transition-all duration-200 ${
                        activeMemoryId === memory.id
                          ? "border-l-2 border-primary pl-3 -ml-0.5"
                          : "pl-3"
                      }`}
                    >
                      <span
                        className={`text-sm font-medium transition-colors line-clamp-1 ${
                          activeMemoryId === memory.id
                            ? "text-primary"
                            : "text-stone-500 group-hover:text-primary"
                        }`}
                      >
                        {memory.title}
                      </span>
                      <span className="block text-[10px] text-stone-400 mt-0.5">
                        {memory.images.length} photos
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Vertical Stream */}
        <div className="lg:col-span-10 space-y-40 pb-32">
          {memories.map((memory: ApiMemory, index: number) => {
            const { month, year } = formatDate(memory.memory_date);
            const displayImages = getDisplayImages(memory.images);
            const hasMoreImages = memory.images.length > displayImages.length;

            return (
              <section
                key={memory.id}
                id={memory.id}
                ref={(el) => setCollectionRef(el, memory.id)}
                data-memory-id={memory.id}
                className="grid grid-cols-1 xl:grid-cols-10 gap-12 items-start scroll-mt-24"
              >
                {/* Info Block */}
                <div
                  className={`xl:col-span-3 space-y-6 ${index % 2 !== 0 ? "xl:order-last" : ""}`}
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      <Calendar className="h-3 w-3" />
                      {month} {year}
                    </div>
                    <h2 className="font-serif text-3xl font-bold text-stone-900 leading-tight">
                      {memory.title}
                    </h2>
                    {memory.description && (
                      <p className="text-stone-500 leading-relaxed italic border-l-2 border-stone-200 pl-4">
                        {memory.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 pt-4">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase text-stone-400 tracking-tighter">
                      <Users className="w-3 h-3" />
                      <span>
                        {memory.uploaded_by_profile?.name || "Unknown"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase text-stone-400 tracking-tighter">
                      <ImageIcon className="w-3 h-3" />
                      <span>{memory.images.length} Photos</span>
                    </div>
                    {hasMoreImages && (
                      <Button onClick={() => openViewAllLightbox(memory)}>
                        {" "}
                        View All {memory.images.length} Photos
                      </Button>
                    )}
                  </div>
                </div>

                {/* Bento Mosaic Gallery */}
                <div className="xl:col-span-7">
                  <div className="grid grid-cols-2 gap-4 auto-rows-min">
                    {displayImages
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((image, imgIndex) => {
                        const span = getImageSpan(
                          imgIndex,
                          displayImages.length,
                        );
                        return (
                          <div
                            key={image.id}
                            className={`group relative bg-stone-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl cursor-pointer ${getImageSpanClass(span)}`}
                            onClick={() => openLightbox(memory.id, image.id)}
                          >
                            <img
                              src={image.image_url}
                              alt={memory.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-6">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="rounded-full text-xs h-8 px-4"
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox - Shows All Images of the Memory */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 text-white/80 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>

          <div className="absolute top-6 left-6 z-10 text-white/60 text-sm font-mono bg-black/30 px-3 py-1 rounded-full">
            {currentImageIndex + 1} / {currentLightboxImages.length}
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10 text-white/60 text-xs font-mono bg-black/30 px-3 py-1 rounded-full w-fit">
            {activeMemory?.title || currentViewAllMemory?.title || "Memory"}
          </div>

          {currentLightboxImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 md:left-8 z-10 text-white/70 hover:text-white transition-colors p-2 rounded-full bg-black/20 hover:bg-black/40"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 md:right-8 z-10 text-white/70 hover:text-white transition-colors p-2 rounded-full bg-black/20 hover:bg-black/40"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
              </button>
            </>
          )}

          <div className="w-full h-full flex items-center justify-center p-12 md:p-20">
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </main>
  );
}
