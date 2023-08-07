/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        outputFileTracingExcludes: {
         "*": [
          "node_modules/@swc/core-linux-x64-gnu",
          "node_modules/@swc/core-linux-x64-musl",
          "node_modules/@esbuild/linux-x64",
         ],
        },
       },
       images: {
        remotePatterns: [
          { protocol: 'https', hostname: 'pbs.twimg.com' },
          { protocol: 'https', hostname: 'abs.twimg.com' },
        ],
      },
}

module.exports = nextConfig
