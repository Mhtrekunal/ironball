'use client';

import { MOCK_TEACHERS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Mail, 
  ShieldCheck, 
  MoreVertical,
  AlertTriangle,
  ExternalLink,
  BellRing
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function AllTeachersPage() {
  const { toast } = useToast();

  const handleVerify = (teacherName: string) => {
    toast({
      title: "Files Verified",
      description: `Verification complete. A notification has been sent to ${teacherName}.`,
    });
  };

  const handleReminder = (teacherName: string) => {
    toast({
      title: "Reminder Sent",
      description: `A progress update reminder has been sent to ${teacherName}'s institutional email.`,
    });
  };

  const handleRevision = (teacherName: string) => {
    toast({
      variant: "destructive",
      title: "Revision Requested",
      description: `Notification sent to ${teacherName} regarding necessary file updates.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Faculty Progress Tracker</h1>
          <p className="text-muted-foreground">Manage individual teacher contributions and verification status.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search faculty name..." className="pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TEACHERS.map((teacher) => {
          const avgProgress = Object.values(teacher.progress).reduce((a, b) => a + b, 0) / 7;
          return (
            <Card key={teacher.id} className="hover:shadow-lg transition-all border-accent group">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl group-hover:bg-primary group-hover:text-white transition-colors">
                      {teacher.name[0]}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{teacher.name}</CardTitle>
                      <CardDescription>{teacher.designation} • {teacher.department}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleReminder(teacher.name)}>
                    <BellRing className="w-4 h-4 text-muted-foreground hover:text-primary" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Overall Completion</span>
                    <span className={avgProgress === 100 ? "text-green-600" : "text-primary"}>
                      {avgProgress.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={avgProgress} className="h-2" />
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Object.values(teacher.progress).map((p, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={`w-full h-1.5 rounded-full ${p === 100 ? 'bg-green-500' : p > 50 ? 'bg-primary' : 'bg-muted'}`} title={`Criterion ${i+1}: ${p}%`} />
                      <span className="text-[8px] font-bold text-muted-foreground">C{i + 1}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-2">
                  <div className="flex gap-2">
                    <Link href={`/dashboard/hod/teachers/${teacher.id}`} className="flex-1">
                      <Button variant="outline" className="w-full h-9 text-xs" size="sm">
                        <ExternalLink className="w-3 h-3 mr-2" /> View Profile
                      </Button>
                    </Link>
                    <Button 
                      className="flex-1 h-9 text-xs shadow-md shadow-primary/10" 
                      size="sm"
                      onClick={() => handleVerify(teacher.name)}
                    >
                      <ShieldCheck className="w-3 h-3 mr-2" /> Verify Files
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full h-9 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20" 
                    size="sm"
                    onClick={() => handleRevision(teacher.name)}
                  >
                    <AlertTriangle className="w-3 h-3 mr-2" /> Request Revision
                  </Button>
                </div>

                <div className="bg-accent/30 p-3 rounded-lg flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-white text-[10px] py-0">Active</Badge>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-500" /> Recent Activity
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
