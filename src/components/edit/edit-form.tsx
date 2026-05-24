import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Facebook, Instagram, Linkedin, Save, Twitter } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

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
import { submitMyProfile } from "#/services/profile.api";
import { DEPARTMENT_OPTIONS, INDUSTRY_OPTIONS } from "#/lib/data";
import { useQueryClient } from "@tanstack/react-query";

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
  linkedin_link: z
    .string()
    .url("Invalid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  x_link: z.string().url("Invalid X/Twitter URL").optional().or(z.literal("")),
  facebook_link: z
    .string()
    .url("Invalid Facebook URL")
    .optional()
    .or(z.literal("")),
  instagram_link: z
    .string()
    .url("Invalid Instagram URL")
    .optional()
    .or(z.literal("")),
  is_submitted: z.boolean(),
  approval_status: z.enum(["initial", "pending", "approved", "rejected"]),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

// Error Summary Banner Component
const ErrorSummaryBanner = ({
  errors,
  onErrorClick,
}: {
  errors: { field: string; message: string }[];
  onErrorClick: (fieldName: string) => void;
}) => {
  if (errors.length === 0) return null;

  return (
    <div className="mb-6 p-4 border border-destructive/30 bg-destructive/5 rounded-xl">
      <p className="text-sm font-bold text-destructive mb-2">
        Please fix the following errors ({errors.length}):
      </p>
      <ul className="space-y-1">
        {errors.map((error, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => onErrorClick(error.field)}
              className="text-xs text-destructive hover:underline cursor-pointer transition-colors"
            >
              • {error.message}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Scroll to error hook
const useScrollToError = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const scrollToFirstError = useCallback(() => {
    setTimeout(() => {
      if (!formRef.current) return;

      // Find all elements with error states
      const errorElements = formRef.current.querySelectorAll(
        '[aria-invalid="true"], [data-error="true"]',
      );

      if (errorElements.length > 0) {
        const firstError = errorElements[0] as HTMLElement;

        // Scroll to the error element with smooth behavior
        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Try to focus the element if it's focusable
        const focusableElement = firstError.querySelector(
          'input:not([type="hidden"]), textarea, select, button[role="combobox"]',
        ) as HTMLElement;

        if (focusableElement) {
          focusableElement.focus({ preventScroll: true });
        } else if (
          firstError instanceof HTMLInputElement ||
          firstError instanceof HTMLTextAreaElement ||
          firstError instanceof HTMLSelectElement
        ) {
          firstError.focus({ preventScroll: true });
        }
      }
    }, 100);
  }, []);

  const scrollToField = useCallback((fieldName: string) => {
    if (!formRef.current) return;

    const element = formRef.current.querySelector(
      `[data-field="${fieldName}"]`,
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      const input = element.querySelector(
        'input:not([type="hidden"]), textarea, select, button[role="combobox"]',
      ) as HTMLElement;

      if (input) {
        input.focus({ preventScroll: true });
      }
    }
  }, []);

  return { formRef, scrollToFirstError, scrollToField };
};

// Field wrapper component for consistent error handling
const FormFieldWrapper = ({
  fieldName,
  children,
  hasError,
  className = "",
}: {
  fieldName: string;
  children: React.ReactNode;
  hasError: boolean;
  className?: string;
}) => (
  <div data-field={fieldName} data-error={hasError} className={className}>
    {children}
  </div>
);

export const EditProfileForm = ({
  initialValues,
}: {
  initialValues: UserProfile | undefined;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = initialValues?.id!;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [errorSummary, setErrorSummary] = useState<
    { field: string; message: string }[]
  >([]);

  const { formRef, scrollToFirstError, scrollToField } = useScrollToError();

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
          queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
          queryClient.invalidateQueries({ queryKey: ["profile", "mine"] });
          navigate({ to: "/myprofile" });
        }
      } catch (error) {
        console.error("Error saving profile:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Collect all validation errors
  const collectErrors = useCallback(() => {
    const errors: { field: string; message: string }[] = [];
    const state = form.state;

    Object.entries(state.fieldMeta).forEach(
      ([fieldName, meta]: [string, any]) => {
        if (meta.errors && meta.errors.length > 0) {
          errors.push({
            field: fieldName,
            message: meta.errors[0]?.message || "Invalid field",
          });
        }
      },
    );

    return errors;
  }, [form.state]);

  // Effect to handle validation and scrolling
  useEffect(() => {
    if (validationAttempted) {
      const errors = collectErrors();
      setErrorSummary(errors);

      if (errors.length > 0) {
        scrollToFirstError();
      } else {
        // No errors, submit the form
        form.handleSubmit();
      }

      setValidationAttempted(false);
    }
  }, [validationAttempted, collectErrors, scrollToFirstError, form]);

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger validation on all fields
    form.validateAllFields("submit");

    // Check for errors after validation
    setTimeout(() => {
      const errors = collectErrors();

      if (errors.length > 0) {
        setErrorSummary(errors);
        scrollToFirstError();
      } else {
        form.handleSubmit();
      }
    }, 100);
  };

  // Clear errors when field is modified
  const handleFieldChange = (fieldName: string) => {
    setErrorSummary((prev) =>
      prev.filter((error) => error.field !== fieldName),
    );
  };

  console.log("errors", form.state.errors);

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
            type="button"
            onClick={handleFormSubmit}
            disabled={isSubmitting}
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

      <ErrorSummaryBanner errors={errorSummary} onErrorClick={scrollToField} />

      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="space-y-6"
        noValidate
      >
        {/* ---------- IDENTITY CORE ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Profile Photo */}
          <form.Field name="avatar">
            {(field) => (
              <FormFieldWrapper
                fieldName="avatar"
                hasError={field.state.meta.errors.length > 0}
                className="md:col-span-4"
              >
                <ProfileImageUpload field={field} userId={userId} />
              </FormFieldWrapper>
            )}
          </form.Field>

          {/* Personal Details */}
          <Card className="md:col-span-7 border-border/60 shadow-xs">
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
                  <FormFieldWrapper
                    fieldName="name"
                    hasError={field.state.meta.errors.length > 0}
                    className="space-y-1.5"
                  >
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Full Canonical Name
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        handleFieldChange("name");
                      }}
                      aria-invalid={field.state.meta.errors.length > 0}
                      aria-describedby={
                        field.state.meta.errors.length > 0
                          ? "name-error"
                          : undefined
                      }
                      className={`rounded-xl text-xs font-medium border-border/60 ${
                        field.state.meta.errors.length > 0
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p
                        id="name-error"
                        className="text-[10px] text-destructive mt-1"
                        role="alert"
                      >
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="nickname">
                {(field) => (
                  <FormFieldWrapper
                    fieldName="nickname"
                    hasError={field.state.meta.errors.length > 0}
                    className="space-y-1.5"
                  >
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Nickname (optional)
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => {
                        field.handleChange(e.target.value || "");
                        handleFieldChange("nickname");
                      }}
                      className="rounded-xl text-xs font-medium border-border/60"
                    />
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="dob">
                {(field) => (
                  <FormFieldWrapper
                    fieldName="dob"
                    hasError={field.state.meta.errors.length > 0}
                  >
                    <DatePickerField field={field} label="Date of Birth" />
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="department">
                {(field) => (
                  <FormFieldWrapper
                    fieldName="department"
                    hasError={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                    className="space-y-1.5"
                  >
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Academic Department (Optional)
                    </Label>
                    <Select
                      onValueChange={(val) => {
                        field.handleChange(val);
                        handleFieldChange("department");
                      }}
                      value={field.state.value || undefined}
                    >
                      <SelectTrigger
                        aria-invalid={
                          field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0
                        }
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
                        <p
                          className="text-[10px] text-destructive mt-1"
                          role="alert"
                        >
                          {field.state.meta.errors[0]?.message}
                        </p>
                      )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="batch">
                {(field) => (
                  <FormFieldWrapper
                    fieldName="batch"
                    hasError={field.state.meta.errors.length > 0}
                    className="space-y-1.5"
                  >
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Graduation Batch Matrix
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => {
                        field.handleChange(e.target.value || "");
                        handleFieldChange("batch");
                      }}
                      className="rounded-xl text-xs font-medium border-border/60"
                      placeholder="e.g., 2010-2014"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p
                        className="text-[10px] text-destructive mt-1"
                        role="alert"
                      >
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="regno">
                {(field) => (
                  <FormFieldWrapper
                    fieldName="regno"
                    hasError={field.state.meta.errors.length > 0}
                    className="space-y-1.5"
                  >
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Class Roll Number
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => {
                        field.handleChange(e.target.value || "");
                        handleFieldChange("regno");
                      }}
                      className="rounded-xl text-xs font-medium border-border/60"
                      placeholder="e.g., MECH-22"
                    />
                  </FormFieldWrapper>
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
                    <FormFieldWrapper
                      fieldName="email"
                      hasError={field.state.meta.errors.length > 0}
                      className="space-y-1.5"
                    >
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Email
                      </Label>
                      <Input
                        type="email"
                        value={field.state.value || ""}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          handleFieldChange("email");
                        }}
                        aria-invalid={field.state.meta.errors.length > 0}
                        className={`rounded-xl text-xs font-medium border-border/60 ${
                          field.state.meta.errors.length > 0
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }`}
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p
                          className="text-[10px] text-destructive mt-1"
                          role="alert"
                        >
                          {field.state.meta.errors[0]?.message}
                        </p>
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>

                <form.Field name="phoneno">
                  {(field) => (
                    <FormFieldWrapper
                      fieldName="phoneno"
                      hasError={field.state.meta.errors.length > 0}
                      className="space-y-1.5"
                    >
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Primary Phone Line
                      </Label>
                      <Input
                        value={field.state.value || ""}
                        onChange={(e) => {
                          field.handleChange(e.target.value || "");
                          handleFieldChange("phoneno");
                        }}
                        aria-invalid={field.state.meta.errors.length > 0}
                        className={`rounded-xl text-xs font-medium border-border/60 ${
                          field.state.meta.errors.length > 0
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }`}
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p
                          className="text-[10px] text-destructive mt-1"
                          role="alert"
                        >
                          {field.state.meta.errors[0]?.message}
                        </p>
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>
              </div>

              {/* Right column: Address */}
              <div className="space-y-5">
                <form.Field name="address.line">
                  {(field) => (
                    <FormFieldWrapper
                      fieldName="address.line"
                      hasError={field.state.meta.errors.length > 0}
                      className="space-y-1.5"
                    >
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Address Line (Street/Building)
                      </Label>
                      <Textarea
                        value={field.state.value || ""}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          handleFieldChange("address.line");
                        }}
                        aria-invalid={field.state.meta.errors.length > 0}
                        className={`rounded-xl text-xs font-medium border-border/60 min-h-24 leading-relaxed ${
                          field.state.meta.errors.length > 0
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }`}
                        placeholder="e.g., 401 Calle de Mallorca"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p
                          className="text-[10px] text-destructive mt-1"
                          role="alert"
                        >
                          {field.state.meta.errors[0]?.message}
                        </p>
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>

                <div className="grid grid-cols-2 gap-3">
                  <form.Field name="address.city">
                    {(field) => (
                      <FormFieldWrapper
                        fieldName="address.city"
                        hasError={field.state.meta.errors.length > 0}
                        className="space-y-1.5"
                      >
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          City
                        </Label>
                        <Input
                          value={field.state.value || ""}
                          onChange={(e) => {
                            field.handleChange(e.target.value);
                            handleFieldChange("address.city");
                          }}
                          aria-invalid={field.state.meta.errors.length > 0}
                          className={`rounded-xl text-xs font-medium border-border/60 ${
                            field.state.meta.errors.length > 0
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p
                            className="text-[10px] text-destructive mt-1"
                            role="alert"
                          >
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                      </FormFieldWrapper>
                    )}
                  </form.Field>

                  <form.Field name="address.state">
                    {(field) => (
                      <FormFieldWrapper
                        fieldName="address.state"
                        hasError={field.state.meta.errors.length > 0}
                        className="space-y-1.5"
                      >
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          State / Province
                        </Label>
                        <Input
                          value={field.state.value || ""}
                          onChange={(e) => {
                            field.handleChange(e.target.value);
                            handleFieldChange("address.state");
                          }}
                          aria-invalid={field.state.meta.errors.length > 0}
                          className={`rounded-xl text-xs font-medium border-border/60 ${
                            field.state.meta.errors.length > 0
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p
                            className="text-[10px] text-destructive mt-1"
                            role="alert"
                          >
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                      </FormFieldWrapper>
                    )}
                  </form.Field>

                  <form.Field name="address.country">
                    {(field) => (
                      <FormFieldWrapper
                        fieldName="address.country"
                        hasError={field.state.meta.errors.length > 0}
                        className="space-y-1.5"
                      >
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Country
                        </Label>
                        <Input
                          value={field.state.value || ""}
                          onChange={(e) => {
                            field.handleChange(e.target.value);
                            handleFieldChange("address.country");
                          }}
                          aria-invalid={field.state.meta.errors.length > 0}
                          className={`rounded-xl text-xs font-medium border-border/60 ${
                            field.state.meta.errors.length > 0
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p
                            className="text-[10px] text-destructive mt-1"
                            role="alert"
                          >
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                      </FormFieldWrapper>
                    )}
                  </form.Field>

                  <form.Field name="address.pincode">
                    {(field) => (
                      <FormFieldWrapper
                        fieldName="address.pincode"
                        hasError={field.state.meta.errors.length > 0}
                        className="space-y-1.5"
                      >
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Pincode / ZIP
                        </Label>
                        <Input
                          value={field.state.value || ""}
                          onChange={(e) => {
                            field.handleChange(e.target.value);
                            handleFieldChange("address.pincode");
                          }}
                          aria-invalid={field.state.meta.errors.length > 0}
                          className={`rounded-xl text-xs font-medium border-border/60 ${
                            field.state.meta.errors.length > 0
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p
                            className="text-[10px] text-destructive mt-1"
                            role="alert"
                          >
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                      </FormFieldWrapper>
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
                  <FormFieldWrapper
                    fieldName="instagram_link"
                    hasError={field.state.meta.errors.length > 0}
                    className="space-y-2"
                  >
                    <Label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                      <Instagram className="h-3.5 w-3.5" />
                      Instagram
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => {
                        field.handleChange(e.target.value || "");
                        handleFieldChange("instagram_link");
                      }}
                      placeholder="https://instagram.com/username"
                      aria-invalid={field.state.meta.errors.length > 0}
                      className={`rounded-xl text-xs font-medium border-border/60 ${
                        field.state.meta.errors.length > 0
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p
                        className="text-[10px] text-destructive mt-1"
                        role="alert"
                      >
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="linkedin_link">
                {(field) => (
                  <FormFieldWrapper
                    fieldName="linkedin_link"
                    hasError={field.state.meta.errors.length > 0}
                    className="space-y-2"
                  >
                    <Label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                      <Linkedin className="h-3.5 w-3.5" />
                      LinkedIn
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => {
                        field.handleChange(e.target.value || "");
                        handleFieldChange("linkedin_link");
                      }}
                      placeholder="https://linkedin.com/in/username"
                      aria-invalid={field.state.meta.errors.length > 0}
                      className={`rounded-xl text-xs font-medium border-border/60 ${
                        field.state.meta.errors.length > 0
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p
                        className="text-[10px] text-destructive mt-1"
                        role="alert"
                      >
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="facebook_link">
                {(field) => (
                  <FormFieldWrapper
                    fieldName="facebook_link"
                    hasError={field.state.meta.errors.length > 0}
                    className="space-y-2"
                  >
                    <Label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                      <Facebook className="h-3.5 w-3.5" />
                      Facebook
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => {
                        field.handleChange(e.target.value || "");
                        handleFieldChange("facebook_link");
                      }}
                      placeholder="https://facebook.com/username"
                      aria-invalid={field.state.meta.errors.length > 0}
                      className={`rounded-xl text-xs font-medium border-border/60 ${
                        field.state.meta.errors.length > 0
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p
                        className="text-[10px] text-destructive mt-1"
                        role="alert"
                      >
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="x_link">
                {(field) => (
                  <FormFieldWrapper
                    fieldName="x_link"
                    hasError={field.state.meta.errors.length > 0}
                    className="space-y-2"
                  >
                    <Label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                      <Twitter className="h-3.5 w-3.5" />X / Twitter
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => {
                        field.handleChange(e.target.value || "");
                        handleFieldChange("x_link");
                      }}
                      placeholder="https://twitter.com/username"
                      aria-invalid={field.state.meta.errors.length > 0}
                      className={`rounded-xl text-xs font-medium border-border/60 ${
                        field.state.meta.errors.length > 0
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p
                        className="text-[10px] text-destructive mt-1"
                        role="alert"
                      >
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </FormFieldWrapper>
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
                  <FormFieldWrapper
                    fieldName="current_position"
                    hasError={field.state.meta.errors.length > 0}
                    className="space-y-1.5"
                  >
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Current Designation
                    </Label>
                    <Input
                      value={field.state.value || ""}
                      onChange={(e) => {
                        field.handleChange(e.target.value || "");
                        handleFieldChange("current_position");
                      }}
                      className="rounded-xl text-xs font-medium border-border/60"
                    />
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="industry">
                {(field) => (
                  <FormFieldWrapper
                    fieldName="industry"
                    hasError={field.state.meta.errors.length > 0}
                    className="space-y-1.5"
                  >
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Market Industry Field
                    </Label>
                    <Select
                      onValueChange={(val) => {
                        field.handleChange(val);
                        handleFieldChange("industry");
                      }}
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
                  </FormFieldWrapper>
                )}
              </form.Field>
            </div>

            <form.Field name="description">
              {(field) => (
                <FormFieldWrapper
                  fieldName="description"
                  hasError={field.state.meta.errors.length > 0}
                  className="space-y-1.5"
                >
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Executive Summary Narrative
                  </Label>
                  <Textarea
                    value={field.state.value || ""}
                    onChange={(e) => {
                      field.handleChange(e.target.value || "");
                      handleFieldChange("description");
                    }}
                    className="rounded-xl text-xs font-medium border-border/60 min-h-25 leading-relaxed"
                  />
                </FormFieldWrapper>
              )}
            </form.Field>
          </CardContent>
        </Card>

        {/* Area of Interests */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-serif">
              Areas of Interest / Professional Expertise
            </CardTitle>
            <CardDescription className="text-[11px]">
              Technical domains, research areas, and professional interests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form.Field name="interests">
              {(field) => (
                <FormFieldWrapper
                  fieldName="interests"
                  hasError={field.state.meta.errors.length > 0}
                >
                  <InterestsTags field={field} />
                </FormFieldWrapper>
              )}
            </form.Field>
          </CardContent>
        </Card>

        <ErrorSummaryBanner
          errors={errorSummary}
          onErrorClick={scrollToField}
        />

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
