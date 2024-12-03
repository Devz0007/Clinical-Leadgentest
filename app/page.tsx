import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BeakerIcon, SearchIcon, BellIcon } from "lucide-react"
import { APITest } from '@/components/api-test'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Track Clinical Trial RFPs Worldwide</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Stay updated with the latest clinical trial opportunities from leading pharmaceutical companies
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/rfps">
            <Button size="lg">
              Get Started
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      <APITest />

      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <SearchIcon className="h-8 w-8 mb-2" />
            <CardTitle>Comprehensive Search</CardTitle>
            <CardDescription>
              Search through RFPs from multiple sources in one place
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <BeakerIcon className="h-8 w-8 mb-2" />
            <CardTitle>Real-time Updates</CardTitle>
            <CardDescription>
              Get instant notifications for new clinical trial opportunities
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <BellIcon className="h-8 w-8 mb-2" />
            <CardTitle>Custom Alerts</CardTitle>
            <CardDescription>
              Set up alerts based on therapeutic areas and trial phases
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  )
}