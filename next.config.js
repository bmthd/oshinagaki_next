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
}

module.exports = nextConfig
