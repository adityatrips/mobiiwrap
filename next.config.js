/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ hostname: "www.apple.com" },
			{ hostname: "tailwindui.com" },
			{ hostname: "images.unsplash.com" },
			{ hostname: "placehold.co" },
			{ hostname: "i.ibb.co" },
		],
	},
};

module.exports = nextConfig;
