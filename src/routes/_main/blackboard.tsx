import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Plus,
} from "lucide-react";

export const Route = createFileRoute("/_main/blackboard")({
  component: BlackboardPage,
});

function BlackboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;

  const notes = [
    {
      id: 1,
      content:
        "First year felt terrifying until our classroom slowly turned into a second home. Somewhere between assignments and tea breaks, we found friendships that still feel timeless.",
      author: "Arun Prakash",
      department: "Mechanical Engineering",
      year: "2012",
      color: "bg-[#fff9c4]",
      pinColor: "bg-rose-600",
      avatar: "https://i.pravatar.cc/150?u=1",
    },

    {
      id: 2,
      content:
        "The workshop grease never left our uniforms, but neither did the memories. Mechanical taught us that strength is built through pressure.",
      author: "Karthik Raj",
      department: "Mechanical Engineering",
      year: "2010",
      color: "bg-[#e1f5fe]",
      pinColor: "bg-blue-700",
      avatar: "https://i.pravatar.cc/150?u=2",
    },

    {
      id: 3,
      content:
        "Late-night circuit debugging before internals felt impossible back then. Today, those sleepless nights remind me how far we’ve come.",
      author: "Vignesh Kumar",
      department: "Electrical Engineering",
      year: "2015",
      color: "bg-[#f1f8e9]",
      pinColor: "bg-emerald-600",
      avatar: "https://i.pravatar.cc/150?u=3",
    },

    {
      id: 4,
      content:
        "We entered college as strangers carrying different dreams. Four years later, we walked out carrying pieces of each other’s stories.",
      author: "Harini Subash",
      department: "Electronics Engineering",
      year: "2013",
      color: "bg-[#fce4ec]",
      pinColor: "bg-purple-600",
      avatar: "https://i.pravatar.cc/150?u=4",
    },

    {
      id: 5,
      content:
        "Civil engineering taught us more than building structures. It taught us patience, teamwork, and how strong foundations matter in life too.",
      author: "Pradeep Kumar",
      department: "Civil Engineering",
      year: "2009",
      color: "bg-[#fff3e0]",
      pinColor: "bg-orange-600",
      avatar: "https://i.pravatar.cc/150?u=5",
    },

    {
      id: 6,
      content:
        "Every failed code, every compile error, and every all-nighter eventually became part of a success story we never imagined back then.",
      author: "Naveen Raj",
      department: "Computer Science",
      year: "2018",
      color: "bg-[#f3e5f5]",
      pinColor: "bg-indigo-600",
      avatar: "https://i.pravatar.cc/150?u=6",
    },

    {
      id: 7,
      content:
        "The canteen benches witnessed our biggest dreams, heartbreaks, and laughter. Some places in college become memories before we even realize it.",
      author: "Divya Shree",
      department: "Electronics Engineering",
      year: "2016",
      color: "bg-[#e0f2f1]",
      pinColor: "bg-teal-600",
      avatar: "https://i.pravatar.cc/150?u=7",
    },
  ];

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage,
  );

  const getRotation = (id: number) => {
    const rotations = [
      "rotate-1",
      "-rotate-1",
      "rotate-2",
      "-rotate-2",
      "rotate-[0.5deg]",
      "-rotate-[1.5deg]",
    ];
    return rotations[id % rotations.length];
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* 1. Header & Controls */}
      <section className="mb-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
            <MessageSquare className="h-3 w-3" /> Shared Wisdom
          </div>
          <h1 className="font-serif text-5xl font-bold text-stone-800 tracking-tight md:text-6xl">
            The Alumni <span className="italic text-primary">Blackboard</span>
          </h1>
          <p className="text-lg text-stone-500 font-medium leading-relaxed">
            Every graduate leaves a story behind — a lesson learned, a
            friendship formed, a struggle overcome, or advice worth passing on.
          </p>

          {/* Controls Row */}
          <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center">
            <Button className="h-14 rounded-2xl gap-2">
              <Plus className="h-4 w-4" />
              Share Your Story
            </Button>

            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search stories..."
                className="h-14 rounded-2xl border-stone-200 bg-stone-50 pl-12 text-sm focus:ring-4 focus:ring-primary/5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Corkboard */}
      <div
        className="relative rounded-[3.5rem] p-8 md:p-16 shadow-2xl border-14 border-stone-800"
        style={{
          backgroundColor: "#d68000",
          backgroundImage: `url("/images/dark-wood.png")`,
          boxShadow:
            "inset 0 0 100px rgba(0,0,0,0.2), 0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
      >
        {/* Grid that adapts to content size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
          {paginatedNotes.map((note) => (
            <div
              key={note.id}
              className={`relative transition-all duration-300 hover:z-20 hover:scale-[1.03] ${getRotation(note.id)}`}
            >
              {/* 3D Push Pin Style */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
                <div
                  className={`w-5 h-5 rounded-full ${note.pinColor} shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-white/20`}
                />
                <div className="w-0.5 h-2 bg-stone-600/40 -mt-1 blur-[0.5px]" />
              </div>

              {/* Sticky Note */}
              <Card
                className={`${note.color} border-none rounded-sm shadow-[6px_6px_12px_rgba(0,0,0,0.15)] flex flex-col h-full overflow-hidden`}
              >
                <CardContent className="p-8 flex flex-col h-full min-h-55">
                  <p className="font-['Caveat'] font-black text-xl text-stone-800 leading-snug italic mb-8 grow whitespace-pre-wrap">
                    "{note.content}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                    <Avatar className="h-9 w-9 ring-2 ring-white/50">
                      <AvatarImage src={note.avatar} />
                      <AvatarFallback>{note.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 gap-1">
                      <p className="text-[13px] font-bold text-stone-900 truncate tracking-tight">
                        {note.author}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500/80">
                        {note.department}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-32">
            <p className="text-white/60 font-serif text-2xl italic tracking-wide">
              No memories pinned here yet...
            </p>
          </div>
        )}
      </div>

      {/* 3. Modern Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-8">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="rounded-full h-12 w-12 p-0 border-stone-200 hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400">
              Memories <span className="text-stone-900">{currentPage}</span> /{" "}
              {totalPages}
            </span>
          </div>

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="rounded-full h-12 w-12 p-0 border-stone-200 hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </main>
  );
}
