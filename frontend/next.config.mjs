/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  // Completely disable static generation
  output: 'standalone',
  distDir: '.next',
  // Disable static optimization completely
  staticPageGenerationTimeout: 0,
  generateEtags: false,
  poweredByHeader: false,
  // Force all pages to be dynamic
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  // Disable static generation entirely
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  webpack: (config, { isServer, webpack }) => {
    // Prevent Html import errors during build
    if (isServer) {
      // More aggressive Html import prevention
      config.resolve.alias = {
        ...config.resolve.alias,
        'next/document': false,
        'next/head': false,
        'next/error': false,
      };
      
      // Add a plugin to completely ignore Html imports
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /next\/document/,
          contextRegExp: /.*/,
        })
      );
      
      // Add a plugin to replace Html imports with empty modules
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /next\/document/,
          './webpack-utils/empty-module.js'
        )
      );
      
      // Ignore modules that might import Html
      config.externals = config.externals || [];
      config.externals.push({
        'next/document': 'commonjs next/document',
        'next/head': 'commonjs next/head',
        'next/error': 'commonjs next/error',
      });
    }
    return config;
  },
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
};

export default nextConfig;