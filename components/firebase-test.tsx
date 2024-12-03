"use client";

import { useEffect, useState } from 'react';
import { getLatestRFPs } from '@/lib/services/firebase';
import { isInitialized } from '@/lib/config/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function FirebaseTest() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error' | 'not-configured'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isInitialized) {
      setStatus('not-configured');
      return;
    }

    async function testConnection() {
      try {
        await getLatestRFPs(1);
        setStatus('connected');
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Failed to connect to Firebase');
      }
    }

    testConnection();
  }, []);

  if (status === 'not-configured') {
    return (
      <Alert variant="warning">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Firebase Not Configured</AlertTitle>
        <AlertDescription>
          Please set up your Firebase environment variables in the .env file to enable database functionality.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Firebase Connection Status</CardTitle>
      </CardHeader>
      <CardContent>
        {status === 'loading' && <p>Testing Firebase connection...</p>}
        {status === 'connected' && <p className="text-green-600">✓ Successfully connected to Firebase</p>}
        {status === 'error' && (
          <div className="text-red-600">
            <p>✗ Failed to connect to Firebase</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}