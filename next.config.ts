// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["uzhooacnpylsjgzcdgnn.supabase.co"],
    // Alternatively, you can use remotePatterns for more specific control
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uzhooacnpylsjgzcdgnn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

module.exports = nextConfig;
