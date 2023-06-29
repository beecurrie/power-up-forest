/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // was causing multiple calls to database in dev mode when disabled
}

module.exports = nextConfig
