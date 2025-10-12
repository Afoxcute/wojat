'use client';

import dynamicImport from 'next/dynamic';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Ticker = dynamicImport(() => import("@/components/sections/ticker"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading token data...</p>
      </div>
    </div>
  )
});

export default function Page({ params }: { params: { id: string } }) {
  return <Ticker params={params} />;
}
