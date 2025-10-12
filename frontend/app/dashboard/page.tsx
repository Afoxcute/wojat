'use client';

import dynamicImport from 'next/dynamic';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DashboardClient = dynamicImport(() => import('./dashboard-client'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    </div>
  )
});

export default function DashboardPage() {
  return <DashboardClient />;
}
