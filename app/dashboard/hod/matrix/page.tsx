'use client';

import { NAAC_CRITERIA, MOCK_TEACHERS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Filter, Maximize2 } from 'lucide-react';

export default function MatrixOverviewPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Criterion Progress Matrix</h1>
          <p className="text-muted-foreground">Department-wide heatmap of NAAC compliance across all faculty.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
          <Button variant="outline"><Maximize2 className="w-4 h-4 mr-2" /> Fullscreen</Button>
          <Button className="bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20"><Download className="w-4 h-4 mr-2" /> Export Matrix</Button>
        </div>
      </div>

      <Card className="shadow-lg border-accent overflow-hidden">
        <CardHeader className="bg-accent/10 border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Interactive Heatmap</CardTitle>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-red-100"></div> Critical (0-25)</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-amber-100"></div> Improving (26-75)</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-green-100"></div> Compliant (76-100)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-6 font-bold text-sm text-muted-foreground sticky left-0 bg-muted/95 backdrop-blur-sm z-10 border-r w-[250px]">Faculty Member</th>
                  {NAAC_CRITERIA.map(c => (
                    <th key={c.id} className="p-4 font-bold text-xs uppercase text-center border-r min-w-[120px]">
                      <div className="text-primary">{c.id.split('-')[1].toUpperCase()}</div>
                      <div className="text-[8px] font-normal truncate max-w-[100px] mt-1 text-muted-foreground">{c.title}</div>
                    </th>
                  ))}
                  <th className="p-4 font-bold text-xs text-center">Avg %</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TEACHERS.map((teacher) => {
                  const values = Object.values(teacher.progress);
                  const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
                  return (
                    <tr key={teacher.id} className="border-b hover:bg-accent/5 transition-colors">
                      <td className="p-6 sticky left-0 bg-white z-10 border-r">
                        <div className="font-bold text-sm">{teacher.name}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{teacher.department}</div>
                      </td>
                      {values.map((val, idx) => {
                        const intensity = val > 75 ? 'bg-green-500/10 text-green-700 border-green-200' : val > 25 ? 'bg-amber-500/10 text-amber-700 border-amber-200' : 'bg-red-500/10 text-red-700 border-red-200';
                        return (
                          <td key={idx} className="p-4 border-r">
                            <div className={`rounded-xl border h-14 flex flex-col items-center justify-center gap-1 shadow-sm ${intensity}`}>
                              <span className="text-sm font-black">{val}%</span>
                              <div className="w-10 h-1 bg-current opacity-20 rounded-full" />
                            </div>
                          </td>
                        );
                      })}
                      <td className="p-4 text-center">
                        <div className="w-12 h-12 rounded-full border-4 border-primary/10 flex items-center justify-center text-xs font-black text-primary mx-auto">
                          {avg}%
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}