/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  output: 'standalone',
  trailingSlash: true,
  // Completely disable static generation
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  // Force all pages to be server-side rendered
  staticPageGenerationTimeout: 1000,
  // Disable static optimization completely
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder",
        port: "",
      },
      {
        protocol: "https",
        hostname: "p16-sign.tiktokcdn-us",
        port: "",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
      },
      {
        protocol: "https",
        hostname: "nftstorage.link",
        port: "",
      },
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud",
        port: "",
      },
    ],
  },
  // Force all pages to be dynamic
  generateStaticParams: false,
  // Disable static optimization
  swcMinify: true,
  // Completely disable static generation
  outputFileTracing: false,
  // Force all pages to be server-side rendered
  distDir: '.next',
  generateEtags: false,
  async headers() {
    return [
      {
        source: "/embed/:id*", // Handle /embed and /embed/[id]
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *;",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ipfs/:path*",
        destination: "https://ipfs.io/ipfs/:path*",
      },
    ];
  },
};

export default nextConfig;