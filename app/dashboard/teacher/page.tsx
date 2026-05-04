'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NAAC_CRITERIA } from '@/lib/constants';
import { 
  BarChart3, 
  FileCheck, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  BookOpen,
  GraduationCap,
  FlaskConical,
  Building2,
  Users,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, any> = {
  BookOpen,
  GraduationCap,
  FlaskConical,
  Building2,
  Users,
  ShieldCheck,
  Sparkles
};

export default function TeacherDashboard() {
  const totalProgress = 68; // Mock overall progress

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. Sarah. Here's your accreditation progress.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            View My Reports
          </Button>
          <Button className="shadow-lg shadow-primary/20">
            Quick Upload
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Completion</CardTitle>
            <BarChart3 className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProgress}%</div>
            <Progress value={totalProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verified Documents</CardTitle>
            <FileCheck className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">+3 this week</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Submitted & waiting</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Needs Revision</CardTitle>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-1">Check feedback from HOD</p>
          </CardContent>
        </Card>
      </div>

      {/* Criteria Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-base font-bold">7</span>
            NAAC Criteria Overview
          </h2>
          <Button variant="link" asChild className="text-primary p-0 h-auto">
            <Link href="/dashboard/teacher/criteria">View All Sub-Criteria <ArrowRight className="ml-1 w-4 h-4" /></Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {NAAC_CRITERIA.map((criterion, idx) => {
            const Icon = iconMap[criterion.icon];
            const progress = [80, 45, 100, 30, 90, 10, 60][idx]; // Mock data
            return (
              <Card key={criterion.id} className="group hover:shadow-md transition-all border-accent hover:border-primary/30 overflow-hidden flex flex-col h-full">
                <CardHeader className="pb-3 relative bg-accent/20">
                  <div className="flex justify-between items-start">
                    <div className="bg-white p-2 rounded-xl shadow-sm text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant={progress === 100 ? "default" : "secondary"}>
                      {progress}%
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-4 line-clamp-1">{criterion.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs min-h-[32px]">
                    {criterion.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Completion</span>
                      <span>{progress}/100</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors h-9 text-xs font-semibold" asChild>
                    <Link href={`/dashboard/teacher/criteria/${criterion.id}`}>
                      Enter Data
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}