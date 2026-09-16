/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "44302",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "44302",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.sagarika.org.bd",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.sagarika.org.bd",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
