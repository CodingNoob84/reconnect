import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Cake, CalendarDays, Sparkles, Clock } from "lucide-react";

import { blackboardQueries } from "#/query/blackboard";
import { useQuery } from "@tanstack/react-query";
import { WhatsAppWishButton } from "./whatsapp-wish-btn";

interface Birthday {
  id: string; // UUID string
  name: string;
  department: string;
  avatar: string;
  dob: string;
  phoneno: string;
  nextBirthday: Date;
  daysUntil: number;
}

// ------------------------------------------------------------
// 1. Inline style block with corrected & advanced animations
// ------------------------------------------------------------
const ChalkAnimations = () => (
  <style>{`
    @keyframes chalkFloat {
      0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
      50% { transform: translateY(-15px) scale(1.3); opacity: 0.5; }
    }
    @keyframes sketchReveal {
      0% { clip-path: inset(0 100% 0 0); }
      100% { clip-path: inset(0 0 0 0); }
    }
    @keyframes chalkWrite {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    @keyframes slide {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    @keyframes borderDraw {
      0% { clip-path: polygon(0 0, 0 0, 0 0, 0 0); }
      25% { clip-path: polygon(0 0, 100% 0, 100% 0, 100% 0); }
      50% { clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%); }
      75% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
      100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes bounce-gentle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    @keyframes pulse-strong {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(244,63,94,0.2)); }
      50% { transform: scale(1.06); filter: drop-shadow(0 0 8px rgba(244,63,94,0.6)); }
    }
    .animate-chalk-write {
      animation: chalkWrite 1.5s ease-in-out infinite;
    }
    .animate-slide {
      animation: slide 2s ease-in-out infinite;
    }
    .animate-spin-slow {
      animation: spin-slow 6s linear infinite;
    }
    .animate-bounce-gentle {
      animation: bounce-gentle 2s ease-in-out infinite;
    }
    .animate-sketch {
      animation: sketchReveal 2s ease-in-out infinite;
    }
    .animate-draw {
      animation: sketchReveal 1.5s ease-in-out infinite alternate;
    }
    .animate-pulse-strong {
      animation: pulse-strong 2.5s ease-in-out infinite;
    }
    .chalk-grain {
      position: absolute;
      inset: 0;
      opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
  `}</style>
);

