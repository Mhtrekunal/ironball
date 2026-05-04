'use client';

import { useParams, useRouter } from 'next/navigation';
import { MOCK_TEACHERS, NAAC_CRITERIA } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileText,
  BarChart3,
  MessageSquare,
  Download,
  ExternalLink,
  BellRing,
  ShieldCheck
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock submissions for this teacher
const MOCK_SUBMISSIONS = [
  { id: 'sub1', name: 'Curriculum_Policy_CS.pdf', metric: '1.1.1', date: '2 days ago', size: '2.4 MB' },
  { id: 'sub2', name: 'Student_Seminars_Data.xlsx', metric: '5.1.2', date: '5 days ago', size: '1.1 MB' },
];

export default function TeacherProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const teacher = MOCK_TEACHERS.find(t => t.id === params.id);

  if (!teacher) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold">Teacher not found</h1>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const avgProgress = Object.values(teacher.progress).reduce((a, b) => a + b, 0) / 7;

  const handleDownload = (fileName: string) => {
    toast({
      title: "Initiating Download",
      description: `Fetching ${fileName} from secure storage...`,
    });
    setTimeout(() => {
      toast({
        title: "Download Started",
        description: "The file will appear in your downloads folder shortly.",
      });
    }, 1000);
  };

  const handleVerifyAll = () => {
    toast({
      title: "All Files Verified",
      description: `Confirmation reminder sent to ${teacher.name}.`,
    });
  };

  const handleReminder = () => {
    toast({
      title: "Manual Reminder Sent",
      description: `A progress update request was sent to ${teacher.email}.`,
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Faculty Profile</h1>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" onClick={handleReminder}>
             <BellRing className="w-4 h-4 mr-2" /> Send Reminder
           </Button>
           <Button onClick={handleVerifyAll} className="shadow-lg shadow-primary/20">
             <ShieldCheck className="w-4 h-4 mr-2" /> Verify All Submissions
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="lg:col-span-1 border-accent shadow-lg h-fit">
          <CardContent className="pt-8 flex flex-col items-center text-center space-y-6">
            <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-primary/20">
              {teacher.name[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{teacher.name}</h2>
              <p className="text-muted-foreground font-medium">{teacher.designation}</p>
              <Badge className="mt-2 bg-accent text-primary border-none">{teacher.department}</Badge>
            </div>

            <div className="w-full space-y-3 pt-4 border-t">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span className="truncate">{teacher.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>{teacher.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Joined Aug 2019</span>
              </div>
            </div>

            <div className="w-full flex gap-2 pt-4">
              <Button className="flex-1" variant="outline">
                <Mail className="w-4 h-4 mr-2" /> Email
              </Button>
              <Button className="flex-1 bg-secondary hover:bg-secondary/90">
                <MessageSquare className="w-4 h-4 mr-2" /> Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Detailed Tabs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="pt-6">
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Overall Progress</div>
                <div className="text-3xl font-black text-primary">{avgProgress.toFixed(0)}%</div>
                <Progress value={avgProgress} className="h-1.5 mt-2" />
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-100">
              <CardContent className="pt-6">
                <div className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Verified Files</div>
                <div className="text-3xl font-black text-green-700">18</div>
                <div className="text-[10px] text-green-600 mt-2 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 100% Accuracy
                </div>
              </CardContent>
            </Card>
            <Card className="bg-amber-50 border-amber-100">
              <CardContent className="pt-6">
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Pending Review</div>
                <div className="text-3xl font-black text-amber-700">04</div>
                <div className="text-[10px] text-amber-600 mt-2 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Submitted 2 days ago
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="criteria" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12 bg-muted/50 p-1">
              <TabsTrigger value="criteria" className="font-bold">
                <BarChart3 className="w-4 h-4 mr-2" /> Criteria Breakdown
              </TabsTrigger>
              <TabsTrigger value="history" className="font-bold">
                <FileText className="w-4 h-4 mr-2" /> Submission History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="criteria" className="mt-6 space-y-4">
              {NAAC_CRITERIA.map((criterion) => {
                const prog = teacher.progress[criterion.number.toString()] || 0;
                return (
                  <Card key={criterion.id} className="overflow-hidden border-accent">
                    <CardHeader className="py-4 bg-muted/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {criterion.number}
                          </div>
                          <CardTitle className="text-base">{criterion.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold">{prog}%</span>
                          <div className="w-24">
                            <Progress value={prog} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {criterion.subCriteria.map((sub) => {
                          const status = teacher.subProgress[sub.id] || 'pending';
                          return (
                            <div key={sub.id} className="p-4 flex items-center justify-between hover:bg-accent/5 transition-colors">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono font-bold text-primary">{sub.id}</span>
                                  <h4 className="text-sm font-medium">{sub.title}</h4>
                                </div>
                                <p className="text-[10px] text-muted-foreground">{sub.description}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                {status === 'done' ? (
                                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[10px]">
                                    <CheckCircle2 className="w-3 h-3 mr-1" /> Done
                                  </Badge>
                                ) : status === 'revision' ? (
                                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none text-[10px]">
                                    <AlertCircle className="w-3 h-3 mr-1" /> Revision
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-[10px] text-muted-foreground border-dashed">
                                    <Clock className="w-3 h-3 mr-1" /> Pending
                                  </Badge>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="history" className="mt-6 space-y-4">
               {MOCK_SUBMISSIONS.length > 0 ? (
                 <div className="grid grid-cols-1 gap-4">
                   {MOCK_SUBMISSIONS.map((sub) => (
                     <Card key={sub.id} className="border-accent">
                       <CardContent className="p-4 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                           <div className="p-2 bg-primary/5 rounded-xl">
                             <FileText className="w-6 h-6 text-primary" />
                           </div>
                           <div>
                             <h4 className="text-sm font-bold">{sub.name}</h4>
                             <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                               Metric {sub.metric} • {sub.size} • {sub.date}
                             </p>
                           </div>
                         </div>
                         <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleDownload(sub.name)}>
                              <Download className="w-4 h-4 text-primary" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="w-4 h-4 text-muted-foreground" />
                            </Button>
                         </div>
                       </CardContent>
                     </Card>
                   ))}
                 </div>
               ) : (
                 <Card className="border-dashed">
                   <CardContent className="p-10 text-center space-y-4">
                     <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                       <FileText className="w-8 h-8 text-muted-foreground" />
                     </div>
                     <div className="max-w-xs mx-auto">
                       <h3 className="font-bold">No recent history</h3>
                       <p className="text-sm text-muted-foreground">Historical activity logs for this faculty member will appear here once new files are submitted.</p>
                     </div>
                   </CardContent>
                 </Card>
               )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
