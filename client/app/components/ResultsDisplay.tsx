"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, ShieldAlert } from "lucide-react";

type RankedModel = {
  name: string;
  confidence: number;
  cons: string[];
};

type PrimaryModel = {
  name: string;
  pros: string[];
  cons: string[];
};

type AxisScores = {
  internalExternal: number;
  proprietaryOpen: number;
  perimeter: number;
  sourcing: number;
};

type ResultData = {
  primaryModel: string;
  secondaryModels: string;
  axisScores: string;
  confidenceScore: number;
  explanation: string;
  assessment: {
    securityLevel: string;
    budgetLevel: string;
    controlNeed: string;
    portabilityNeed: string;
  };
};

export default function ResultsDisplay({ id }: { id: string }) {
  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await fetch(`http://localhost:5000/api/results/${id}`);
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchResult();
  }, [id]);

  if (loading) return <div className="app-panel p-10 text-center font-mono text-muted-foreground animate-pulse">Computing Recommendation...</div>;
  if (!data) return <div className="app-panel p-10 text-center text-risk">Recommendation not found.</div>;

  const primaryModel = JSON.parse(data.primaryModel) as PrimaryModel;
  const secondaryModels = JSON.parse(data.secondaryModels) as RankedModel[];
  const axisScores = JSON.parse(data.axisScores) as AxisScores;

  const radarData = [
    { subject: "Internal vs External (-Ext/+Int)", A: ((axisScores.internalExternal + 1) / 2) * 100 },
    { subject: "Proprietary vs Open (-Opn/+Pro)", A: ((axisScores.proprietaryOpen + 1) / 2) * 100 },
    { subject: "Perimeter vs De-perimeter (-De/+Per)", A: ((axisScores.perimeter + 1) / 2) * 100 },
    { subject: "Insourced vs Outsourced (-Out/+Ins)", A: ((axisScores.sourcing + 1) / 2) * 100 },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        <Card className="panel-glow relative overflow-hidden border-primary/30">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <CardHeader className="border-b border-white/8 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardDescription className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Primary Recommendation</CardDescription>
                <CardTitle className="text-3xl text-white sm:text-4xl">{primaryModel.name}</CardTitle>
              </div>
              <Badge variant="outline" className="status-success px-4 py-2 text-base font-semibold sm:text-lg">
                {Math.round(data.confidenceScore)}% Match
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              {data.explanation}
            </p>
            <div className="grid gap-4 border-t border-white/8 pt-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[rgba(25,230,140,0.18)] bg-[rgba(25,230,140,0.06)] p-5">
                <h4 className="mb-3 flex items-center text-sm font-semibold text-[var(--color-safe)]"><CheckCircle2 className="mr-2 h-4 w-4" /> Strengths</h4>
                <ul className="ml-5 list-disc space-y-2 text-sm leading-6 text-muted-foreground">
                  {primaryModel.pros.map((pro: string, i: number) => <li key={i}>{pro}</li>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-[rgba(248,195,74,0.18)] bg-[rgba(248,195,74,0.06)] p-5">
                <h4 className="mb-3 flex items-center text-sm font-semibold text-[var(--color-tradeoff)]"><ShieldAlert className="mr-2 h-4 w-4" /> Trade-offs</h4>
                <ul className="ml-5 list-disc space-y-2 text-sm leading-6 text-muted-foreground">
                  {primaryModel.cons.map((con: string, i: number) => <li key={i}>{con}</li>)}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="panel-glow">
          <CardHeader className="border-b border-white/8 pb-6">
            <CardTitle className="text-xl">Model Comparison</CardTitle>
            <CardDescription>How other business models stack up against your requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model Name</TableHead>
                  <TableHead>Match %</TableHead>
                  <TableHead>Primary Trade-off</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {secondaryModels.map((model, idx: number) => {
                  const confidence = Math.round(model.confidence);
                  const badgeClass =
                    confidence >= 80 ? "status-success font-mono" :
                    confidence >= 60 ? "status-warning font-mono" :
                    "status-danger font-mono";

                  return (
                    <TableRow key={idx}>
                      <TableCell className="font-medium text-white">{model.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={badgeClass}>{confidence}%</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{model.cons[0]}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card className="panel-glow">
          <CardHeader className="border-b border-white/8 pb-6">
            <CardTitle className="text-lg">CCM Visualization</CardTitle>
            <CardDescription>Your organization&apos;s position across the 4 Cloud Cube dimensions mapped to 0-100 scales.</CardDescription>
          </CardHeader>
          <CardContent className="h-72 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(120,170,255,0.18)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#9cb2cf", fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Organization" dataKey="A" stroke="#45d7ff" fill="#45d7ff" fillOpacity={0.38} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(11,21,38,0.92)",
                    borderColor: "rgba(69,215,255,0.22)",
                    borderRadius: "16px",
                    color: "#edf7ff",
                  }}
                  itemStyle={{ color: "#45d7ff" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="panel-glow">
          <CardHeader className="border-b border-white/8 pb-6">
            <CardTitle className="text-lg">Inputs Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm font-mono">
              <div className="metric-tile">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Security Need</div>
                <div className="mt-2 text-base capitalize text-white">{data.assessment.securityLevel}</div>
              </div>
              <div className="metric-tile">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Budget Level</div>
                <div className="mt-2 text-base capitalize text-white">{data.assessment.budgetLevel}</div>
              </div>
              <div className="metric-tile">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Control Need</div>
                <div className="mt-2 text-base capitalize text-white">{data.assessment.controlNeed}</div>
              </div>
              <div className="metric-tile">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Portability</div>
                <div className="mt-2 text-base capitalize text-white">{data.assessment.portabilityNeed}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
