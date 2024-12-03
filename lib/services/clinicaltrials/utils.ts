export function formatDateParam(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function formatLocation(facility?: string, city?: string, state?: string): string {
  const parts = [];
  if (facility) parts.push(facility);
  if (city) parts.push(city);
  if (state) parts.push(state);
  return parts.join(', ') || 'Location not specified';
}