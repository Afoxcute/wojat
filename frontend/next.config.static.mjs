/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  output: 'export',
  trailingSlash: true,
  // Disable static generation completely
  distDir: 'dist',
  // Skip static generation
  skipTrailingSlashRedirect: true,
  // Disable image optimization for static export
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
  // Disable static optimization
  staticPageGenerationTimeout: 0,
  // Force all pages to be dynamic
  generateBuildId: async () => {
    return 'static-build-' + Date.now()
  },
  // Disable static generation
  skipStaticGeneration: true,
};

export default nextConfig;
