import { Card } from "../ui/card";
import { Camera, ArrowRight, History } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

const gallery = [
  {
    title: "Collage Campus",
    image:
      "https://ocfzlznrpfnohohiimpf.supabase.co/storage/v1/object/public/memory_images/tjs-engineering-college-gummidipundi-chennai-engineering-colleges-1npax95.jpg",
    className: "md:col-span-2 md:row-span-2", // Large featured image
  },
  {
    title: "Culturals",
    image:
      "https://ocfzlznrpfnohohiimpf.supabase.co/storage/v1/object/public/memory_images/IMG-20260417-WA0026.jpg",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Lecture Halls",
    image:
      "https://ocfzlznrpfnohohiimpf.supabase.co/storage/v1/object/public/memory_images/IMG-20260417-WA0028.jpg",
    className: "md:col-span-1 md:row-span-1",
  },
];

export const GallerySection = () => {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="mx-auto max-w-360 px-6 lg:px-12">
        {/* Compact Heading Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            <Camera className="h-3 w-3" />
            Visual Archives
          </div>
          <h2 className="mt-6 font-serif text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Captured <span className="italic text-primary/80">Moments.</span>
          </h2>
        </div>

        {/* Tight, Compact Grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2 lg:gap-4">
          {gallery.map((item, i) => (
            <Card
              key={i}
              className={`group relative overflow-hidden rounded-2xl border-none shadow-none ${item.className}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle hover overlay for the title only */}
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
                <p className="font-serif text-xl font-bold text-white translate-y-2 transition-transform group-hover:translate-y-0">
                  {item.title}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Post-Grid Description & Links */}
        <div className="mt-12 flex flex-col items-center border-t border-border/50 pt-10 text-center">
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A curated collection of snapshots from campus life, classrooms, and
            the unforgettable milestones that defined our shared journey.
            Revisit the places where it all began.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/memorylane">
              <Button className="group h-12 rounded-full px-8 font-bold ">
                <History className="mr-2 h-4 w-4" />
                Go to Memory Lane
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
