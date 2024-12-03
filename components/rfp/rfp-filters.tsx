"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrialPhase } from "@/types/rfp"

const THERAPEUTIC_AREAS = [
  "Oncology",
  "Neurology",
  "Cardiology",
  "Immunology",
  "Rare Diseases",
  "Infectious Diseases"
]

const TRIAL_PHASES: TrialPhase[] = [
  "Phase 1",
  "Phase 2",
  "Phase 3",
  "Phase 4",
  "Not Specified"
]

export function RFPFilters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Trial Phase</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select phase" />
            </SelectTrigger>
            <SelectContent>
              {TRIAL_PHASES.map((phase) => (
                <SelectItem key={phase} value={phase}>
                  {phase}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Therapeutic Areas</Label>
          <div className="space-y-2">
            {THERAPEUTIC_AREAS.map((area) => (
              <div key={area} className="flex items-center space-x-2">
                <Checkbox id={area} />
                <Label htmlFor={area}>{area}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}