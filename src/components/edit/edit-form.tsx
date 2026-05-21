import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Facebook, Instagram, Linkedin, Save, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProfileImageUpload } from "#/components/edit/avatar";
import { DatePickerField } from "#/components/edit/date-picker";

import type { UserProfile } from "#/types/profile";
import { InterestsTags } from "./interests-tags";
import { useState } from "react";
import { submitMyProfile } from "#/services/profile.api";
import { DEPARTMENT_OPTIONS, INDUSTRY_OPTIONS } from "#/lib/data";

// Updated schema to match UserProfile
export const profileSchema = z.object({
  id: z.string(),
  nickname: z.string().optional(),
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  avatar: z.string().optional(),
  dob: z.string().min(1, "Date of Birth is required"),
  department: z.string().min(1, "Department is required"),
  regno: z.string().optional(),
  batch: z.string().optional(),
  phoneno: z
    .string()
    .min(1, "PhoneNumber is required")
    .regex(/^\d+$/, "PhoneNumber must contain only numbers"),
  address: z
    .object({
      line: z.string().min(1, "Address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      country: z.string().min(1, "Country is required"),
      pincode: z
        .string()
        .min(1, "Pincode is required")
        .regex(/^\d+$/, "Pincode must contain only numbers"),
    })
    .nullable()
    .optional(),
  current_position: z.string().optional(),
  industry: z.string().optional(),
  description: z.string().optional(),
  interests: z.array(z.string()).optional(),
  linkedin_link: z.url("Invalid LinkedIn URL").optional().or(z.literal("")),
  x_link: z.url("Invalid X/Twitter URL").optional().or(z.literal("")),
  facebook_link: z.url("Invalid Facebook URL").optional().or(z.literal("")),
  instagram_link: z.url("Invalid Instagram URL").optional().or(z.literal("")),
  is_submitted: z.boolean(),
  approval_status: z.enum(["initial", "pending", "approved", "rejected"]),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const EditProfileForm = ({
  initialValues,
}: {
  initialValues: UserProfile | undefined;
}) => {
  const navigate = useNavigate();
  const userId = initialValues?.id!;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      id: initialValues?.id || "",
      nickname: initialValues?.nickname || "",
      name: initialValues?.name || "",
      email: initialValues?.email || "",
      avatar: initialValues?.avatar || "",
      dob: initialValues?.dob || "",
      department: initialValues?.department || "",
      regno: initialValues?.regno || "",
      batch: initialValues?.batch || "2010-2014",
      phoneno: initialValues?.phoneno || "",
      address: initialValues?.address || {
        line: initialValues?.address?.line || "",
        city: initialValues?.address?.city || "",
        state: initialValues?.address?.state || "",
        country: initialValues?.address?.country || "India",
        pincode: initialValues?.address?.pincode || "",
      },
      current_position: initialValues?.current_position || "",
      industry: initialValues?.industry || "",
      description: initialValues?.description || "",
      interests: initialValues?.interests || [],
      linkedin_link: initialValues?.linkedin_link || "",
      x_link: initialValues?.x_link || "",
      facebook_link: initialValues?.facebook_link || "",
      instagram_link: initialValues?.instagram_link || "",
      is_submitted: initialValues?.is_submitted || false,
      approval_status: initialValues?.approval_status || "initial",
    } as ProfileFormValues,

    validators: {
      onChange: profileSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        console.log("Saved profile:", value);
        const res = await submitMyProfile({ data: value });
        console.log("res", res);
        if (res.success) {
          navigate({ to: "/myprofile" });
        }
      } catch (error) {
        console.error("Error saving profile:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:px-12 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-border/60">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight">
              Edit Your Profile
            </h1>
            <p className="text-xs font-medium text-muted-foreground mt-0.5">
              Refine and curate your identity blocks across the platform
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => form.handleSubmit()}
            disabled={isSubmitting} // Disable button while submitting
            className="rounded-xl text-xs font-bold uppercase tracking-wider gap-2 px-5 shadow-xs"
          >
            {isSubmitting ? (
              <>
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* ---------- IDENTITY CORE ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Profile Photo */}
          <form.Field name="avatar">
            {(field) => <ProfileImageUpload field={field} userId={userId} />}
          </form.Field>

          {/* Personal Details */}
          <Card className="md:col-span-8 border-border/60 shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-serif">
                Personal Registry Data
              </CardTitle>
              <CardDescription className="text-[11px]">
                Primary identification records for directory systems
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <form.Field name="name">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Full Canonical Name
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`rounded-xl text-xs font-medium border-border/60 ${
                        field.state.meta.errors.length > 0
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-[10px] text-destructive mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="nickname">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Nickname (optional)
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value || "")}
                      className="rounded-xl text-xs font-medium border-border/60"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="dob">
                {(field) => (
                  <DatePickerField field={field} label="Date of Birth" />
                )}
              </form.Field>

              <form.Field name="department">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Academic Department (Optional)
                    </Label>
                    <Select
                      onValueChange={(val) => field.handleChange(val)}
                      value={field.state.value || undefined}
                    >
                      <SelectTrigger
                        className={`rounded-xl text-xs bg-card w-full ${
                          field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0
                            ? "border-destructive focus:ring-destructive"
                            : "border-border/60"
                        }`}
                      >
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEPARTMENT_OPTIONS.map((dept) => (
                          <SelectItem key={dept.id} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0 && (
                        <p className="text-[10px] text-destructive mt-1">
                          {field.state.meta.errors[0]?.message}
                        </p>
                      )}
                  </div>
                )}
              </form.Field>

              <form.Field name="batch">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Graduation Batch Matrix
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value || "")}
                      className="rounded-xl text-xs font-medium border-border/60"
                      placeholder="e.g., 2010-2014"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-[10px] text-destructive mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="regno">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Registration Number
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value || "")}
                      className="rounded-xl text-xs font-medium border-border/60"
                      placeholder="e.g., REG-2024-001"
                    />
                  </div>
                )}
              </form.Field>
            </CardContent>
          </Card>
        </div>

        {/* ---------- COMMUNICATION NODES ---------- */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-serif">
              Communication Nodes
            </CardTitle>
            <CardDescription className="text-[11px]">
              Secure points of reachability and physical location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left column */}
              <div className="space-y-5">
                <form.Field name="email">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Email
                      </Label>
                      <Input
                        type="email"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`rounded-xl text-xs font-medium border-border/60 ${
                          field.state.meta.errors.length > 0
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }`}
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-[10px] text-destructive mt-1">
                          {field.state.meta.errors[0]?.message}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field name="phoneno">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Primary Phone Line
                      </Label>
                      <Input
                        value={field.state.value || ""}
                        onChange={(e) =>
                          field.handleChange(e.target.value || "")
                        }
                        className={`rounded-xl text-xs font-medium border-border/60 ${
                          field.state.meta.errors.length > 0
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }`}
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-[10px] text-destructive mt-1">
                          {field.state.meta.errors[0]?.message}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>

              {/* Right column: Address */}
              <div className="space-y-5">
                <form.Field name="address.line">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Address Line (Street/Building)
                      </Label>
                      <Textarea
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`rounded-xl text-xs font-medium border-border/60 min-h-24 leading-relaxed ${
                          field.state.meta.errors.length > 0
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }`}
                        placeholder="e.g., 401 Calle de Mallorca"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-[10px] text-destructive mt-1">
                          {field.state.meta.errors[0]?.message}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <div className="grid grid-cols-2 gap-3">
                  <form.Field name="address.city">
                    {(field) => (
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          City
                        </Label>
                        <Input
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className={`rounded-xl text-xs font-medium border-border/60 ${
                            field.state.meta.errors.length > 0
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-[10px] text-destructive mt-1">
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="address.state">
                    {(field) => (
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          State / Province
                        </Label>
                        <Input
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className={`rounded-xl text-xs font-medium border-border/60 ${
                            field.state.meta.errors.length > 0
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-[10px] text-destructive mt-1">
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="address.country">
                    {(field) => (
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Country
                        </Label>
                        <Input
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className={`rounded-xl text-xs font-medium border-border/60 ${
                            field.state.meta.errors.length > 0
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-[10px] text-destructive mt-1">
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="address.pincode">
                    {(field) => (
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Pincode / ZIP
                        </Label>
                        <Input
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className={`rounded-xl text-xs font-medium border-border/60 ${
                            field.state.meta.errors.length > 0
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-[10px] text-destructive mt-1">
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-serif">
              Social Platform Grid Architecture
            </CardTitle>
            <CardDescription className="text-[11px]">
              Connect and route system endpoints to external social nodes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field name="instagram_link">
                {(field) => (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                      <Instagram className="h-3.5 w-3.5" />
                      Instagram
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value || "")}
                      placeholder="https://instagram.com/username"
                      className={`rounded-xl text-xs font-medium border-border/60 ${
                        field.state.meta.errors.length > 0
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-[10px] text-destructive mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="linkedin_link">
                {(field) => (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                      <Linkedin className="h-3.5 w-3.5" />
                      LinkedIn
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value || "")}
                      placeholder="https://linkedin.com/in/username"
                      className={`rounded-xl text-xs font-medium border-border/60 ${
                        field.state.meta.errors.length > 0
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-[10px] text-destructive mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="facebook_link">
                {(field) => (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                      <Facebook className="h-3.5 w-3.5" />
                      Facebook
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value || "")}
                      placeholder="https://facebook.com/username"
                      className={`rounded-xl text-xs font-medium border-border/60 ${
                        field.state.meta.errors.length > 0
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-[10px] text-destructive mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="x_link">
                {(field) => (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                      <Twitter className="h-3.5 w-3.5" />X / Twitter
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value || "")}
                      placeholder="https://twitter.com/username"
                      className={`rounded-xl text-xs font-medium border-border/60 ${
                        field.state.meta.errors.length > 0
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-[10px] text-destructive mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
          </CardContent>
        </Card>

        {/* Professional Overview */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-serif">
              Professional Overview
            </CardTitle>
            <CardDescription className="text-[11px]">
              Your high-level corporate profile and ecosystem positioning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field name="current_position">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Current Designation
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value || "")}
                      className="rounded-xl text-xs font-medium border-border/60"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="industry">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Market Industry Field
                    </Label>
                    <Select
                      onValueChange={(val) => field.handleChange(val)}
                      value={field.state.value || undefined}
                    >
                      <SelectTrigger className="w-full rounded-xl text-xs bg-card border-border/60">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRY_OPTIONS.map((ind) => (
                          <SelectItem key={ind} value={ind}>
                            {ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>
            </div>

            <form.Field name="description">
              {(field) => (
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Executive Summary Narrative
                  </Label>
                  <Textarea
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value || "")}
                    className="rounded-xl text-xs font-medium border-border/60 min-h-25 leading-relaxed"
                  />
                </div>
              )}
            </form.Field>
          </CardContent>
        </Card>

        {/* Area of Interests */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-serif">
              Areas of Interest
            </CardTitle>
            <CardDescription className="text-[11px]">
              Technical domains, research areas, and professional interests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form.Field name="interests">
              {(field) => <InterestsTags field={field} />}
            </form.Field>
          </CardContent>
        </Card>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 mt-12 pt-6 border-t border-border/60">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate({ to: "/myprofile" })}
            disabled={isSubmitting}
            className="rounded-xl text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            Discard
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl text-xs font-bold uppercase tracking-wider gap-2 px-6 shadow-xs"
          >
            {isSubmitting ? (
              <>
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" /> Save All Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </main>
  );
};
