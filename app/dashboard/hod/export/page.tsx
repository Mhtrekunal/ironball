'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FileSpreadsheet, 
  FileJson, 
  FileText, 
  Download, 
  CheckCircle2, 
  Loader2,
  Settings2,
  Layers,
  Sparkles,
  Table as TableIcon,
  Info
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { NAAC_CRITERIA } from '@/lib/constants';

export default function ConsolidatedExportPage() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = () => {
    setIsExporting(true);
    setProgress(0);
    
    toast({
      title: "Generating Consolidated Workbook",
      description: "Aggregating data from 24 faculty profiles...",
    });

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            toast({
              title: "Consolidation Complete",
              description: "The 8-sheet NAAC Audit Workbook (Summary + 7 Criteria) has been downloaded.",
            });
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Consolidated Export Hub</h1>
          <p className="text-muted-foreground">Aggregate institutional-level data for final NAAC audit submission.</p>
        </div>
        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-4 py-1">
          Academic Year 2023-24
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Export Card */}
        <Card className="md:col-span-2 border-secondary/20 shadow-xl shadow-secondary/5 relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 p-6">
            <Sparkles className="w-8 h-8 text-secondary/20 animate-pulse" />
          </div>
          <CardHeader className="pb-8">
            <div className="bg-secondary p-4 rounded-3xl w-fit mb-6 shadow-lg shadow-secondary/20">
              <FileSpreadsheet className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl">NAAC Institutional Audit Workbook</CardTitle>
            <CardDescription className="text-base">
              A professionally formatted Excel workbook containing 8 sheets: Institutional Summary + 7 Criteria tabs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4 bg-muted/30 p-4 rounded-2xl border">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Info className="w-3 h-3" /> Core Contents
                </h4>
                <ul className="space-y-3">
                  {[
                    'Consolidated DVV Sheet',
                    'Metric-wise Detailed Breakdown',
                    'Departmental Progress Heatmap',
                    'Hyperlinked Evidence Bank'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4 bg-muted/30 p-4 rounded-2xl border">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <TableIcon className="w-3 h-3" /> Workbook Structure
                </h4>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold bg-white p-2 rounded border-l-4 border-l-secondary flex justify-between">
                    <span>Sheet 1: Summary</span>
                    <span className="text-muted-foreground italic">Institutional Overview</span>
                  </div>
                  <div className="text-[10px] font-bold bg-white p-2 rounded border-l-4 border-l-primary flex justify-between">
                    <span>Sheets 2-8: Criteria 1-7</span>
                    <span className="text-muted-foreground italic">Consolidated Data</span>
                  </div>
                </div>
              </div>
            </div>

            {isExporting && (
              <div className="space-y-3 animate-in fade-in zoom-in-95 p-4 bg-secondary/5 rounded-xl border border-secondary/20">
                <div className="flex justify-between text-xs font-bold text-secondary uppercase tracking-wider">
                  <span>Compiling Institutional Data...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2.5 bg-secondary/10" />
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-muted/30 py-6 flex flex-col gap-4 border-t">
            <Button 
              className="w-full h-12 bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20 text-base font-bold transition-all"
              disabled={isExporting}
              onClick={handleExport}
            >
              {isExporting ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : <Download className="w-5 h-5 mr-3" />}
              Generate Full Institutional Report
            </Button>
            <div className="flex items-center justify-between w-full px-2">
               <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                Last Sync: Today, 09:30 AM
              </p>
              <Badge variant="outline" className="text-[9px] bg-green-50 text-green-600 border-green-200">
                All 24 Faculty Synced
              </Badge>
            </div>
          </CardFooter>
        </Card>

        {/* Sidebar Options */}
        <div className="space-y-6">
          <Card className="border-accent shadow-sm">
            <CardHeader className="pb-4">
              <div className="bg-primary/10 p-2.5 rounded-xl w-fit mb-3">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Consolidated SSR</CardTitle>
              <CardDescription className="text-xs">Self Study Report narratives aggregation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="bg-accent/30 rounded-xl p-4 space-y-4">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                   <Settings2 className="w-4 h-4" /> Export Config
                 </div>
                 <div className="space-y-3">
                   {[
                     { label: 'Include AI Summaries', enabled: true },
                     { label: 'Append Evidence Index', enabled: true },
                     { label: 'Departmental Rankings', enabled: false },
                   ].map((opt, i) => (
                     <div key={i} className="flex items-center justify-between">
                       <span className="text-xs text-muted-foreground font-medium">{opt.label}</span>
                       <div className={`w-8 h-4 rounded-full p-0.5 transition-colors cursor-pointer ${opt.enabled ? 'bg-primary' : 'bg-muted'}`}>
                         <div className={`w-3 h-3 bg-white rounded-full transition-transform ${opt.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
               <Button variant="outline" className="w-full h-9 text-xs font-bold border-primary/20 hover:bg-primary/5 text-primary">
                 Export PDF Draft
               </Button>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Layers className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Data Hub Status</h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed mt-1">
                  All criteria data is automatically synchronized from 24 faculty members. 
                </p>
              </div>
              <Button variant="link" className="text-primary text-[10px] h-auto p-0 font-bold uppercase tracking-wider">
                Review Sync Logs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
