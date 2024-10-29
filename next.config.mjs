/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@fuels/connectors", "@fuels/react"],
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
