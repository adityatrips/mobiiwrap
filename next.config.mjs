/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "plus.unsplash.com" },
      { hostname: "via.placeholder.com" },
      { hostname: "fakestoreapi.com" },
      { hostname: "placehold.co" },
    ],
    dangerouslyAllowSVG: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
