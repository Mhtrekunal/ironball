'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileCheck, LogIn, Mail, Lock, Loader2, Sparkles, ShieldCheck, UserCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication logic based on user requirements
    setTimeout(() => {
      if (email === 'admin@hod.edu' && password === 'admin123') {
        router.push('/dashboard/hod');
      } else if (email === 'demo@teacher.edu' && password === 'password') {
        router.push('/dashboard/teacher');
      } else {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid credentials. Please use the demo accounts provided below.",
        });
      }
    }, 1200);
  };

  const fillCredentials = (role: 'hod' | 'teacher') => {
    if (role === 'hod') {
      setEmail('admin@hod.edu');
      setPassword('admin123');
    } else {
      setEmail('demo@teacher.edu');
      setPassword('password');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="bg-primary p-2.5 rounded-2xl shadow-xl shadow-primary/20 rotate-3">
              <FileCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-headline font-bold text-primary tracking-tight">NAAC Flow</h1>
          </div>
          <p className="text-muted-foreground font-body max-w-sm mx-auto">
            The intelligent framework for seamless NAAC accreditation documentation and verification.
          </p>
        </div>

        <Card className="shadow-2xl border-t-4 border-t-primary overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="bg-muted/30 pb-6 pt-8 border-b">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5 text-primary" />
              Secure Access
            </CardTitle>
            <CardDescription className="text-center">Enter your institutional credentials to continue</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Institutional Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@institution.edu" 
                    className="pl-10 h-11 border-accent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-11 border-accent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {isLoading ? 'Authenticating...' : 'Sign In to Portal'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="bg-muted/10 p-6 border-t flex flex-col gap-5">
            <div className="w-full space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Demo Identities</span>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => fillCredentials('hod')}
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border bg-white hover:bg-secondary/5 hover:border-secondary transition-all group"
                >
                  <ShieldCheck className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">HOD Account</span>
                </button>
                <button 
                  onClick={() => fillCredentials('teacher')}
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border bg-white hover:bg-primary/5 hover:border-primary transition-all group"
                >
                  <UserCircle className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Teacher Account</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold">
                <Sparkles className="w-3 h-3 text-amber-500" />
                AI Powered
              </div>
              <div className="w-1 h-1 rounded-full bg-border"></div>
              <div className="text-[10px] uppercase tracking-widest font-bold">
                SSR Ready
              </div>
            </div>
          </CardFooter>
        </Card>

        <p className="text-[10px] text-muted-foreground text-center font-medium opacity-60">
          AUTHORIZED PERSONNEL ONLY • ENCRYPTED SESSION
        </p>
      </div>
    </main>
  );
}
