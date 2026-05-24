import { Search, ArrowUpRight, Phone, Calendar } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const highlights = [
  {
    icon: Phone,
    title: "Digital Telephone Directory",
    description:
      "Access a comprehensive, always-updated directory of your 2010-2014 batchmates. Find contact info, current locations, and stay connected like never before.",
  },
  {
    icon: Search,
    title: "Professional Support Network",
    description:
      "Connect with batchmates for career guidance, business advice, referrals, mentorship, and professional support. Help others and get help from people who know your journey.",
  },
  {
    icon: Calendar,
    title: "Memory Lane",
    description:
      "Relive shared moments from 2010-2014 - canteen hangouts, festival nights, and exam preps. Keep the bond alive with those who walked the journey with you.",
  },
];

export const HighlightsSection = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Container */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
            Why ReConnect
          </h2>

          <p className="mt-4 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.15] md:leading-[1.1]">
            The Telephone Directory <br className="hidden md:block" />
            <span className="italic text-primary/80 inline-block py-1">
              your batchmates miss you.
            </span>
          </p>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            Remember scribbling numbers in worn-out diaries? We've modernized
            that. Now reconnect with every single friend from the{" "}
            <strong className="text-primary">2010-2014 batch</strong> —
            Classmates, hostel roommates, canteen buddies, and all the faces
            that made your campus life unforgettable.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="group relative overflow-hidden rounded-[2.5rem] border-none bg-background/50 p-2 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 ring-1 ring-border/50"
              >
                <CardContent className="relative z-10 p-8 md:p-10">
                  {/* Decorative Gradient Glow on Hover */}
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />

                  {/* Icon Container */}
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-primary/30">
                    <Icon className="h-8 w-8" />
                  </div>

                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </div>

                  <p className="mt-4 text-base leading-7 text-muted-foreground/90">
                    {item.description}
                  </p>

                  {/* Bottom Decorative Line */}
                  <div className="mt-8 h-1 w-12 rounded-full bg-primary/20 transition-all duration-500 group-hover:w-full group-hover:bg-primary/40" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
