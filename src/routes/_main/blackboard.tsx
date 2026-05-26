import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { MessageSquare, Cake } from "lucide-react";

import { StoriesSection } from "#/components/blackboard/story-section";
import { BirthdaysSection } from "#/components/blackboard/birthday-section";

export const Route = createFileRoute("/_main/blackboard")({
  component: BlackboardPage,
});

// Main Page Component
function BlackboardPage() {
  const [activeTab, setActiveTab] = useState<"stories" | "birthdays">(
    "birthdays",
  );

  // Reset page when switching tabs
  const handleTabChange = (tab: "stories" | "birthdays") => {
    setActiveTab(tab);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <section className="mb-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
            <MessageSquare className="h-3 w-3" /> Shared Wisdom
          </div>
          <h1 className="font-serif text-5xl font-bold text-stone-800 tracking-tight md:text-6xl">
            The Alumni <span className="italic text-primary">Blackboard</span>
          </h1>
          <p className="text-lg text-stone-500 font-medium leading-relaxed">
            Every graduate leaves a story behind — a lesson learned, a
            friendship formed, a struggle overcome, a birthday remembered, or
            advice worth passing on.
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => handleTabChange("stories")}
              className={` relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === "stories"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              <MessageSquare className="h-4 w-4 inline mr-2" />
              Stories & Memories
            </button>
            <button
              onClick={() => handleTabChange("birthdays")}
              className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === "birthdays"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              <Cake className="h-4 w-4 inline mr-2" />
              Upcoming Birthdays
            </button>
          </div>
        </div>
      </section>

      {/* Corkboard */}
      <div>
        {activeTab === "stories" && <StoriesSection />}

        {activeTab === "birthdays" && <BirthdaysSection />}
      </div>
    </main>
  );
}
