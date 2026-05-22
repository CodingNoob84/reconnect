import { Camera, Filter, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";

export const MemoryLaneHeader = ({
  memoryLength,
}: {
  memoryLength: number;
}) => {
  const [isAddMomentOpen, setIsAddMomentOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className="mb-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
          <Camera className="h-3 w-3" />
          Visual Archive • {memoryLength} Memories
        </div>
        <h1 className="font-serif text-5xl font-bold text-stone-800 tracking-tight md:text-6xl">
          The Memory <span className="italic text-primary">Lane</span>
        </h1>
        <p className="text-lg text-stone-500 font-medium leading-relaxed">
          Every graduate leaves a story behind—a captured fragment of light, a
          quiet morning in the library, or the electric energy of the quad.
          Scroll to relive the eras.
        </p>

        <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center">
          {/* Add a Moment Dialog */}
          <Dialog open={isAddMomentOpen} onOpenChange={setIsAddMomentOpen}>
            <DialogTrigger asChild>
              <Button className="h-14 rounded-2xl gap-2">
                <Plus className="h-4 w-4" />
                Add a Moment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add a New Memory</DialogTitle>
                <DialogDescription>
                  Share your special moment with everyone.
                </DialogDescription>
              </DialogHeader>

              {/* Coming Soon - Everyone can upload moments */}
              <div className="flex items-center gap-4 p-5 bg-linear-to-br from-stone-50 to-stone-100/50 rounded-xl border border-stone-200 my-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-stone-900">
                    ✨ Coming Soon
                  </h3>
                  <p className="text-sm text-stone-600 mt-0.5">
                    Everyone will be able to upload and share their special
                    moments here.
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    Stay tuned for updates!
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddMomentOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Filter Eras Dialog */}
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-14 rounded-2xl gap-2">
                <Filter className="h-4 w-4" />
                Filter Eras
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Eras</DialogTitle>
                <DialogDescription>
                  Choose which years or events to display.
                </DialogDescription>
              </DialogHeader>

              {/* Coming Soon - Compact (same theme) */}
              <div className="flex items-center gap-4 p-5 bg-linear-to-br from-stone-50 to-stone-100/50 rounded-xl border border-stone-200 my-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Filter className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-stone-900">
                    🔍 Coming Soon
                  </h3>
                  <p className="text-sm text-stone-600 mt-0.5">
                    Filter and browse memories by years, events, or categories.
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    Stay tuned for updates!
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
