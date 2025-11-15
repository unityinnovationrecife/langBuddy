import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['img.youtube.com', 'randomuser.me'], // adicione outros domínios que você usar
  },

};

export default nextConfig;
