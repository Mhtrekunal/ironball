
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Eye, 
  Trash2, 
  Download, 
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockDocs = [
  { id: '1', name: 'Curriculum_Policy_2023.pdf', criterion: '1.1.1', date: '2024-03-15', status: 'Verified', size: '2.4 MB', url: '#' },
  { id: '2', name: 'Student_Workshops_Report.xlsx', criterion: '5.1.2', date: '2024-03-10', status: 'Pending', size: '1.1 MB', url: '#' },
  { id: '3', name: 'Research_Lab_Photos.zip', criterion: '3.3.1', date: '2024-03-05', status: 'Needs Revision', size: '15.8 MB', url: '#' },
  { id: '4', name: 'Feedback_Summary_Sem1.pdf', criterion: '1.4.1', date: '2024-02-28', status: 'Verified', size: '840 KB', url: '#' },
  { id: '5', name: 'Alumni_Interaction_Log.docx', criterion: '2.3.1', date: '2024-02-15', status: 'Verified', size: '1.2 MB', url: '#' },
];

export default function MyDocumentsPage() {
  const { toast } = useToast();

  const handleDownload = (docName: string) => {
    toast({
      title: "Downloading File",
      description: `Preparing ${docName} for download...`,
    });
    // Simulating download behavior
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your file is ready.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">My Documents</h1>
          <p className="text-muted-foreground">Manage your uploaded evidence and verification status.</p>
        </div>
        <Button className="shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4 mr-2" /> Upload New Evidence
        </Button>
      </div>

      <Card className="border-accent">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[400px]">Document Name</TableHead>
                <TableHead>Criterion</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDocs.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-accent/20 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/5 p-2 rounded-lg">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <span className="truncate max-w-[300px]">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-[10px]">{doc.criterion}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{doc.date}</TableCell>
                  <TableCell>
                    {doc.status === 'Verified' ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </Badge>
                    ) : doc.status === 'Pending' ? (
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none flex items-center gap-1 w-fit">
                        <Clock className="w-3 h-3" /> Pending
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none flex items-center gap-1 w-fit">
                        <AlertCircle className="w-3 h-3" /> Needs Revision
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{doc.size}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => handleDownload(doc.name)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
