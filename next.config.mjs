/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators:false,
  images: {
    domains: ["videoforinteractivedemons.s3.ap-south-1.amazonaws.com"],
  },
};

export default nextConfig;
