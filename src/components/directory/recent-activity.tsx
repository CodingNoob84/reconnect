import { ArrowUpRight, Check, Clock, History, X } from "lucide-react";

import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import { getDepartmentIcon, getTimeAgo } from "#/lib/utils";
import { useQuery } from "@tanstack/react-query";

import { profileQueries } from "#/query/profile";
import { ActivityGridSkeleton } from "./recent-skeleton";
import { Link } from "@tanstack/react-router";

export const RecentActivity = () => {
  //const [currentPage, setCurrentPage] = useState(1);

  const limit = 8;

  const { data, isLoading } = useQuery(
    profileQueries.recentactivity({
      page: 1,
      limit,
    }),
  );
  console.log("data", data);
  const activities = data?.data ?? [];

  //const totalPages = data?.pagination.totalPages ?? 1;

  if (isLoading) {
    return <ActivityGridSkeleton />;
  }

  return (
    <section className="mt-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <History className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold">Recent Activity</h3>

            <p className="text-sm text-stone-500">Latest moderation actions</p>
          </div>
        </div>

        <Badge variant="secondary" className="text-xs px-4 py-2">
          {activities.length} actions
        </Badge>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground bg-stone-50 rounded-3xl">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-stone-100 mb-6">
            <History className="h-10 w-10 text-stone-400" />
          </div>

          <p className="text-2xl font-serif font-bold text-stone-800">
            No recent activity
          </p>

          <p className="text-stone-500 mt-2 max-w-md mx-auto">
            Actions will appear here once moderators accept or reject requests.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity) => {
              const DepartmentIcon = getDepartmentIcon(activity.department);

              return (
                <Card
                  key={activity.id}
                  className="group rounded-3xl border border-stone-200 bg-white/80 backdrop-blur-sm p-1 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30"
                >
                  <CardContent className="p-6">
                    {/* Avatar + Info */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative shrink-0">
                        <Avatar className="h-16 w-16 ring-4 ring-white shadow-xl">
                          <AvatarImage src={activity.avatar} />

                          <AvatarFallback className="font-serif text-lg bg-primary/10">
                            {activity.name?.[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div
                          className={`absolute -bottom-1 -right-1 rounded-full p-1 ring-2 ring-white ${
                            activity.approval_status === "approved"
                              ? "bg-emerald-500"
                              : "bg-red-500"
                          }`}
                        >
                          {activity.approval_status === "approved" ? (
                            <Check className="h-3 w-3 text-white" />
                          ) : (
                            <X className="h-3 w-3 text-white" />
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-lg font-bold text-stone-800 truncate">
                          {activity.name}
                        </h4>

                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge
                            variant="outline"
                            className="border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary"
                          >
                            {DepartmentIcon && (
                              <DepartmentIcon className="h-3 w-3 mr-1.5" />
                            )}

                            {activity.department}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* View Details */}
                    <div className="mb-5">
                      <Link to="/directory/$id" params={{ id: activity.id }}>
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

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                      {/* Moderator */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">
                          by
                        </span>

                        <div className="flex items-center gap-1.5">
                          <Avatar className="h-5 w-5 ring-2 ring-white">
                            <AvatarFallback className="text-[8px] bg-primary/10">
                              {activity.action_by_profile?.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <Link
                            to="/directory/$id"
                            params={{
                              id: activity.action_by_profile?.id ?? "",
                            }}
                          >
                            <span className="text-[11px] font-medium text-primary truncate max-w-20">
                              {activity.action_by_profile?.name}
                            </span>
                          </Link>
                        </div>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-1.5 text-stone-400">
                        <Clock className="h-3.5 w-3.5" />

                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {getTimeAgo(activity.action_at)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          {/* {totalPages > 1 && (
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
          )} */}
        </>
      )}
    </section>
  );
};
