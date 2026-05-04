
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NAAC_CRITERIA, MOCK_TEACHERS } from '@/lib/constants';
import { 
  Users, 
  FileCheck, 
  AlertCircle, 
  TrendingUp, 
  ArrowUpRight,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  Bell,
  BellRing
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function HodDashboard() {
  const { toast } = useToast();
  
  const stats = [
    { label: 'Total Faculty', value: '24', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Completed Files', value: '182', icon: FileCheck, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Reviews', value: '43', icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Deadline Remaining', value: '12 Days', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const handleVerify = (teacher: string) => {
    // In a real app, we would addDoc to 'notifications' collection here
    toast({
      title: "Verification Successful",
      description: `Files verified. Notification sent to ${teacher}.`,
    });
  };

  const handleRevision = (teacher: string) => {
    // In a real app, we would addDoc to 'notifications' collection here
    toast({
      variant: "destructive",
      title: "Revision Requested",
      description: `Feedback and notification sent to ${teacher}.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Department Overview</h1>
          <p className="text-muted-foreground">Monitor and manage NAAC accreditation for Computer Science Department.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button className="bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20">
            <Download className="w-4 h-4 mr-2" /> Generate consolidated report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} p-3 rounded-2xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                  <TrendingUp className="w-4 h-4" />
                  +4%
                </div>
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Matrix Heatmap */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Criterion × Faculty Matrix</CardTitle>
              <CardDescription>Visual progress map of all 7 criteria across the department.</CardDescription>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-100 rounded"></div> 0-25%
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-amber-100 rounded"></div> 26-75%
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-100 rounded"></div> 76-100%
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 font-bold text-xs uppercase tracking-wider text-muted-foreground pl-2">Faculty Member</th>
                    {NAAC_CRITERIA.map(c => (
                      <th key={c.id} className="py-4 px-2 font-bold text-xs uppercase tracking-wider text-muted-foreground text-center">C{c.number}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TEACHERS.map((teacher, i) => (
                    <tr key={teacher.id} className="border-b hover:bg-accent/10 transition-colors">
                      <td className="py-4 pl-2">
                        <div className="font-semibold text-sm">{teacher.name}</div>
                        <div className="text-[10px] text-muted-foreground">{teacher.department}</div>
                      </td>
                      {Object.values(teacher.progress).map((prog, idx) => {
                        const lightBg = prog > 75 ? 'bg-green-100' : prog > 25 ? 'bg-amber-100' : 'bg-red-100';
                        const textColor = prog > 75 ? 'text-green-700' : prog > 25 ? 'text-amber-700' : 'text-red-700';
                        return (
                          <td key={idx} className="py-4 px-2 text-center">
                            <div className={`${lightBg} ${textColor} text-[10px] font-bold py-1 px-2 rounded-full inline-block min-w-[35px]`}>
                              {prog}%
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Action Feed */}
        <Card className="shadow-sm border-secondary/10">
          <CardHeader>
            <CardTitle className="text-lg">Review Queue</CardTitle>
            <CardDescription>Pending verifications from today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { teacher: 'Dr. Sarah Wilson', criterion: 'Criterion 1', time: '2h ago', status: 'new' },
              { teacher: 'Prof. James Miller', criterion: 'Criterion 5', time: '5h ago', status: 'revised' },
              { teacher: 'Dr. Emily Chen', criterion: 'Criterion 3', time: 'Yesterday', status: 'new' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border bg-accent/20 group hover:border-primary/30 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary font-bold">
                  {item.teacher[0]}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm truncate">{item.teacher}</span>
                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium mb-2">{item.criterion}</div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-[10px] font-bold text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleVerify(item.teacher)}
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Verify
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-[10px] font-bold text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRevision(item.teacher)}
                    >
                      <XCircle className="w-3 h-3 mr-1" /> Revision
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="link" className="w-full text-secondary text-sm font-bold">
              View all 43 pending <ArrowUpRight className="ml-1 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
