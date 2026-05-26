import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog";
import { getDeptShortForm, getRotation } from "#/lib/utils";

interface Story {
  id: number;
  content: string;
  author: string;
  department: string;
  year: string;
  color: string;
  pinColor: string;
  avatar: string;
}

const StoryCard = ({ story }: { story: Story }) => (
  <div
    className={`relative transition-all duration-300 hover:z-20 hover:scale-[1.03] ${getRotation(story.id)}`}
  >
    <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
      <div
        className={`w-5 h-5 rounded-full ${story.pinColor} shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-white/20`}
      />
      <div className="w-0.5 h-2 bg-stone-600/40 -mt-1 blur-[0.5px]" />
    </div>

    <Card
      className={`${story.color} border-none rounded-sm shadow-[6px_6px_12px_rgba(0,0,0,0.15)] flex flex-col h-full overflow-hidden`}
    >
      <CardContent className="p-8 flex flex-col h-full min-h-55">
        <p className="font-['Caveat'] font-black text-xl text-stone-800 leading-snug italic mb-8 grow whitespace-pre-wrap">
          "{story.content}"
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-black/5">
          <Avatar className="h-9 w-9 ring-2 ring-white/50">
            <AvatarImage src={story.avatar} />
            <AvatarFallback>{story.author[0]}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 gap-1">
            <p className="text-[13px] font-bold text-stone-900 truncate tracking-tight">
              {story.author}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500/80">
              {getDeptShortForm(story.department)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Stories Section Component (with search, pagination, add story button)
export const StoriesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const notesPerPage = 6;

  const notes: Story[] = [
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
        "Late-night circuit debugging before internals felt impossible back then. Today, those sleepless nights remind me how far we've come.",
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
        "We entered college as strangers carrying different dreams. Four years later, we walked out carrying pieces of each other's stories.",
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

  return (
    <div className="flex flex-col gap-5">
      {/* Controls Row for Stories */}
      <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="h-14 rounded-2xl gap-2">
              <Plus className="h-4 w-4" />
              Share Your Story
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add your Story</DialogTitle>
              <DialogDescription>
                Share your special moment with everyone.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-4 p-5 bg-linear-to-br from-stone-50 to-stone-100/50 rounded-xl border border-stone-200 my-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-stone-900">
                  ✨ Coming Soon
                </h3>
                <p className="text-sm text-stone-600 mt-0.5">
                  Everyone will be able to post and share their special
                  moments/story here.
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Stay tuned for updates!
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
      <div
        className="relative rounded-[3.5rem] p-8 md:p-16 shadow-2xl border-14 border-stone-800"
        style={{
          backgroundColor: "#d68000",
          backgroundImage: `url("/images/dark-wood.png")`,
          boxShadow:
            "inset 0 0 100px rgba(0,0,0,0.2), 0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
      >
        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
          {paginatedNotes.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
      {/* Empty State for Stories */}
      {filteredNotes.length === 0 && (
        <div className="text-center py-32">
          <p className="text-white/60 font-serif text-2xl italic tracking-wide">
            No memories pinned here yet...
          </p>
        </div>
      )}

      {/* Pagination for Stories */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-8">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
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
            onClick={() => setCurrentPage(currentPage + 1)}
            className="rounded-full h-12 w-12 p-0 border-stone-200 hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
