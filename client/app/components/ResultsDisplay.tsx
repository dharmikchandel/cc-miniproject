"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ResultsDisplay({ id }: { id: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await fetch(`http://localhost:3001/api/results/${id}`);
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

  if (loading) return <div className="text-center p-10 font-mono text-muted-foreground animate-pulse">Computing Recommendation...</div>;
  if (!data) return <div className="text-center p-10 text-risk">Recommendation not found.</div>;

  const primaryModel = JSON.parse(data.primaryModel);
  const secondaryModels = JSON.parse(data.secondaryModels);
  const axisScores = JSON.parse(data.axisScores);

  // Map axis scores from [-1, 1] to [0, 100] for radar chart
  const radarData = [
    { subject: 'Internal vs External (-Ext/+Int)', A: ((axisScores.internalExternal + 1) / 2) * 100 },
    { subject: 'Proprietary vs Open (-Opn/+Pro)', A: ((axisScores.proprietaryOpen + 1) / 2) * 100 },
    { subject: 'Perimeter vs De-perimeter (-De/+Per)', A: ((axisScores.perimeter + 1) / 2) * 100 },
    { subject: 'Insourced vs Outsourced (-Out/+Ins)', A: ((axisScores.sourcing + 1) / 2) * 100 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content Area */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Recommendation Card */}
        <Card className="bg-bg-1 border-primary-neon/50 shadow-[0_0_20px_var(--color-neon-glow)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary-neon" />
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardDescription className="text-primary-neon font-mono mb-2 track-widest uppercase text-xs">Primary Recommendation</CardDescription>
                <CardTitle className="text-3xl text-white">{primaryModel.name}</CardTitle>
              </div>
              <Badge variant="outline" className="text-safe border-safe font-mono text-lg py-1 px-3 bg-safe/10">
                {Math.round(data.confidenceScore)}% Match
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {data.explanation}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
               <div>
                  <h4 className="text-sm font-semibold text-safe flex items-center mb-2"><CheckCircle2 className="w-4 h-4 mr-2"/> Strengths</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                    {primaryModel.pros.map((pro: string, i: number) => <li key={i}>{pro}</li>)}
                  </ul>
               </div>
               <div>
                  <h4 className="text-sm font-semibold text-tradeoff flex items-center mb-2"><ShieldAlert className="w-4 h-4 mr-2"/> Trade-offs</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                    {primaryModel.cons.map((con: string, i: number) => <li key={i}>{con}</li>)}
                  </ul>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Table */}
        <Card className="bg-bg-1 border-border">
          <CardHeader>
            <CardTitle>Model Comparison</CardTitle>
            <CardDescription>How other business models stack up against your requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Model Name</TableHead>
                  <TableHead>Match %</TableHead>
                  <TableHead>Primary Trade-off</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {secondaryModels.map((model: any, idx: number) => (
                  <TableRow key={idx} className="border-border">
                    <TableCell className="font-medium text-white">{model.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono bg-bg-2 text-muted-foreground">{Math.round(model.confidence)}%</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{model.cons[0]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Right Insight Panel */}
      <div className="space-y-8">
        <Card className="bg-bg-1 border-border">
          <CardHeader>
            <CardTitle className="text-lg">CCM Visualization</CardTitle>
            <CardDescription>Your organization's position across the 4 Cloud Cube dimensions mapped to 0-100 scales.</CardDescription>
          </CardHeader>
          <CardContent className="h-64 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#2e384d" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#8b9bb4', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Organization" dataKey="A" stroke="#2F80FF" fill="#2F80FF" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#10151d', borderColor: '#1a2130' }} itemStyle={{ color: '#2F80FF' }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-bg-1 border-border">
           <CardHeader>
             <CardTitle className="text-lg">Inputs Snapshot</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                <div>
                   <div className="text-muted-foreground text-xs">Security Need</div>
                   <div className="text-white capitalize">{data.assessment.securityLevel}</div>
                </div>
                <div>
                   <div className="text-muted-foreground text-xs">Budget Level</div>
                   <div className="text-white capitalize">{data.assessment.budgetLevel}</div>
                </div>
                <div>
                   <div className="text-muted-foreground text-xs">Control Need</div>
                   <div className="text-white capitalize">{data.assessment.controlNeed}</div>
                </div>
                <div>
                   <div className="text-muted-foreground text-xs">Portability</div>
                   <div className="text-white capitalize">{data.assessment.portabilityNeed}</div>
                </div>
             </div>
           </CardContent>
        </Card>
      </div>

    </div>
  );
}
