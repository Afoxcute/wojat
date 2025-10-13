// Force dynamic rendering for token page
export const dynamic = 'force-dynamic';

import Ticker from "@/components/sections/ticker";

export default function Page({ params }: { params: { id: string } }) {
  return <Ticker params={params} />;
}
