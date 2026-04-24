"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type RecommendationSummary = {
  id: string;
  primaryModel: string;
};

type AssessmentHistoryItem = {
  id: string;
  organizationName: string;
  industry: string;
  createdAt: string;
  recommendation?: RecommendationSummary | null;
};

export default function DashboardPage() {
  const [assessments, setAssessments] = useState<AssessmentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssessments() {
      try {
        const response = await fetch("http://localhost:5000/api/assessments");
        const data = await response.json();
        if (data.success) {
          setAssessments(data.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAssessments();
  }, []);

  return (
    <div className="app-shell">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-4">
            <div className="eyebrow">Operations Archive</div>
            <h1 className="section-heading">Assessment History</h1>
            <p className="section-subtext">
              View past cloud strategy evaluations.
            </p>
          </div>
          <Link href="/assess">
            <Button>New Assessment</Button>
          </Link>
        </div>

        <Card className="panel-glow">
          <CardHeader className="border-b border-white/8 pb-6">
            <CardTitle className="text-xl">Recent Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-10 text-center text-sm font-mono text-muted-foreground animate-pulse">Loading...</div>
            ) : assessments.length === 0 ? (
              <div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-10 text-center text-sm text-muted-foreground">No assessments found. Run your first evaluation.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Recommended Model</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments.map((assessment) => {
                    const rec = assessment.recommendation;
                    const model = rec ? JSON.parse(rec.primaryModel) : null;

                    return (
                      <TableRow key={assessment.id}>
                        <TableCell className="font-medium text-white">{assessment.organizationName}</TableCell>
                        <TableCell className="text-muted-foreground">{assessment.industry}</TableCell>
                        <TableCell className="text-muted-foreground">{new Date(assessment.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {model ? <Badge variant="outline" className="status-success">{model.name}</Badge> : "-"}
                        </TableCell>
                        <TableCell>
                          {rec && (
                            <Link href={`/results/${rec.id}`}>
                              <Button variant="link" className="px-0 text-primary">View Results</Button>
                            </Link>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
