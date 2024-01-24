/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    },
    images: {
        domains: ['projectmatch-user-image.s3.ap-northeast-2.amazonaws.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'projectmatch-user-image.s3.ap-northeast-2.amazonaws.com'
            }
        ]
    }
}

module.exports = nextConfig
