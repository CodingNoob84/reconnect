// components/WhatsAppWishButton.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MessageSquareShare,
  PartyPopper,
  Sparkles,
  Loader2,
  UserCheck,
  PencilLine,
} from "lucide-react";
import { generateWhatsAppLink } from "#/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { authQueries } from "#/query/auth";
import { Link } from "@tanstack/react-router";

interface WhatsAppWishButtonProps {
  phoneno: string;
  name: string;
}

export const WhatsAppWishButton = ({
  phoneno,
  name,
}: WhatsAppWishButtonProps) => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showAlumniDialog, setShowAlumniDialog] = useState(false);
  const { data, isLoading } = useQuery(authQueries.user());
  const isAuthenticated = data?.isAuthenticated;
  const isAlumni = data?.isAlumni;

  const handleClick = () => {
    if (isLoading) return;

    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

    if (!isAlumni) {
      setShowAlumniDialog(true);
      return;
    }

    // If authenticated and not alumni, open WhatsApp link
    const whatsappUrl = generateWhatsAppLink(phoneno, name);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        disabled={isLoading}
        className="w-full h-9 rounded-lg bg-white border-2 border-dashed border-emerald-600 hover:bg-emerald-50 text-emerald-700 font-bold text-xs gap-2 transition-all duration-200 hover:shadow-sm group disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          <>
            <MessageSquareShare className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            Wish on WhatsApp
          </>
        )}
      </Button>

      {/* Auth Dialog - For non-authenticated users */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-rose-100 to-pink-100">
              <PartyPopper className="h-8 w-8 text-rose-600" />
            </div>
            <DialogTitle className="text-center text-xl font-bold">
              Sign in to Send Wishes
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Join the celebration! Sign in to send heartfelt birthday wishes
              and make someone's day extra special
              <Sparkles className="h-3 w-3 inline-block ml-1 text-amber-500" />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-3 sm:justify-center mt-4">
            <Button
              variant="outline"
              onClick={() => setShowAuthDialog(false)}
              className="flex-1 rounded-lg border-2 border-dashed border-stone-300 text-stone-600 hover:bg-stone-50 font-semibold text-sm"
            >
              Maybe Later
            </Button>
            <Link
              to="/login"
              className="flex-1 rounded-lg bg-linear-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 font-semibold text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center py-2"
              onClick={() => setShowAuthDialog(false)}
            >
              Sign In
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alumni Dialog - For alumni users who need to update profile */}
      <Dialog open={showAlumniDialog} onOpenChange={setShowAlumniDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-amber-100 to-orange-100">
              <UserCheck className="h-8 w-8 text-amber-600" />
            </div>
            <DialogTitle className="text-center text-xl font-bold">
              Update Your Profile
            </DialogTitle>
            <DialogDescription className="text-center pt-2 space-y-3">
              <p>
                You're currently registered as an alumni. To send birthday
                wishes, please update your profile and get approved as an active
                alumni member.
              </p>
              <div className="flex items-center justify-center gap-2 text-amber-600 bg-amber-50 rounded-lg p-3 mt-2">
                <PencilLine className="h-4 w-4" />
                <span className="text-sm font-semibold">
                  Update your profile to continue
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-3 sm:justify-center mt-4">
            <Button
              variant="outline"
              onClick={() => setShowAlumniDialog(false)}
              className="flex-1 rounded-lg border-2 border-dashed border-stone-300 text-stone-600 hover:bg-stone-50 font-semibold text-sm"
            >
              Cancel
            </Button>
            <Link
              to="/myprofile/edit"
              className="flex-1 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 font-semibold text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center py-2 gap-2"
              onClick={() => setShowAlumniDialog(false)}
            >
              <PencilLine className="h-4 w-4" />
              Update Profile
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
