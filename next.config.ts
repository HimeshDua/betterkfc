import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // swcMinify: true
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
