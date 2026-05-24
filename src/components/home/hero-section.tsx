import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Users, ArrowRight, GraduationCap } from "lucide-react";
import { authQueries } from "#/query/auth";
import { useQuery } from "@tanstack/react-query";

export const HeroSection = () => {
  const { data } = useQuery(authQueries.user());
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-end md:items-center py-12 md:py-24">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/collage.png"
          alt="Campus Heritage"
          className="h-full w-full object-cover
    object-[65%_center] md:object-center
    scale-105 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 xl:px-40 pb-8 md:pb-0">
        <div className="max-w-4xl space-y-6 md:space-y-8">
          {/* Animated Badge */}
          <div className="animate-fade-in-down inline-flex items-center gap-2 md:gap-3 rounded-full border border-primary/10 bg-background/30 px-4 py-1.5 text-xs md:text-sm font-medium text-foreground backdrop-blur-sm ring-1 ring-white/10">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-5 w-5 rounded-full border border-background bg-secondary flex items-center justify-center"
                >
                  <Users className="h-2.5 w-2.5 text-primary" />
                </div>
              ))}
            </div>
            <span className="pl-2 border-l border-foreground/10">
              10,000+ connections
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4 md:space-y-5">
            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              Reconnect with <br className="hidden sm:block" />
              <span className="text-primary italic font-serif relative inline-block">
                old friends
                <svg
                  className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 text-primary/30"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 25 0 50 5 T 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </span>
              , relive memories.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg md:text-xl font-medium">
              Rediscover the faces that shared your journey. Our alumni network
              bridges the gap between then and now.
            </p>
          </div>

          {/* Action Buttons: Fixed X-padding and alignment */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {!data?.isAuthenticated && (
              <Link to="/login">
                <Button className="group h-12 rounded-xl bg-primary px-6 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 sm:px-10 cursor-pointer">
                  Join Community
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}

            {data?.isAuthenticated && !data?.isProfileUpdated && (
              <Link to="/myprofile/edit">
                <Button className="group h-12 rounded-xl bg-primary px-6 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 sm:px-10 cursor-pointer">
                  Update Profile
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}

            <Link to="/directory">
              <Button className="group h-12 rounded-xl bg-primary px-6 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 sm:px-10 cursor-pointer">
                <GraduationCap className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                Explore Alumni
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
