"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [assessments, setAssessments] = useState<any[]>([]);
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
    <div className="container mx-auto py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Assessment History</h1>
              <p className="text-muted-foreground text-lg">
                View past cloud strategy evaluations.
              </p>
            </div>
            <Link href="/assess">
               <Button className="bg-primary-neon text-white hover:bg-blue-600 shadow-[0_0_10px_rgba(47,128,255,0.4)]">New Assessment</Button>
            </Link>
        </div>
        
        <Card className="bg-bg-1 border-border">
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
                <div className="text-muted-foreground text-sm font-mono animate-pulse">Loading...</div>
            ) : assessments.length === 0 ? (
                <div className="text-muted-foreground text-sm">No assessments found. Run your first evaluation.</div>
            ) : (
                <Table>
                <TableHeader>
                    <TableRow className="border-border">
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
                        <TableRow key={assessment.id} className="border-border">
                            <TableCell className="font-medium text-white">{assessment.organizationName}</TableCell>
                            <TableCell className="text-muted-foreground">{assessment.industry}</TableCell>
                            <TableCell className="text-muted-foreground">{new Date(assessment.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                                {model ? <Badge variant="outline" className="text-safe border-safe bg-safe/10">{model.name}</Badge> : '-'}
                            </TableCell>
                            <TableCell>
                                {rec && (
                                   <Link href={`/results/${rec.id}`}>
                                      <Button variant="link" className="text-primary-neon p-0 h-auto">View Results</Button>
                                   </Link>
                                )}
                            </TableCell>
                        </TableRow>
                    )})}
                </TableBody>
                </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
