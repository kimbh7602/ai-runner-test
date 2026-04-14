'use client';

/**
 * 홈 페이지 콘텐츠 — 클라이언트 컴포넌트
 *
 * Styled-Components는 ThemeProvider 컨텍스트가 필요하므로
 * 'use client' 경계 안에서만 사용할 수 있습니다.
 * 서버 컴포넌트(app/page.tsx)에서 이 컴포넌트를 import해 사용합니다.
 */

import styled from 'styled-components';
import Example from './Example';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
`;

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export default function HomeContent() {
  return (
    <Main>
      <Heading>Next.js 보일러플레이트</Heading>
      <Description>TypeScript · Styled-Components · Jotai</Description>
      {/* 아래 예제 컴포넌트는 패턴 참고용입니다. 실제 개발 시 삭제하세요. */}
      <Example />
    </Main>
  );
}
