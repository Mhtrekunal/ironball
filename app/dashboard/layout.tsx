
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  CheckCircle2, 
  Settings, 
  LogOut, 
  Menu,
  ShieldCheck,
  Users,
  BarChart3,
  Download,
  History,
  FileCheck,
  ChevronRight,
  FilePieChart,
  Bell,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHod = pathname.includes('/hod');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock notifications for Teacher view
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Files Verified', message: 'HOD verified your submissions for Criterion 1.1.1.', type: 'success', time: '5m ago', unread: true },
    { id: '2', title: 'Revision Requested', message: 'Please update documents for Criterion 5.1.2.', type: 'warning', time: '2h ago', unread: true },
    { id: '3', title: 'Welcome to NAAC Flow', message: 'Start your accreditation journey today.', type: 'info', time: '1d ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const teacherNav = [
    { name: 'Dashboard', href: '/dashboard/teacher', icon: LayoutDashboard },
    { name: 'Criteria Forms', href: '/dashboard/teacher/criteria', icon: FileText },
    { name: 'My Documents', href: '/dashboard/teacher/documents', icon: FolderOpen },
    { name: 'Reports & Export', href: '/dashboard/teacher/reports', icon: FilePieChart },
    { name: 'My Progress', href: '/dashboard/teacher/progress', icon: CheckCircle2 },
  ];

  const hodNav = [
    { name: 'HOD Dashboard', href: '/dashboard/hod', icon: LayoutDashboard },
    { name: 'All Teachers', href: '/dashboard/hod/teachers', icon: Users },
    { name: 'Matrix Overview', href: '/dashboard/hod/matrix', icon: BarChart3 },
    { name: 'Consolidated Export', href: '/dashboard/hod/export', icon: Download },
    { name: 'Audit Log', href: '/dashboard/hod/audit-log', icon: History },
  ];

  const navItems = isHod ? hodNav : teacherNav;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r transition-all duration-300 flex flex-col z-20 shadow-lg",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 flex items-center gap-3 border-b h-[73px]">
          <div className="bg-primary p-2 rounded-lg shrink-0">
            <FileCheck className="w-5 h-5 text-white" />
          </div>
          {isSidebarOpen && (
            <span className="font-headline font-bold text-xl text-primary truncate">NAAC Flow</span>
          )}
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start h-11 mb-1 transition-all",
                      isActive ? "bg-primary shadow-md shadow-primary/20" : "hover:bg-accent text-muted-foreground hover:text-primary",
                      !isSidebarOpen && "px-0 justify-center"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isSidebarOpen && "mr-3")} />
                    {isSidebarOpen && <span>{item.name}</span>}
                    {isSidebarOpen && isActive && <ChevronRight className="ml-auto w-4 h-4" />}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t space-y-2">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-lg bg-accent/50 mb-2",
            !isSidebarOpen && "justify-center px-0"
          )}>
            <div className="bg-white p-1 rounded-full shadow-sm">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {isHod ? 'H' : 'T'}
              </div>
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{isHod ? 'HOD User' : 'Sarah Wilson'}</p>
                <p className="text-xs text-muted-foreground truncate">{isHod ? 'Dept Head' : 'Asst. Professor'}</p>
              </div>
            )}
          </div>
          <Link href="/">
            <Button variant="ghost" className={cn("w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10", !isSidebarOpen && "justify-center px-0")}>
              <LogOut className={cn("w-5 h-5", isSidebarOpen && "mr-3")} />
              {isSidebarOpen && <span>Sign Out</span>}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-[73px] bg-white border-b flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-muted-foreground hover:text-primary">
              <Menu className="w-6 h-6" />
            </Button>
            <h2 className="text-lg font-semibold text-muted-foreground">
              {isHod ? 'HOD Management' : 'Faculty Documentation'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {!isHod && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="relative rounded-full">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 border-2 border-white rounded-full">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 mr-4" align="end">
                  <div className="p-4 border-b flex items-center justify-between bg-accent/30">
                    <h4 className="font-bold text-sm">Notifications</h4>
                    <Button variant="ghost" className="h-auto p-0 text-[10px] font-bold uppercase text-primary" onClick={markAllRead}>
                      Mark all read
                    </Button>
                  </div>
                  <ScrollArea className="h-72">
                    <div className="divide-y">
                      {notifications.map((n) => (
                        <div key={n.id} className={cn("p-4 flex gap-3 hover:bg-muted/50 transition-colors cursor-pointer", n.unread && "bg-primary/5")}>
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                            n.type === 'success' ? "bg-green-100 text-green-600" :
                            n.type === 'warning' ? "bg-amber-100 text-amber-600" :
                            "bg-blue-100 text-blue-600"
                          )}>
                            {n.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
                             n.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                             <Bell className="w-4 h-4" />}
                          </div>
                          <div className="space-y-1 overflow-hidden">
                            <p className="text-sm font-bold leading-none">{n.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                              <Clock className="w-3 h-3" /> {n.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            )}
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-sm font-medium">Academic Year 2023-24</span>
              <span className="text-xs text-green-600 font-medium">Submission Window: Open</span>
            </div>
            <Button variant="outline" size="icon" className="relative rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-background/50">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
