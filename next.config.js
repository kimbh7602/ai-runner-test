/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // SWC 기반 styled-components 변환 (Babel 불필요, SSR 지원 포함)
    styledComponents: true,
  },
};

module.exports = nextConfig;
