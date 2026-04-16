'use client';

/**
 * 홈 랜딩 페이지 콘텐츠 — 클라이언트 컴포넌트
 *
 * Hero / Features / CTA 섹션으로 구성된 단일 페이지 랜딩 화면입니다.
 */

import styled from 'styled-components';

/* ------------------------------------------------------------------ */
/* 공통 레이아웃                                                         */
/* ------------------------------------------------------------------ */

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

/* ------------------------------------------------------------------ */
/* Hero 섹션                                                            */
/* ------------------------------------------------------------------ */

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing['2xl']}`};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.secondary} 0%,
    ${({ theme }) => theme.colors.primary} 100%
  );
  color: ${({ theme }) => theme.colors.white};
  gap: ${({ theme }) => theme.spacing.xl};
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 700;
  line-height: 1.2;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  opacity: 0.85;
  max-width: 560px;
  line-height: 1.7;
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing['2xl']}`};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: opacity 0.15s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.white};
    outline-offset: 2px;
  }
`;

/* ------------------------------------------------------------------ */
/* Features 섹션                                                        */
/* ------------------------------------------------------------------ */

const FeaturesSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing['2xl']}`};
  background-color: ${({ theme }) => theme.colors.background};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.breakpoints.lg};
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const FeatureIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FeatureDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
`;

/* ------------------------------------------------------------------ */
/* CTA 섹션                                                             */
/* ------------------------------------------------------------------ */

const CTASection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing['2xl']}`};
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CTATitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CTADescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 480px;
`;

const PrimaryCTAButton = styled.a`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing['2xl']}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: opacity 0.15s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/* ------------------------------------------------------------------ */
/* 기능 목록 데이터                                                      */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: '⚡',
    title: '빠른 성능',
    description:
      'Next.js 15 App Router 기반으로 서버 사이드 렌더링과 정적 생성을 최적화합니다.',
  },
  {
    icon: '🎨',
    title: '디자인 시스템',
    description:
      'Styled-Components와 테마 토큰으로 일관된 UI를 손쉽게 구축할 수 있습니다.',
  },
  {
    icon: '🔄',
    title: '상태 관리',
    description:
      'Jotai를 활용해 간결하고 예측 가능한 전역 상태 관리를 제공합니다.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* 컴포넌트                                                              */
/* ------------------------------------------------------------------ */

export default function HomeContent() {
  return (
    <Page>
      {/* Hero 섹션 */}
      <HeroSection>
        <HeroTitle>더 나은 대시보드를 경험하세요</HeroTitle>
        <HeroSubtitle>
          Next.js · TypeScript · Styled-Components · Jotai로 구축된 현대적인
          웹 애플리케이션 플랫폼
        </HeroSubtitle>
        <CTAButton href="#features">시작하기</CTAButton>
      </HeroSection>

      {/* Features 섹션 */}
      <FeaturesSection id="features">
        <SectionTitle>주요 기능</SectionTitle>
        <FeatureGrid>
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeaturesSection>

      {/* CTA 섹션 */}
      <CTASection>
        <CTATitle>지금 바로 시작하세요</CTATitle>
        <CTADescription>
          보일러플레이트를 활용해 빠르게 프로젝트를 시작하고, 팀과 함께
          성장하세요.
        </CTADescription>
        <PrimaryCTAButton
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub에서 보기
        </PrimaryCTAButton>
      </CTASection>
    </Page>
  );
}
