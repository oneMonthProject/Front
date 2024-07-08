export default (phase, {defaultConfig}) => {

    /** @type {import('next').NextConfig} */

    const nextConfig = {
        productionBrowserSourceMaps: true,
        webpack: (config) => {
            config.module.rules.push({
                test: /\.svg$/,
                use: ["@svgr/webpack"]
            });

            return config;
        },
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'project-match-bucket.s3.ap-northeast-2.amazonaws.com'
                }
            ]
        },
        async redirects() {
            return [
                {
                    source: '/(project|user)/:path*(.*)',
                    missing: [
                        {
                            type: 'cookie',
                            key: 'user_id'
                        }
                    ],
                    destination: '/login',
                    permanent: false
                },
                {
                    source: '/api/(project|user)/:path*(^(?!.*simple).*$)',
                    missing: [
                        {
                            type: 'cookie',
                            key: 'user_id'
                        }
                    ],
                    destination: '/login',
                    permanent: false
                }
            ]
        }
    }

    return nextConfig;
}
