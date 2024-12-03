"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import { format } from "date-fns"
import { RFP } from "@/types/rfp"
import Link from "next/link"

interface RFPCardProps {
  rfp: RFP
}

export function RFPCard({ rfp }: RFPCardProps) {
  return (
    <Link href={`/rfps/${rfp.id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{rfp.title}</CardTitle>
            <Badge variant={rfp.status === 'active' ? 'default' : 'secondary'}>
              {rfp.status}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">{rfp.company}</div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Posted: {format(new Date(rfp.postDate), 'MMM d, yyyy')}</span>
            </div>
            
            {rfp.location && (
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{rfp.location.join(', ')}</span>
              </div>
            )}
            
            {rfp.patientCount?.target && (
              <div className="flex items-center space-x-2 text-sm">
                <Users className="h-4 w-4" />
                <span>{rfp.patientCount.target} patients</span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {rfp.therapeuticArea && (
                <Badge variant="outline">{rfp.therapeuticArea}</Badge>
              )}
              {rfp.trialPhase && (
                <Badge variant="outline">{rfp.trialPhase}</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}