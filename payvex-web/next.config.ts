/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      root: ".", // Força o Turbopack a considerar esta pasta como raiz
    },
  },
};

export default nextConfig;
