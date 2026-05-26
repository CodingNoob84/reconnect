import { useState } from "react";

import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  UserCheck,
  UserX,
} from "lucide-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { profileQueries } from "#/query/profile";

import { getDepartmentIcon, getDepartmentShort, getTimeAgo } from "#/lib/utils";

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import { PendingRequestsGridSkeleton } from "./pending-skeleton";
import { authQueries } from "#/query/auth";
import { approvalAction } from "#/services/profile.api";
import { Link } from "@tanstack/react-router";

type Props = {
  department: string;
  searchQuery: string;
};

export const PendingProfiles = ({ department, searchQuery }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const limit = 12;

  const queryClient = useQueryClient();
  const { data: UserContext } = useQuery(authQueries.user());
  const { data, isLoading } = useQuery(
    profileQueries.pendingprofiles({
      page: currentPage,
      limit,
      department,
      search: searchQuery,
    }),
  );

  const profiles = data?.data ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;

  const approvalMutation = useMutation({
    mutationFn: async ({
      profileId,
      action,
    }: {
      profileId: string;
      action: "approved" | "rejected";
    }) => {
      if (UserContext?.user?.id) {
        return approvalAction({
          data: {
            profileid: profileId,
            action: action,
            action_by: UserContext?.user?.id,
          },
        });
      }
      throw new Error("User context not available");
    },
    onMutate: ({ profileId }) => {
      setProcessingIds((prev) => new Set(prev).add(profileId));
    },
    onSuccess: (_, { action }) => {
      console.log("action", action);
      queryClient.invalidateQueries({ queryKey: profileQueries.base });
    },
    onError: (error) => {
      console.error("Approval error:", error);
    },
    onSettled: (_, __, { profileId }) => {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(profileId);
        return next;
      });
    },
  });

  const handleApproval = async (
    profileId: string,
    action: "approved" | "rejected",
  ) => {
    approvalMutation.mutate({ profileId, action });
  };

  if (isLoading) {
    return <PendingRequestsGridSkeleton />;
  }

  return (
    <section className="mb-16 animate-in slide-in-from-top-4 duration-500">
      <Card className="rounded-3xl border-2 border-primary/10 bg-linear-to-br from-primary/5 to-transparent shadow-xl">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-serif text-2xl font-bold flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                Pending Requests
              </h3>

              <p className="text-sm text-stone-500 mt-1">
                {profiles.length} alumni waiting for approval
              </p>
            </div>

            <Badge variant="secondary" className="text-xs px-4 py-2">
              {data?.pagination.total || 0} total
            </Badge>
          </div>

          {/* Empty State */}
          {profiles.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>

              <p className="text-2xl font-serif font-bold text-stone-800">
                All caught up!
              </p>

              <p className="text-stone-500 mt-2">
                No pending requests to review
              </p>
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {profiles.map((request) => {
                  const Icon = getDepartmentIcon(request.department);
                  const isProcessing = processingIds.has(request.id);

                  return (
                    <div
                      key={request.id}
                      className={`group rounded-2xl bg-white/80 backdrop-blur-sm border border-stone-200 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30 ${
                        isProcessing ? "opacity-75 pointer-events-none" : ""
                      }`}
                    >
                      {/* Avatar + Info */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="relative">
                          <div className="absolute -inset-1 rounded-full bg-linear-to-tr from-primary/30 to-purple-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-sm" />

                          <Avatar className="relative h-16 w-16 ring-4 ring-white shadow-xl">
                            <AvatarImage src={request.avatar} />

                            <AvatarFallback className="font-serif text-lg bg-primary/10">
                              {request.name?.[0]}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-base font-bold truncate">
                            {request.name}
                          </h4>

                          <div className="flex items-center gap-2 mt-1.5">
                            <Badge
                              variant="outline"
                              className="border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary"
                            >
                              {Icon && <Icon className="mr-1.5 h-3 w-3" />}

                              {getDepartmentShort(request.department)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-center justify-between mb-5 text-xs text-stone-500">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-primary/60" />
                          {getTimeAgo(request.updated_at)}
                        </span>
                        <div className="">
                          <Link to="/directory/$id" params={{ id: request.id }}>
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-xs font-semibold text-primary hover:underline group/link"
                            >
                              View Details
                              <ArrowUpRight className="h-3 w-3 ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2.5 pt-4 border-t border-stone-100">
                        {isProcessing ? (
                          <Button
                            className="flex-1 h-10 rounded-xl "
                            disabled={isProcessing}
                          >
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                          </Button>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              className="flex-1 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white gap-2 transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:hover:scale-100"
                              onClick={() =>
                                handleApproval(request.id, "approved")
                              }
                              disabled={isProcessing}
                            >
                              <UserCheck className="h-4 w-4" />

                              <span className="text-[11px] font-bold uppercase tracking-wider">
                                Accept
                              </span>
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              className="flex-1 h-10 rounded-xl gap-2 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                              onClick={() =>
                                handleApproval(request.id, "rejected")
                              }
                              disabled={isProcessing}
                            >
                              <UserX className="h-4 w-4" />

                              <span className="text-[11px] font-bold uppercase tracking-wider">
                                Reject
                              </span>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="rounded-full h-10 w-10 p-0 border-2 hover:border-primary/30 transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-full">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`h-8 w-8 rounded-full text-xs font-bold transition-all ${
                            currentPage === page
                              ? "bg-primary text-white shadow-lg shadow-primary/20"
                              : "hover:bg-stone-200 text-stone-600"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="rounded-full h-10 w-10 p-0 border-2 hover:border-primary/30 transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
