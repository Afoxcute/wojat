import Ticker from "@/components/sections/ticker";

// Static export compatible
export async function generateStaticParams() {
  // Generate static params for common token IDs
  return [
    { id: '189229' },
    { id: '123456' },
    { id: '789012' },
  ];
}

export default function Page({ params }: { params: { id: string } }) {
  return <Ticker params={params} />;
}
