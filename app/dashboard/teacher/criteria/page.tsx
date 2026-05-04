'use client';

import { NAAC_CRITERIA } from '@/lib/constants';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Info } from 'lucide-react';
import Link from 'next/link';

export default function CriteriaListPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Criteria Forms</h1>
          <p className="text-muted-foreground">Select a criterion to start or resume data entry.</p>
        </div>
        <div className="flex items-center gap-2 bg-accent/50 p-2 px-3 rounded-full text-sm text-primary border border-primary/10">
          <Info className="w-4 h-4" />
          <span>7 Total Main Criteria</span>
        </div>
      </div>

      <div className="space-y-4">
        {NAAC_CRITERIA.map((criterion) => (
          <Card key={criterion.id} className="hover:border-primary transition-colors group">
            <Link href={`/dashboard/teacher/criteria/${criterion.id}`}>
              <div className="p-1">
                <div className="flex items-center p-5 gap-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-2xl text-primary border border-primary/10">
                    {criterion.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{criterion.title}</h3>
                      <Badge variant="outline" className="text-xs uppercase font-bold tracking-wider px-2 py-0.5">
                        {criterion.subCriteria.length} Sub-Criteria
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm max-w-2xl">{criterion.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-green-700">60%</div>
                      <div className="w-8 h-8 rounded-full bg-accent border-2 border-white flex items-center justify-center text-[10px] font-bold text-primary">AI</div>
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                      Open Form <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}