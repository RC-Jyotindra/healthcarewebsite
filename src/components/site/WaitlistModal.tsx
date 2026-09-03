"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitWaitlistForm, getPanelSchema } from "@/lib/api/panel.functions";
import { waitlistSchema, type WaitlistInput, type PanelField } from "@/lib/api/panel.schema";
import { toast } from "sonner";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  panelId?: string;
}

export function WaitlistModal({
  open,
  onOpenChange,
  panelId = "caddee1a-877e-4fa2-92c0-ecda289116be",
}: WaitlistModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [schemaFields, setSchemaFields] = useState<PanelField[]>([]);
  const [isLoadingSchema, setIsLoadingSchema] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const maxSchemaStep =
    schemaFields.length > 0
      ? Math.max(...schemaFields.map((f) => f.stepIndex || 0))
      : 0;
  const totalSteps = Math.max(1, maxSchemaStep + 1);

  const form = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      properties: {},
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (open) {
      setCurrentStep(0);
      if (panelId) {
        setIsLoadingSchema(true);
        getPanelSchema({ data: { panelId } })
          .then((res) => {
            setSchemaFields(res?.fields || []);
          })
          .catch((err) => {
            console.error("Failed to fetch schema:", err);
            toast.error("Failed to load form fields");
          })
          .finally(() => {
            setIsLoadingSchema(false);
          });
      }
    } else {
      setCurrentStep(0);
    }
  }, [open, panelId]);

  const handleNextStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    let fieldsToValidate: string[] = [];
    if (currentStep === 0) {
      fieldsToValidate = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "password",
        "confirmPassword",
      ];
    }
    schemaFields.forEach((field) => {
      if ((field.stepIndex || 0) === currentStep) {
        fieldsToValidate.push(`properties.${field.key}`);
      }
    });

    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  async function onSubmit(data: WaitlistInput) {
    try {
      setIsSubmitting(true);
      const res = await submitWaitlistForm({ data: { panelId, formData: data } });
      if (res && !res.success) {
        throw new Error(res.error || "Failed to submit form");
      }
      toast.success("Success! You have been added to the Medexa waitlist.");
      form.reset();
      setCurrentStep(0);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const getFieldColSpanClass = (key: string) => {
    const fullWidthFields = [
      "education_level",
      "employment_status",
      "email",
      "primaryworkplacename",
      "specialty",
      "medicallicensenumber",
    ];
    if (fullWidthFields.includes(key.toLowerCase())) {
      return "col-span-1 sm:col-span-2";
    }
    return "col-span-1";
  };

  const renderCustomField = (field: PanelField) => {
    if ((field.stepIndex || 0) !== currentStep) return null;

    const isStandardField = ["firstName", "lastName", "email", "phone"].includes(
      field.key
    );
    if (isStandardField) return null;

    return (
      <div key={field.key} className={getFieldColSpanClass(field.key)}>
        <FormField
          control={form.control}
          name={`properties.${field.key}` as any}
          render={({ field: formField }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-xs uppercase tracking-wider font-semibold text-foreground">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormControl>
                {(() => {
                  switch (field.type) {
                    case "TEXT":
                    case "EMAIL":
                      return (
                        <Input
                          placeholder={field.label}
                          required={field.required}
                          className="h-10 w-full"
                          {...formField}
                          value={formField.value || ""}
                        />
                      );
                    case "NUMBER":
                      return (
                        <Input
                          type="number"
                          placeholder={field.label}
                          required={field.required}
                          className="h-10 w-full"
                          {...formField}
                          value={formField.value || ""}
                        />
                      );
                    case "DATE":
                      return (
                        <Input
                          type="date"
                          required={field.required}
                          className="h-10 w-full"
                          {...formField}
                          value={formField.value || ""}
                        />
                      );
                    case "SINGLE_SELECT":
                      return (
                        <Select
                          onValueChange={formField.onChange}
                          value={formField.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full h-10 px-3 flex justify-between items-center">
                              <SelectValue placeholder={`Select ${field.label}`} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[200px]">
                            {field.options?.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      );
                    case "MULTI_SELECT":
                      return (
                        <Input
                          placeholder="Comma separated values"
                          required={field.required}
                          className="h-10 w-full"
                          {...formField}
                          value={formField.value || ""}
                        />
                      );
                    case "TRUE_FALSE":
                      return (
                        <div className="flex items-center space-x-2.5 mt-2 h-10">
                          <Checkbox
                            id={field.key}
                            checked={!!formField.value}
                            onCheckedChange={formField.onChange}
                          />
                          <label
                            htmlFor={field.key}
                            className="text-xs font-semibold uppercase tracking-wider cursor-pointer select-none"
                          >
                            {field.label}
                          </label>
                        </div>
                      );
                    default:
                      return (
                        <Input
                          placeholder={field.label}
                          required={field.required}
                          className="h-10 w-full"
                          {...formField}
                          value={formField.value || ""}
                        />
                      );
                  }
                })()}
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="mb-2">
          <div className="flex justify-between items-center gap-4">
            <DialogTitle className="text-2xl font-montserrat font-bold uppercase tracking-tight">
              Join Medexa Waitlist
            </DialogTitle>
            {totalSteps > 1 && (
              <span className="text-xs font-semibold tracking-wider uppercase shrink-0 bg-[#F4EFE6] text-[#111C24] px-3 py-1 rounded-full">
                Step {currentStep + 1} of {totalSteps}
              </span>
            )}
          </div>
          <DialogDescription className="text-muted-foreground text-sm mt-1">
            Provide your details below to apply to our clinical intelligence network.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              {currentStep === 0 && (
                <>
                  {/* First Name */}
                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-xs uppercase tracking-wider font-semibold">
                            First Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="John" required className="h-10" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-xs uppercase tracking-wider font-semibold">
                            Last Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" required className="h-10" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email Address */}
                  <div className="col-span-1 sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-xs uppercase tracking-wider font-semibold">
                            Email Address <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john.doe@hospital.edu"
                              required
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="col-span-1 sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-xs uppercase tracking-wider font-semibold">
                            Phone Number <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              required
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Password */}
                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-xs uppercase tracking-wider font-semibold">
                            Password <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              required
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-xs uppercase tracking-wider font-semibold">
                            Confirm Password <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              required
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {/* Dynamic / Custom Fields */}
              {isLoadingSchema ? (
                <div className="col-span-1 sm:col-span-2 text-sm text-muted-foreground py-6 flex items-center justify-center">
                  Loading additional fields...
                </div>
              ) : (
                schemaFields.map(renderCustomField)
              )}
            </div>

            {/* Navigation / Actions */}
            <div className="pt-4 flex justify-between items-center border-t border-border">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting || isLoadingSchema}
                  className="rounded-full bg-secondary px-6 py-2.5 text-sm font-medium text-secondary-foreground transition hover:opacity-90 disabled:opacity-50"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={isLoadingSchema}
                  className="rounded-full bg-ink px-8 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || isLoadingSchema}
                  className="rounded-full bg-primary px-8 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
