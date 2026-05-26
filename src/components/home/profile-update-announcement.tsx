import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";
import { ArrowRight, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { authQueries } from "#/query/auth";

const COOLDOWN_MS = 5 * 60 * 1000;

// resets on refresh
let hiddenUntil = 0;

export const ProfileUpdateAnnouncement = () => {
  const { data, isLoading } = useQuery(authQueries.user());
  const isProfileUpdated = data?.isProfileUpdated;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // if profile updated -> never show modal
    if (isProfileUpdated) {
      setIsOpen(false);
      return;
    }

    // show modal if cooldown expired
    if (Date.now() > hiddenUntil) {
      setIsOpen(true);
    }
  }, [isLoading, isProfileUpdated]);

  const handleDismiss = () => {
    setIsOpen(false);

    hiddenUntil = Date.now() + COOLDOWN_MS;

    setTimeout(() => {
      // reopen only if profile still not updated
      if (!isProfileUpdated) {
        setIsOpen(true);
      }
    }, COOLDOWN_MS);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md bg-background shadow-none">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/20" />

          <div className="relative p-7">
            <div className="mb-5 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <User className="h-6 w-6" />
              </div>
            </div>

            <div className="space-y-3 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Complete Your Profile
              </h2>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Please complete the required details to keep your account synced
                across the platform.
              </p>
            </div>

            <div className="mt-7 flex gap-3">
              <Button
                variant="outline"
                onClick={handleDismiss}
                className="flex-1 rounded-xl"
              >
                Later
              </Button>

              <Button asChild className="flex-1 rounded-xl">
                <Link to="/myprofile/edit">
                  Update
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
