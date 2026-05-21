import { EditProfileForm } from "#/components/edit/edit-form";
import { EditProfileSkeleton } from "#/components/edit/edit-skeleton";
import { profileQueries } from "#/query/profile";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/myprofile/edit")({
  beforeLoad: async ({ context }) => {
    if (!context.authState.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery(profileQueries.myprofile());
  console.log("data", data);
  if (isLoading) {
    return <EditProfileSkeleton />;
  }
  return <EditProfileForm initialValues={data} />;
}
