// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactStrictMode: false,
//   images: {
//     domains: ['firebasestorage.googleapis.com']
//   }
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xhzroumxuherqicszlml.supabase.co",
        pathname: "/storage/v1/object/public/images/Image_to_Code/**",
      },
    ],
  },
};

export default nextConfig;