// ------------------------------------------------------------
// 2. Creative Loading State
// ------------------------------------------------------------
const BirthdayLoadingState = () => {
  const loadingCards = Array.from({ length: 4 }, (_, i) => i);

  return (
    <>
      <ChalkAnimations />
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-stone-800 border border-stone-700 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-stone-300">
          <Cake className="h-3.5 w-3.5 text-rose-400 animate-pulse" /> Loading
          Board...
        </div>
      </div>

      <div
        className="relative rounded-[2.5rem] p-8 md:p-12 border-14 border-stone-900 bg-[#1e352f]"
        style={{
          boxShadow:
            "inset 0 0 80px rgba(0,0,0,0.6), 0 20px 40px -15px rgba(0,0,0,0.7)",
        }}
      >
        <div className="chalk-grain" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
          {loadingCards.map((index) => (
            <div
              key={index}
              className="relative"
              style={{ transform: `rotate(${(index - 1.5) * 2}deg)` }}
            >
              <Card className="bg-white/5 border-2 border-dashed border-white/20 rounded-md p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-white/10 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-white/15 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
                <div className="h-16 bg-white/5 border border-dashed border-white/10 rounded-lg animate-pulse" />
                <div className="h-10 bg-white/10 rounded-lg animate-pulse" />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// ------------------------------------------------------------
// 3. Main Birthdays Section
// ------------------------------------------------------------
export const BirthdaysSection = () => {
  const { data: upcomingBirthdays, isLoading } = useQuery({
    queryKey: blackboardQueries.getupcomingbirthdays().queryKey,
    queryFn: blackboardQueries.getupcomingbirthdays().queryFn,
  });

  if (isLoading) {
    return <BirthdayLoadingState />;
  }

  return (
    <>
      <ChalkAnimations />

      {/* Visual Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/40 border border-rose-800 text-rose-400 px-5 py-1.5 text-xs font-bold uppercase tracking-widest shadow-sm backdrop-blur-xs">
          <Cake className="h-4 w-4 animate-bounce-gentle text-rose-400" />{" "}
          Celebrate Together
        </div>
      </div>

      {/* Classroom Green Chalkboard */}
      <div
        className="relative rounded-[2.5rem] p-8 md:p-12 border-16 border-stone-900 bg-[#1e352f]"
        style={{
          boxShadow:
            "inset 0 0 100px rgba(0,0,0,0.7), 0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
      >
        {/* Grain overlay for chalkboard feel */}
        <div className="chalk-grain" />

        {/* Chalk dust particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/15"
              style={{
                width: `${Math.random() * 3 + 1.5}px`,
                height: `${Math.random() * 3 + 1.5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `chalkFloat ${Math.random() * 4 + 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Birthdays Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start relative z-10">
          {upcomingBirthdays?.map((person) => (
            <BirthdayCard key={person.id} person={person} />
          ))}
        </div>

        {/* Empty state */}
        {(!upcomingBirthdays || upcomingBirthdays.length === 0) && (
          <div className="text-center py-28 relative z-10">
            <p className="text-white/40 font-['Caveat'] text-3xl italic tracking-wide drop-shadow-sm">
              No upcoming birthdays on the board...
            </p>
          </div>
        )}
      </div>

      {/* Footer subtle hint */}
      <div className="text-center mt-6">
        <p className="text-stone-500 font-['Caveat'] text-xl italic tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-400 animate-spin-slow" />
          Click to drop a warm message on WhatsApp
          <Sparkles className="h-4 w-4 text-amber-400 animate-spin-slow" />
        </p>
      </div>
    </>
  );
};

// ------------------------------------------------------------
// 4. Color Palette configuration for chalk aesthetics
// ------------------------------------------------------------
const chalkColors = [
  {
    bg: "bg-[#fff5f5]/90 backdrop-blur-xs",
    border: "border-rose-300/80",
    badge: "bg-rose-100/80 text-rose-800 border-rose-300/40",
    accent: "text-rose-500",
  },
  {
    bg: "bg-[#f0f9ff]/90 backdrop-blur-xs",
    border: "border-sky-300/80",
    badge: "bg-sky-100/80 text-sky-800 border-sky-300/40",
    accent: "text-sky-500",
  },
  {
    bg: "bg-[#fffbeb]/90 backdrop-blur-xs",
    border: "border-amber-300/80",
    badge: "bg-amber-100/80 text-amber-800 border-amber-300/40",
    accent: "text-amber-600",
  },
  {
    bg: "bg-[#f0fdf4]/90 backdrop-blur-xs",
    border: "border-emerald-300/80",
    badge: "bg-emerald-100/80 text-emerald-800 border-emerald-300/40",
    accent: "text-emerald-600",
  },
  {
    bg: "bg-[#f5f3ff]/90 backdrop-blur-xs",
    border: "border-violet-300/80",
    badge: "bg-violet-100/80 text-violet-800 border-violet-300/40",
    accent: "text-violet-600",
  },
  {
    bg: "bg-[#fff7ed]/90 backdrop-blur-xs",
    border: "border-orange-300/80",
    badge: "bg-orange-100/80 text-orange-800 border-orange-300/40",
    accent: "text-orange-600",
  },
];

const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

// ------------------------------------------------------------
// 5. Chalk-Style Birthday Card Component
// ------------------------------------------------------------
const BirthdayCard = ({ person }: { person: Birthday }) => {
  const isToday = person.daysUntil === 0;
  const isTomorrow = person.daysUntil === 1;

  const hash = hashString(person.id || person.name);
  const colors = chalkColors[hash % chalkColors.length];
  const tilt = (hash % 7) - 3; // Tilt ranges dynamically between -3deg and +3deg

  return (
    <div
      className="relative transition-all duration-300 hover:z-20 hover:scale-[1.05] group"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {/* Realistic Push Pin */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center group-hover:scale-110 transition-transform duration-200">
        <div className="w-5 h-5 rounded-full bg-linear-to-br from-rose-400 to-red-600 shadow-[0_3px_6px_rgba(0,0,0,0.4)] border border-white/30 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full absolute top-1 left-1" />
        </div>
        <div className="w-[1.5px] h-2.5 bg-stone-700/60 -mt-0.5" />
      </div>

      {/* Dynamic Paper Card Component */}
      <Card
        className={`${colors.bg} border-[3px] border-double ${colors.border} rounded-sm shadow-[5px_5px_15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden relative transition-all duration-200`}
      >
        {/* Subtle inner grid paper line pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <CardContent className="p-5 flex flex-col gap-4 relative z-10">
          {/* Avatar + Name Metadata */}
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="h-14 w-14 rounded-full border-2 border-stone-400/60 border-dashed p-0.5 bg-white/70">
                <Avatar className="h-full w-full ring-0 shadow-none">
                  <AvatarImage src={person.avatar} className="object-cover" />
                  <AvatarFallback className="text-xl bg-stone-200 text-stone-700 font-bold font-['Caveat']">
                    {person.name?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>
              </div>
              {isToday && (
                <div className="absolute -bottom-1 -right-1 bg-rose-500 text-white rounded-full p-1 shadow-md animate-pulse-strong">
                  <Cake className="h-3.5 w-3.5" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-['Caveat'] font-black text-2xl text-stone-800 leading-tight truncate">
                {person.name || "Anonymous"}
              </h3>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500/90 mt-0.5">
                {person.department || "General"}
              </p>
            </div>
          </div>

          {/* Days Until Countdowns */}
          <div className="relative">
            {isToday ? (
              <div className="bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-lg py-2.5 px-3 text-center shadow-sm animate-pulse-strong">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-90 mb-0.5">
                  🎉 Celebrating Today
                </div>
                <div className="text-2xl font-black font-['Caveat'] tracking-wide">
                  HAPPY BIRTHDAY!
                </div>
              </div>
            ) : isTomorrow ? (
              <div className="bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-lg py-2.5 px-3 text-center shadow-sm">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-90 mb-0.5">
                  ⏰ Coming Up Next
                </div>
                <div className="text-2xl font-black font-['Caveat'] tracking-wide">
                  TOMORROW
                </div>
              </div>
            ) : (
              <div
                className={`${colors.badge} rounded-lg py-2 px-3 text-center border border-dashed`}
              >
                <div className="flex items-center justify-center gap-1.5 mb-0.5 opacity-70">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest">
                    Days Until
                  </span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-black font-['Caveat'] leading-none">
                    {person.daysUntil ?? 0}
                  </span>
                  <span className="text-xs font-bold opacity-80">days</span>
                </div>
              </div>
            )}
          </div>
          <WhatsAppWishButton name={person.name} phoneno={person.phoneno} />

          {/* Pretty Chalk Text Date Footer */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-stone-600/90 mt-1">
            <CalendarDays className={`h-3.5 w-3.5 ${colors.accent}`} />
            <span>
              {person.dob
                ? new Date(person.dob).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })
                : "Date Unknown"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
