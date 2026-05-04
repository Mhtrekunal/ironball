'use client';

import { useParams, useRouter } from 'next/navigation';
import { NAAC_CRITERIA } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  FileUp, 
  CheckCircle2, 
  Lightbulb, 
  Loader2,
  FileText,
  Info
} from 'lucide-react';
import { useState } from 'react';
import { teacherAIContentGuidance } from '@/ai/flows/teacher-ai-content-guidance-flow';
import { teacherAIDocumentSuggestion } from '@/ai/flows/teacher-ai-document-suggestion';
import { useToast } from '@/hooks/use-toast';

export default function CriterionFormPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const criterion = NAAC_CRITERIA.find(c => c.id === params.id);
  
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isAiLoading, setIsAiLoading] = useState<string | null>(null);
  const [aiGuidance, setAiGuidance] = useState<Record<string, string>>({});
  const [suggestedDocs, setSuggestedDocs] = useState<Record<string, string[]>>({});

  if (!criterion) return <div>Criterion not found</div>;

  const handleInputChange = (subId: string, value: string) => {
    setFormData(prev => ({ ...prev, [subId]: value }));
  };

  const getAiGuidance = async (subId: string) => {
    if (!formData[subId]) {
      toast({ title: "Content required", description: "Please enter some content before asking for AI guidance." });
      return;
    }

    setIsAiLoading(subId);
    try {
      const result = await teacherAIContentGuidance({
        criterionId: criterion.id,
        subCriterionId: subId,
        currentContent: formData[subId]
      });
      setAiGuidance(prev => ({ ...prev, [subId]: result.guidance }));
      
      const docs = await teacherAIDocumentSuggestion({
        formContent: formData[subId]
      });
      setSuggestedDocs(prev => ({ ...prev, [subId]: docs.suggestedDocuments }));
      
      toast({ title: "AI Assistant", description: "Guidance and document suggestions updated." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to get AI assistance." });
    } finally {
      setIsAiLoading(null);
    }
  };

  const saveForm = () => {
    toast({ title: "Success", description: "Criterion data saved successfully." });
    router.push('/dashboard/teacher');
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md py-4 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">Criterion {criterion.number}</Badge>
              <h1 className="text-2xl font-bold tracking-tight">{criterion.title}</h1>
            </div>
            <p className="text-sm text-muted-foreground">{criterion.description}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={saveForm}>
            <Save className="w-4 h-4 mr-2" /> Save Draft
          </Button>
          <Button onClick={saveForm} className="shadow-lg shadow-primary/20">
            Submit for Review
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {criterion.subCriteria.map((sub) => (
            <Card key={sub.id} className="border-accent-foreground/5 shadow-sm overflow-hidden group focus-within:border-primary/40 transition-all">
              <CardHeader className="bg-accent/10 border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="text-primary font-bold">{sub.id}</span>
                      {sub.title}
                    </CardTitle>
                    <CardDescription className="mt-1">{sub.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-white">Metric</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-3">
                  <Label htmlFor={sub.id} className="text-sm font-semibold text-muted-foreground flex items-center justify-between">
                    Response / Narrative Content
                    <span className="text-[10px] font-normal italic">Max 500 words</span>
                  </Label>
                  {sub.fieldType === 'text' ? (
                    <Textarea 
                      id={sub.id} 
                      placeholder="Enter detailed description and qualitative response..."
                      className="min-h-[180px] text-base leading-relaxed resize-none focus-visible:ring-primary/30"
                      value={formData[sub.id] || ''}
                      onChange={(e) => handleInputChange(sub.id, e.target.value)}
                    />
                  ) : (
                    <div className="p-4 border-2 border-dashed rounded-lg bg-accent/20 flex flex-col items-center justify-center text-center space-y-3 py-10">
                      <div className="p-3 bg-white rounded-full shadow-sm">
                        <FileUp className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Upload Supporting Evidence</p>
                        <p className="text-xs text-muted-foreground">PDF, XLSX or DOCX up to 10MB</p>
                      </div>
                      <Button size="sm" variant="outline">Browse Files</Button>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="rounded-full px-4 text-xs font-bold"
                    onClick={() => getAiGuidance(sub.id)}
                    disabled={isAiLoading === sub.id}
                  >
                    {isAiLoading === sub.id ? (
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3 mr-2" />
                    )}
                    Get AI Guidance
                  </Button>
                </div>

                {/* AI Guidance Area */}
                {aiGuidance[sub.id] && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <div className="bg-secondary/5 rounded-xl border border-secondary/20 p-5 space-y-3">
                      <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                        <Lightbulb className="w-4 h-4" />
                        NAAC Best Practice Tips
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {aiGuidance[sub.id]}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar / Context Panel */}
        <div className="space-y-6">
          <Card className="sticky top-24 border-secondary/20 shadow-lg shadow-secondary/5 overflow-hidden">
            <CardHeader className="bg-secondary text-white pb-6">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI Documentation Hub
              </CardTitle>
              <CardDescription className="text-secondary-foreground/80">
                Suggested evidence for your responses
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {criterion.subCriteria.map(sub => (
                  <div key={sub.id} className="space-y-3">
                    <h4 className="text-xs font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
                      <span className="w-5 h-5 rounded bg-muted flex items-center justify-center text-[10px]">{sub.id}</span>
                      Evidence Suggestions
                    </h4>
                    {suggestedDocs[sub.id] ? (
                      <ul className="space-y-2">
                        {suggestedDocs[sub.id].map((doc, i) => (
                          <li key={i} className="text-sm flex items-start gap-2 bg-accent/30 p-2.5 rounded-lg border border-accent">
                            <FileText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground font-medium">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs italic text-muted-foreground px-1">
                        Use the "Get AI Guidance" button on the form to see suggested documents here.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-accent/30 border-t py-4">
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <Info className="w-3 h-3" />
                AI analysis is based on official NAAC guidelines.
              </div>
            </CardFooter>
          </Card>

          <Card className="border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Quality Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'Narrative within word limit',
                'Quantitative data matched',
                'Relevant geo-tagged photos',
                'Link to institutional website',
                'Document names strictly formatted'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded border border-primary/30 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary/20 opacity-0 hover:opacity-100 cursor-pointer"></div>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}