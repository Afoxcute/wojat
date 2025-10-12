'use client';

import dynamicImport from 'next/dynamic';

// Static export compatible

const Home = dynamicImport(() => import("@/components/sections/home"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading Wojat...</p>
      </div>
    </div>
  )
});

export default function HomePage() {
  return <Home />;
}