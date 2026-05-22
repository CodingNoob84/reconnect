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
            <DialogContent className="sm:max-w-150">
              <DialogHeader>
                <DialogTitle>Add a New Memory</DialogTitle>
                <DialogDescription>
                  Share your special moment with everyone. Fill in the details
                  below.
                </DialogDescription>
              </DialogHeader>

              {/* Content - Will be implemented soon */}
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-2">
                  Coming Soon!
                </h3>
                <p className="text-stone-500 max-w-md">
                  The add moment feature is currently under development. You'll
                  be able to share your special memories with everyone soon.
                </p>
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
            <DialogContent className="sm:max-w-150">
              <DialogHeader>
                <DialogTitle>Filter Eras</DialogTitle>
                <DialogDescription>
                  Choose which years or events to display.
                </DialogDescription>
              </DialogHeader>

              {/* Content - Will be implemented soon */}
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Filter className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-2">
                  Coming Soon!
                </h3>
                <p className="text-stone-500">
                  Filter functionality will be available in the next update.
                </p>
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
