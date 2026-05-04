'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Download, 
  Eye, 
  FileCheck, 
  Calendar, 
  User, 
  Building,
  CheckCircle2,
  Sparkles,
  Loader2,
  ChevronDown,
  FileSpreadsheet,
  Table as TableIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { NAAC_CRITERIA } from '@/lib/constants';

export default function TeacherReportsPage() {
  const { toast } = useToast();
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleExportPdf = () => {
    setIsExportingPdf(true);
    toast({
      title: "Generating PDF Report",
      description: "Compiling your criteria data and formatting narratives...",
    });

    setTimeout(() => {
      setIsExportingPdf(false);
      toast({
        title: "Export Successful",
        description: "Your NAAC Individual Self-Assessment Report (SAR) has been downloaded.",
      });
    }, 2000);
  };

  const handleExportExcel = () => {
    setIsExportingExcel(true);
    toast({
      title: "Generating Excel Workbook",
      description: "Creating 8 sheets: Summary + 7 Criteria tabs...",
    });

    setTimeout(() => {
      setIsExportingExcel(false);
      toast({
        title: "Excel Export Complete",
        description: "Workbook with 8 sheets (Summary + 7 Criteria) downloaded.",
      });
    }, 2500);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Reports & Export</h1>
          <p className="text-muted-foreground">Generate formatted NAAC-ready reports and data workbooks from your entries.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="w-4 h-4 mr-2" /> 
            {showPreview ? 'Close Preview' : 'Preview Report'}
          </Button>
          <Button 
            variant="secondary"
            className="shadow-md"
            onClick={handleExportExcel}
            disabled={isExportingExcel}
          >
            {isExportingExcel ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileSpreadsheet className="w-4 h-4 mr-2" />}
            Export Excel (8 Sheets)
          </Button>
          <Button 
            className="bg-primary shadow-lg shadow-primary/20" 
            onClick={handleExportPdf}
            disabled={isExportingPdf}
          >
            {isExportingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
            Export PDF SAR
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Settings */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-accent">
            <CardHeader>
              <CardTitle className="text-lg">Workbook Structure</CardTitle>
              <CardDescription>Excel Export includes 8 dedicated tabs</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y text-sm">
                <div className="p-3 px-6 flex items-center justify-between bg-muted/30">
                  <span className="font-bold">Sheet 1: Institutional Summary</span>
                  <Badge variant="outline">Overview</Badge>
                </div>
                {NAAC_CRITERIA.map((c) => (
                  <div key={c.id} className="p-3 px-6 flex items-center justify-between hover:bg-accent/5 transition-colors">
                    <span className="text-muted-foreground font-medium">Sheet {c.number + 1}: Criterion {c.number}</span>
                    <TableIcon className="w-3 h-3 text-primary/40" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t py-4">
              <p className="text-[10px] text-muted-foreground leading-tight">
                Each sheet includes sub-metric narratives, quantitative data, and hyperlinked evidence references.
              </p>
            </CardFooter>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
                <Sparkles className="w-4 h-4" /> Completion Status
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold">Criteria Filled</span>
                    <span>5 / 7</span>
                  </div>
                  <Progress value={71} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold">Verified Evidence</span>
                    <span>24 / 32</span>
                  </div>
                  <Progress value={75} className="h-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Formatted Preview */}
        <div className="lg:col-span-2">
          <Card className="min-h-[800px] border-accent shadow-xl relative overflow-hidden bg-white">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
            
            <CardContent className="p-12 space-y-10 font-serif">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-6">
                   <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                     <FileCheck className="w-10 h-10 text-primary" />
                   </div>
                </div>
                <h2 className="text-2xl font-bold uppercase tracking-widest text-primary">Individual Self-Assessment Report</h2>
                <div className="flex flex-col items-center gap-1">
                  <Badge variant="outline" className="rounded-none border-primary/30 text-primary px-4 py-1">Academic Year: 2023-2024</Badge>
                  <p className="text-muted-foreground text-sm font-sans mt-2 italic">Generated via NAAC Flow Intelligent Framework</p>
                </div>
              </div>

              {/* Faculty Info Section */}
              <div className="grid grid-cols-2 gap-8 border-y py-6 font-sans">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
                    <User className="w-3 h-3" /> Faculty Details
                  </div>
                  <div>
                    <p className="text-lg font-bold">Dr. Sarah Wilson</p>
                    <p className="text-sm text-muted-foreground">Assistant Professor</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
                    <Building className="w-3 h-3" /> Institutional Info
                  </div>
                  <div>
                    <p className="text-sm font-bold">Computer Science Department</p>
                    <p className="text-sm text-muted-foreground">Faculty ID: INSTIT-CS-442</p>
                  </div>
                </div>
              </div>

              {/* Criteria Content */}
              <div className="space-y-12 font-sans">
                {NAAC_CRITERIA.slice(0, 2).map((criterion) => (
                  <div key={criterion.id} className="space-y-6">
                    <div className="flex items-center gap-4">
                       <span className="text-3xl font-black text-primary/20">0{criterion.number}</span>
                       <h3 className="text-xl font-bold border-l-4 border-primary pl-4">{criterion.title}</h3>
                    </div>
                    
                    <div className="space-y-8 pl-8">
                      {criterion.subCriteria.map((sub) => (
                        <div key={sub.id} className="space-y-3">
                          <div className="flex items-center justify-between bg-muted/30 p-2 px-4 rounded-md">
                            <span className="text-xs font-bold text-primary uppercase font-mono">{sub.id}</span>
                            <span className="text-[10px] font-bold text-green-600 uppercase flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Verified
                            </span>
                          </div>
                          <p className="font-bold text-sm">{sub.title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {sub.description} The department has implemented a robust mechanism for {sub.title.toLowerCase()} which ensures high-quality student outcomes. Detailed logs and evidence are maintained in the central repository.
                          </p>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-primary/60 border-t pt-2 mt-4">
                            <FileText className="w-3 h-3" /> Evidence Ref: SAR-2024-{sub.id}-V1.PDF
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-10 border-t text-[10px] flex justify-between text-muted-foreground font-sans uppercase tracking-[0.2em]">
                <span>NAAC FLOW SAR REPORT</span>
                <span>CONFIDENTIAL • PAGE 1 OF 12</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date().toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
