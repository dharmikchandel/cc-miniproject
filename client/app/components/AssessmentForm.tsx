"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { assessmentSchema, AssessmentInput } from "../schemas/assessment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function AssessmentForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AssessmentInput>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      organizationName: "",
      industry: "",
      budgetLevel: "medium",
      securityLevel: "high",
      complianceLevel: "medium",
      collaborationLevel: "medium",
      portabilityNeed: "medium",
      controlNeed: "high",
      teamSize: "medium",
    },
  });

  async function onSubmit(values: AssessmentInput) {
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit assessment");
      }

      router.push(`/results/${data.data.recommendationId}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit assessment");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="panel-glow overflow-visible">
      <CardContent className="p-6 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-primary/20">
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-primary/20">
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="Finance, Tech, Healthcare..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budgetLevel"
                render={({ field }) => (
                  <FormItem className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-primary/20">
                    <FormLabel>Budget Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="securityLevel"
                render={({ field }) => (
                  <FormItem className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-primary/20">
                    <FormLabel>Security & Privacy Need</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select security level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="complianceLevel"
                render={({ field }) => (
                  <FormItem className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-primary/20">
                    <FormLabel>Regulatory Compliance Strategy</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select compliance severity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collaborationLevel"
                render={({ field }) => (
                  <FormItem className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-primary/20">
                    <FormLabel>External Collaboration Need</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select collaboration level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Internal Only (Low)</SelectItem>
                        <SelectItem value="medium">Some Partners (Medium)</SelectItem>
                        <SelectItem value="high">Open to Ecosystem (High)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="portabilityNeed"
                render={({ field }) => (
                  <FormItem className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-primary/20">
                    <FormLabel>Data & Workload Portability Need</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select portability need" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Vendor Lock-in Acceptable (Low)</SelectItem>
                        <SelectItem value="medium">Standard Interfaces (Medium)</SelectItem>
                        <SelectItem value="high">Must Move Freely (High)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="controlNeed"
                render={({ field }) => (
                  <FormItem className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-primary/20">
                    <FormLabel>In-house Control & Management Need</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select control need" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Fully Managed (Low)</SelectItem>
                        <SelectItem value="medium">Co-managed (Medium)</SelectItem>
                        <SelectItem value="high">Full Control (High)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-primary/20">
                    <FormLabel>IT Team Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="small">Small (1-10)</SelectItem>
                        <SelectItem value="medium">Medium (11-50)</SelectItem>
                        <SelectItem value="large">Large (50+)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {error && <div className="rounded-2xl border border-[rgba(255,93,122,0.24)] bg-[rgba(255,93,122,0.12)] px-4 py-3 font-mono text-sm text-risk">{error}</div>}

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isSubmitting} className="min-w-56">
                {isSubmitting ? "Processing..." : "Generate Recommendation"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
