/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ["date-fns", "framer-motion", "lucide-react"],
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
