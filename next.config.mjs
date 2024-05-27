/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol : "https",
            hostname : "utfs.io",
            pathname : `/a/${process.env.UPLOADTHING_APP_ID}/*`
        },{
            protocol : "https",
            hostname : "lh3.googleusercontent.com",
            pathname : "**"
        }],
        domains: ['images.unsplash.com'],
      }
};

export default nextConfig;
