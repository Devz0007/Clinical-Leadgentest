"use client"

import { useEffect, useState } from 'react';
import { RFPCard } from "./rfp-card";
import { fetchClinicalTrials } from '@/lib/services/clinicaltrials/api';
import { RFP } from '@/types/rfp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function RFPList() {
  const [rfps, setRfps] = useState<RFP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRFPs() {
      try {
        setLoading(true);
        const data = await fetchClinicalTrials();
        setRfps(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching RFPs:', err);
        setError('Failed to fetch clinical trials. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchRFPs();
  }, []);

  if (loading) {
    return <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
      ))}
    </div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (rfps.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No clinical trials found in the last 30 days.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-4">
      {rfps.map((rfp) => (
        <RFPCard key={rfp.id} rfp={rfp} />
      ))}
    </div>
  );
}