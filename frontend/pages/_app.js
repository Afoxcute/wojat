import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Handle client-side routing
    if (typeof window !== 'undefined') {
      // Any client-side initialization
    }
  }, [])

  return <Component {...pageProps} />
}
