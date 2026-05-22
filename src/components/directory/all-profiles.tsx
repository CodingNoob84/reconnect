import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Users } from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import { profileQueries } from "#/query/profile";
import { getDepartmentIcon } from "#/lib/utils";

import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { AllProfilesSkeleton } from "./all-profiles-skeleton";
import { Link } from "@tanstack/react-router";

type Props = {
  department?: string;
  searchQuery?: string;
};

export const AllProfiles = ({ department, searchQuery }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  const { data, isLoading } = useQuery(
    profileQueries.allprofiles({
      page: currentPage,
      limit,
      department,
      search: searchQuery,
    }),
  );
  console.log("data", data);
  const profiles = data?.data ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;

  if (isLoading) {
    return <AllProfilesSkeleton />;
  }

  return (
    <section className="mt-2">
      {/* Empty State */}
      {profiles.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-stone-100 mb-6">
            <Users className="h-10 w-10 text-stone-400" />
          </div>

          <p className="text-2xl font-serif font-bold text-stone-800">
            No members found
          </p>

          <p className="text-stone-500 mt-2 max-w-md mx-auto">
            Try adjusting your filter to discover alumni.
          </p>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {profiles.map((person) => {
              const Icon = getDepartmentIcon(person.department);
              return (
                <Card
                  key={person.id}
                  className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white/80 backdrop-blur-sm p-1 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-5">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div className="absolute -inset-2 rounded-full bg-linear-to-tr from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-sm" />

                        <Avatar className="relative h-20 w-20 ring-4 ring-white shadow-xl">
                          <AvatarImage src={person.avatar} />

                          <AvatarFallback className="font-serif text-lg bg-primary/10">
                            {person.name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-lg font-bold text-stone-800 truncate">
                          {person.name}
                        </h3>

                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge
                            variant="outline"
                            className="border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary"
                          >
                            <span className="mr-1.5">
                              {Icon && <Icon className="mr-1.5 h-3 w-3" />}
                            </span>

                            {person.department}
                          </Badge>
                        </div>

                        <div className="mt-3">
                          <Link to="/directory/$id" params={{ id: person.id }}>
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
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="rounded-full h-12 w-12 p-0 border-2 hover:border-primary/30 transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2 px-6 py-2 bg-stone-50 rounded-full">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-10 w-10 rounded-full text-xs font-bold transition-all ${
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
                className="rounded-full h-12 w-12 p-0 border-2 hover:border-primary/30 transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};
