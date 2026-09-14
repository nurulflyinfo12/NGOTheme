/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Turn off strict mode
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "44302",
        pathname: "/api/FileServer/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "44302",
        pathname: "/api/FileServer/**",
      },
    ],
  },
};

module.exports = nextConfig;