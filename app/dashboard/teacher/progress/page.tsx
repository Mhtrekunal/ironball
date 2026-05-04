'use client';

import { NAAC_CRITERIA } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Download,
  ShieldCheck,
  AlertCircle,
  FilePieChart
} from 'lucide-react';
import Link from 'next/link';

export default function MyProgressPage() {
  const mockSubProgress: Record<string, 'done' | 'pending' | 'revision'> = {
    '1.1.1': 'done',
    '1.2.1': 'pending',
    '1.3.1': 'done',
    '2.1.1': 'done',
    '2.2.1': 'revision',
    '2.5.1': 'pending',
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">My Submission Progress</h1>
          <p className="text-muted-foreground">Detailed breakdown of your contributions across all sub-criteria.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/teacher/reports">
            <Button variant="outline" className="shadow-sm">
              <FilePieChart className="w-4 h-4 mr-2 text-primary" /> View Formatted Reports
            </Button>
          </Link>
          <Button variant="secondary" className="shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Export Progress Log
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {NAAC_CRITERIA.map((criterion, idx) => {
          const progress = [80, 45, 100, 30, 90, 10, 60][idx];
          return (
            <Card key={criterion.id} className="border-accent overflow-hidden">
              <CardHeader className="bg-accent/10 py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg">
                    {criterion.number}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{criterion.title}</CardTitle>
                    <CardDescription className="text-xs">Overall completion: {progress}%</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:block w-32">
                    <Progress value={progress} className="h-1.5" />
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/teacher/criteria/${criterion.id}`}>
                      Resume <ChevronRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-x divide-y border-t">
                  {criterion.subCriteria.map((sub) => {
                    const status = mockSubProgress[sub.id] || 'pending';
                    return (
                      <div key={sub.id} className="p-4 hover:bg-accent/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-mono text-[10px] font-bold text-primary px-1.5 py-0.5 bg-primary/10 rounded">{sub.id}</span>
                          {status === 'done' ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-2 py-0 text-[10px]">
                              <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                            </Badge>
                          ) : status === 'revision' ? (
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none px-2 py-0 text-[10px]">
                              <AlertCircle className="w-3 h-3 mr-1" /> Revision
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="px-2 py-0 text-[10px] text-muted-foreground border-dashed">
                              <Circle className="w-2 h-2 mr-1" /> Incomplete
                            </Badge>
                          )}
                        </div>
                        <h4 className="text-sm font-bold truncate mb-1">{sub.title}</h4>
                        <p className="text-[10px] text-muted-foreground line-clamp-2">{sub.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
