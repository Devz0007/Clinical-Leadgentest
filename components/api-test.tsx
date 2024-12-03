"use client"

import { useEffect, useState } from 'react';
import { fetchClinicalTrials } from '@/lib/services/clinicaltrials/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function APITest() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [error, setError] = useState<string>('');
  const [studyCount, setStudyCount] = useState<number>(0);

  useEffect(() => {
    async function testConnection() {
      try {
        const studies = await fetchClinicalTrials();
        setStudyCount(studies.length);
        setStatus('connected');
      } catch (err) {
        console.error('API Test Error:', err);
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Failed to connect to ClinicalTrials.gov API');
      }
    }

    testConnection();
  }, []);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>ClinicalTrials.gov API Status</CardTitle>
      </CardHeader>
      <CardContent>
        {status === 'loading' && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
            <span>Testing API connection...</span>
          </div>
        )}
        
        {status === 'connected' && (
          <Alert>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Successfully connected to API</AlertTitle>
            <AlertDescription>
              Found {studyCount} clinical trials from the last 30 days.
            </AlertDescription>
          </Alert>
        )}
        
        {status === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Failed to connect to API</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}