export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <div className="h-[400px] bg-muted animate-pulse rounded-lg" />
        </aside>
        
        <main className="md:col-span-3">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}