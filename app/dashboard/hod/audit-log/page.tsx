'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { User, FileEdit, Trash2, ShieldCheck, History, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const logs = [
  { id: '1', user: 'Dr. Sarah Wilson', action: 'Uploaded Evidence', target: 'Criterion 1.1.1', time: '10 mins ago', type: 'upload' },
  { id: '2', user: 'System (HOD)', action: 'Verified Metric', target: 'Criterion 5.1.2', time: '2h ago', type: 'verify' },
  { id: '3', user: 'Prof. James Miller', action: 'Modified Response', target: 'Criterion 3.4.1', time: '5h ago', type: 'edit' },
  { id: '4', user: 'Dr. Emily Chen', action: 'Deleted Draft', target: 'Criterion 7.2.1', time: 'Yesterday', type: 'delete' },
  { id: '5', user: 'Dr. Sarah Wilson', action: 'Generated PDF', target: 'Individual Report', time: 'Yesterday', type: 'export' },
];

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">System Audit Log</h1>
          <p className="text-muted-foreground">Full activity history of all users within the department portal.</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search logs..." className="pl-10" />
        </div>
      </div>

      <Card className="border-accent">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Target Metric</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="text-right">Log Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="hover:bg-accent/20 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        log.type === 'upload' ? 'bg-blue-50 text-blue-600' :
                        log.type === 'verify' ? 'bg-green-50 text-green-600' :
                        log.type === 'delete' ? 'bg-red-50 text-red-600' :
                        'bg-accent text-primary'
                      }`}>
                        {log.type === 'upload' ? <History className="w-4 h-4" /> :
                         log.type === 'verify' ? <ShieldCheck className="w-4 h-4" /> :
                         log.type === 'edit' ? <FileEdit className="w-4 h-4" /> :
                         log.type === 'delete' ? <Trash2 className="w-4 h-4" /> :
                         <FileEdit className="w-4 h-4" />}
                      </div>
                      <span className="text-sm">{log.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <User className="w-3 h-3 text-muted-foreground" />
                      </div>
                      {log.user}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] uppercase font-mono">{log.target}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{log.time}</TableCell>
                  <TableCell className="text-right">
                    <Badge className="text-[10px] uppercase tracking-widest">{log.type}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}