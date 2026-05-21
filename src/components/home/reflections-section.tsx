import { ArrowRight, Quote, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

export const ReflectionSection = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-24 bg-background">
      {/* Background Accent */}
      <div className="absolute -left-20 top-1/2 -z-10 h-150 w-150 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-360 px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Image Side (Occupies 5 columns) */}
          <div className="relative lg:col-span-5">
            <div className="group relative aspect-4/5 overflow-hidden rounded-[3rem] ring-1 ring-border/50 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop"
                alt="Alumni Memories"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent" />
            </div>

            {/* Floating Glass Card */}
            <div className="absolute -bottom-6 -right-4 max-w-70 rounded-4xl border border-white/20 bg-background/80 p-6 shadow-2xl backdrop-blur-xl md:-right-10 md:max-w-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Quote className="h-5 w-5" />
              </div>

              <p className="font-serif text-lg italic leading-relaxed text-foreground">
                “Years may pass, but the friendships and laughter from campus
                stay with us forever.”
              </p>

              <div className="mt-4 flex items-center gap-2">
                <div className="h-px w-8 bg-primary/30" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Alumni Association
                </p>
              </div>
            </div>
          </div>

          {/* Content Side (Occupies 7 columns) */}
          <div className="flex flex-col lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-primary">
              <Sparkles className="h-4 w-4" />
              Alumni Reflections
            </div>

            <h2 className="mt-6 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Stories, friendships, and <br className="hidden md:block" />
              <span className="italic text-primary/80">
                moments that shape lives.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Every classroom carried a dream, every corridor held laughter.
              Explore heartfelt reflections shared by alumni across generations.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-1">
              {[
                {
                  text: "The campus gave us more than education — it gave us friendships that feel like family.",
                  author: "Mechanical Engineering, '14",
                },
                {
                  text: "From late-night study sessions to farewell day tears, every memory still feels alive.",
                  author: "Computer Science, '14",
                },
              ].map((quote, i) => (
                <div
                  key={i}
                  className="group relative rounded-3xl border border-border/50 bg-background/50 p-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-primary/5"
                >
                  <p className="font-serif text-lg italic text-foreground/90">
                    “{quote.text}”
                  </p>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-primary/60">
                    — {quote.author}
                  </p>
                </div>
              ))}
            </div>
            <Link to="/blackboard">
              <Button
                variant="ghost"
                className="group mt-10 w-fit rounded-full px-0 text-lg font-bold text-primary hover:bg-transparent hover:text-primary/80"
              >
                Read More Alumni Stories
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
