import { createFileRoute } from "@tanstack/react-router";

import { HeroSection } from "#/components/home/hero-section";
import { HighlightsSection } from "#/components/home/highlights-section";
import { DepartmentsSection } from "#/components/home/department-section";

import { ReflectionSection } from "#/components/home/reflections-section";
import { GallerySection } from "#/components/home/gallery-section";
import { EventsSection } from "#/components/home/events-section";
import { NotFoundComponent } from "#/components/layout/not-found";
import { ErrorComponent } from "#/components/layout/error-component";

export const Route = createFileRoute("/_main/")({
  component: Home,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function Home() {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <DepartmentsSection />
      <ReflectionSection />
      <GallerySection />
      <EventsSection />
    </>
  );
}
