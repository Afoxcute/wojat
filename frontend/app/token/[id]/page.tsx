import Ticker from "@/components/sections/ticker";

// Disable static generation for this page
export const dynamic = 'force-dynamic';

// Remove generateStaticParams to prevent static generation issues

export default function Page({ params }: { params: { id: string } }) {
  return <Ticker params={params} />;
}
