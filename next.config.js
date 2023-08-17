/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/AAcHTtcsRNtFhO4OLmdVgmsyHQWzTaG9Qk_bo_HI0LKiYQCQ=s96-c",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/103325623",
      },
    ],
  },
};

module.exports = nextConfig;
