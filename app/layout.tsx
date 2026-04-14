import type { Metadata } from 'next';
import StyledComponentsRegistry from './registry';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Next.js Boilerplate',
  description: 'Next.js + TypeScript + Styled-Components + Jotai 보일러플레이트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {/* SSR 스타일 수집 → 전역 Provider → 페이지 콘텐츠 순서 유지 */}
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
