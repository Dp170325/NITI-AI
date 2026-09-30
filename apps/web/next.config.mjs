const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "/NITI-AI";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so Cloudflare `npx wrangler deploy` can publish `apps/web/out`
  // without a Node.js server. GitHub Pages already used this path.
  output: "export",
  basePath: isGithubPages ? repoName : "",
  assetPrefix: isGithubPages ? `${repoName}/` : undefined,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
};

export default nextConfig;
