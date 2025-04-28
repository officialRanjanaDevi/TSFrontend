/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        hostname: "i.imgur.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
