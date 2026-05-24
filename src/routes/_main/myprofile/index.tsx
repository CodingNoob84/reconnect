import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import {
  Verified,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Calendar,
  Briefcase,
  Building2,
  User,
  Edit,
  Sparkles,
  Clock,
  XCircle,
  IdCard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { profileQueries } from "#/query/profile";
import { ProfileDetailsSkeleton } from "#/components/profile/profile-skeleton";
import { formatBirthday } from "#/lib/utils";

export const Route = createFileRoute("/_main/myprofile/")({
  beforeLoad: async ({ context }) => {
    if (!context.authState.isAuthenticated) {
      throw redirect({ to: "/" });
    }
    if (
      context.authState.isAuthenticated &&
      !context.authState.isProfileUpdated
    ) {
      throw redirect({ to: "/myprofile/edit" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: profile, isLoading } = useQuery(profileQueries.myprofile());
  console.log("data", profile);

  // Fallback state mapping for visual verification status badges
  // Fallback state mapping for visual verification status badges
  const renderStatusBadge = (status?: string) => {
    const normalizeStatus = status?.toLowerCase() || "pending";

    switch (normalizeStatus) {
      case "approved":
        return (
          <div className="relative group">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-emerald-500/15 to-emerald-500/5 border-2 border-emerald-500/30 shadow-lg shadow-emerald-500/10 backdrop-blur-sm">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
                <Verified className="w-4 h-4 text-emerald-400 relative z-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Approved
              </span>
            </span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-card animate-pulse" />
          </div>
        );
      case "rejected":
        return (
          <div className="relative group">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-red-500/15 to-red-500/5 border-2 border-red-500/30 shadow-lg shadow-red-500/10 backdrop-blur-sm">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                Rejected
              </span>
            </span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-card" />
          </div>
        );
      case "pending":
      default:
        return (
          <div className="relative group">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-amber-500/15 to-amber-500/5 border-2 border-amber-500/30 shadow-lg shadow-amber-500/10 backdrop-blur-sm">
              <div className="relative">
                <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Pending Review
              </span>
            </span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-card animate-pulse" />
          </div>
        );
    }
  };

  if (isLoading) {
    return <ProfileDetailsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      <main className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:px-12">
        {/* Navigation Action */}
        <div className="mb-8 flex justify-end">
          <Button
            asChild
            className="rounded-xl shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
          >
            <Link to="/myprofile/edit">
              <Edit className="h-4 w-4 mr-2" /> Edit Profile
            </Link>
          </Button>
        </div>

        {/* 1. Header Hero Card */}
        <section className="relative overflow-hidden bg-card p-8 md:p-10 rounded-3xl border border-border shadow-xs mb-6">
          <div className="absolute top-0 right-0 h-32 w-32 bg-accent/30 rounded-bl-full pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <div className="relative shrink-0">
              <img
                alt={`${profile?.name} Profile Thumbnail`}
                className="w-36 h-36 md:w-44 md:h-44 rounded-2xl border-4 border-background object-cover shadow-xs transition-transform duration-500 hover:scale-[1.02]"
                src={
                  profile?.avatar ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
                }
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-xl shadow-md border-2 border-card">
                <Verified className="w-4 h-4" />
              </div>
            </div>

            <div className="grow text-center md:text-left space-y-6 pt-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-4xl font-bold text-foreground tracking-tight inline-flex flex-wrap items-baseline gap-2 justify-center md:justify-start">
                    {profile?.name || "Anonymous Alumnus"}
                    {profile?.nickname && (
                      <span className="font-sans text-lg font-normal text-muted-foreground tracking-normal">
                        ({profile.nickname})
                      </span>
                    )}
                  </h1>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mt-1.5">
                    Verified Alumnus
                  </p>
                </div>

                {/* Dynamically Evaluated Verification Pipeline Status Badge */}
                <div className="self-center md:self-start">
                  {renderStatusBadge(profile?.approval_status)}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 pt-4 border-t border-border">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1 justify-center md:justify-start">
                    <Calendar className="w-3 h-3 text-muted-foreground/60" />
                    Birthday
                  </p>
                  <p className="text-sm font-semibold text-foreground/90 text-center md:text-left">
                    {formatBirthday(profile?.dob || "") || "Not Provided"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1 justify-center md:justify-start">
                    <Briefcase className="w-3 h-3 text-muted-foreground/60" />
                    Department
                  </p>
                  <p className="text-sm font-semibold uppercase text-foreground/90 text-center md:text-left">
                    {profile?.department || "Not Provided"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1 justify-center md:justify-start">
                    <User className="w-3 h-3 text-muted-foreground/60" />
                    Batch
                  </p>
                  <p className="text-sm font-semibold text-foreground/90 text-center md:text-left">
                    {profile?.batch || "Not Provided"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1 justify-center md:justify-start">
                    <IdCard className="w-3 h-3 text-muted-foreground/60" />
                    Roll Number
                  </p>
                  <p className="text-sm font-semibold text-foreground/90 text-center md:text-left">
                    {profile?.regno || "Forgotten"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Layout Grid Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Side: Direct Contact Details & Connectivity */}
          <div className="lg:col-span-4 space-y-6">
            {/* 2. Contact Card */}
            <section className="bg-card p-6 rounded-2xl border border-border shadow-xs">
              <h3 className="font-serif text-lg font-bold text-foreground mb-5">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3 items-start p-2 rounded-xl hover:bg-secondary/40 transition-colors">
                  <Mail className="text-primary w-4 h-4 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Email Address
                    </p>
                    <p className="text-xs font-medium text-foreground/90 truncate">
                      {profile?.email || "Not Provided"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start p-2 rounded-xl hover:bg-secondary/40 transition-colors">
                  <Phone className="text-primary w-4 h-4 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Phone Line
                    </p>
                    <p className="text-xs font-medium text-foreground/90">
                      {profile?.phoneno || "Not Provided"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start p-2 rounded-xl hover:bg-secondary/40 transition-colors">
                  <MapPin className="text-primary w-4 h-4 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-xs font-medium text-foreground/90 leading-relaxed">
                      {profile?.address?.line ||
                      profile?.address?.city ||
                      profile?.address?.state ||
                      profile?.address?.country ? (
                        <>
                          {profile?.address?.line &&
                            `${profile.address.line}, `}
                          {profile?.address?.city &&
                            `${profile.address.city}, `}
                          {profile?.address?.state &&
                            `${profile.address.state}, `}
                          {profile?.address?.country &&
                            `${profile.address.country}`}
                          {profile?.address?.pincode &&
                            ` - ${profile.address.pincode}`}
                        </>
                      ) : (
                        "No location address specified"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Brand Accent Network Connectivity Box */}
            <section className="bg-primary text-primary-foreground p-6 rounded-2xl shadow-xs relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-linear(180deg,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
              <h3 className="font-serif text-md font-medium text-primary-foreground/80 mb-4">
                Network Connectivity
              </h3>

              {profile?.linkedin_link ||
              profile?.x_link ||
              profile?.facebook_link ||
              profile?.instagram_link ? (
                <div className="flex flex-wrap gap-2">
                  {profile?.linkedin_link && (
                    <a
                      href={profile.linkedin_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 border border-primary-foreground/5 transition-all hover:scale-110"
                    >
                      <Linkedin className="w-4 h-4 fill-primary-foreground text-transparent" />
                    </a>
                  )}
                  {profile?.x_link && (
                    <a
                      href={profile.x_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 border border-primary-foreground/5 transition-all hover:scale-110"
                    >
                      <Twitter className="w-4 h-4 fill-primary-foreground text-transparent" />
                    </a>
                  )}
                  {profile?.instagram_link && (
                    <a
                      href={profile.instagram_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 border border-primary-foreground/5 transition-all hover:scale-110"
                    >
                      <Instagram className="w-4 h-4 text-primary-foreground" />
                    </a>
                  )}
                  {profile?.facebook_link && (
                    <a
                      href={profile.facebook_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 border border-primary-foreground/5 transition-all hover:scale-110"
                    >
                      <Facebook className="w-4 h-4 fill-primary-foreground text-transparent" />
                    </a>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4 text-center border border-dashed border-primary-foreground/20 rounded-xl bg-primary-foreground/5 backdrop-blur-xs">
                  <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center mb-2.5">
                    <svg
                      className="w-5 h-5 text-primary-foreground/80"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5l1.5-1.5m-.343-2.22l-1.5 1.5m1.5-1.5a3 3 0 114.243-4.243l1.5-1.5"
                      />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-primary-foreground">
                    No Social Links Associated
                  </p>
                  <p className="text-[11px] text-primary-foreground/70 mt-0.5 max-w-50 leading-normal">
                    Connect your digital channels to grow your inner network
                    loop.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right Side: Core Profiles & Description Panels */}
          <div className="lg:col-span-8 space-y-6">
            {/* 3. Professional Card */}
            <section className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  Professional Dossier
                </h3>
                {profile?.industry ? (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/5 px-2.5 py-1 rounded-md border border-primary/10">
                    {profile?.industry}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 bg-secondary px-2.5 py-1 rounded-md border border-border">
                    Unassigned
                  </span>
                )}
              </div>

              {/* Seamless structural integration for active/empty dynamic blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-secondary/40 p-4 rounded-xl border border-border/40">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Briefcase className="w-3 h-3 text-primary" /> Current
                    Assignment
                  </p>
                  {profile?.current_position ? (
                    <p className="text-xs font-bold text-foreground">
                      {profile?.current_position}
                    </p>
                  ) : (
                    <p className="text-xs italic text-muted-foreground/60 border border-dashed border-border/60 rounded-md px-2 py-1 bg-background/30 w-fit">
                      Position not compiled
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Building2 className="w-3 h-3 text-primary" /> Industry
                    Vertical
                  </p>
                  {profile?.industry ? (
                    <p className="text-xs font-bold text-foreground">
                      {profile?.industry}
                    </p>
                  ) : (
                    <p className="text-xs italic text-muted-foreground/60 border border-dashed border-border/60 rounded-md px-2 py-1 bg-background/30 w-fit">
                      Sector not compiled
                    </p>
                  )}
                </div>
              </div>

              {/* Executive Overview */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Executive Overview
                </p>
                {profile?.description ? (
                  <p className="text-xs font-medium text-muted-foreground leading-relaxed font-sans">
                    {profile?.description}
                  </p>
                ) : (
                  <div className="p-4 rounded-xl bg-secondary/20 border border-dashed border-border/60 text-center">
                    <p className="text-xs italic text-muted-foreground/60 leading-relaxed">
                      No overview statement compiled. Add a profile narrative
                      summary to articulate your corporate trajectory.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* 5. Interests Compact Tags */}
            <section className="bg-card p-6 rounded-2xl border border-border shadow-xs">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                Personal Pursuits & Affiliations
              </h3>

              {profile?.interests && profile.interests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-2 bg-accent/40 rounded-xl border border-border/40 hover:border-primary/20 transition-all"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
                        {interest}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 bg-secondary/20 rounded-xl border border-dashed border-border">
                  <div className="w-12 h-12 rounded-xl bg-accent/40 flex items-center justify-center mb-2.5 border border-border/60">
                    <Sparkles className="w-5 h-5 text-muted-foreground/60" />
                  </div>
                  <p className="text-xs font-semibold text-foreground/80">
                    No Pursuits Appended
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 text-center max-w-xs leading-normal">
                    Add tags representing personal mechanics, research
                    directions, or special hobbies.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
