/** @type {import('next').NextConfig} */
const nextConfig = {
      // Add this code block for usel prof image to work in Navbar.ts 
    images:{
        domains: ["res.cloudinary.com"]
      },
    typescript: {
        ignoreBuildErrors: true
    }
}

module.exports = nextConfig
