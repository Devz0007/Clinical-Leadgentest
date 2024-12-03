import { RFPList } from "@/components/rfp/rfp-list"
import { RFPFilters } from "@/components/rfp/rfp-filters"

export default function RFPsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clinical Trial RFPs</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <RFPFilters />
        </aside>
        
        <main className="md:col-span-3">
          <RFPList />
        </main>
      </div>
    </div>
  )
}