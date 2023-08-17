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
  env: {
    GOOGLE_ID:
      "85913852290-osbch40bbvp3dsfn9ih0o5sdois00p8o.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
    GITHUB_ID: "15ea82e4b93a343f9511",
    GITHUB_SECRET: "04134a7f3f40255cca9636ea3aed9e534ed25818",
    NEXTAUTH_URL: "http://localhost:3000",
    SERVER_URL: "http://localhost:3000",
    MONGO_URL:
      "mongodb+srv://tanvir:tanvir@cluster0.bqcztc2.mongodb.net/rohim?retryWrites=true&w=majority",
    JWT_SECRET:
      "fd03c9aaef105657b1efc1b8556184d35c4c570a1b88a7b9c33ef15269e7a61a",
    SERVICE_URL: "service_c7yw1hl",
    TEMPLATE_URL: "template_ixpr45j",
    PUBLIC_URL: "6CVP6qAGTRzIRL-JU",
  },
};

module.exports = nextConfig;
