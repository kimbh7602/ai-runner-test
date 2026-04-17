'use client';

/**
 * 홈 랜딩 페이지 콘텐츠 — 클라이언트 컴포넌트
 *
 * Hero / Features / Stats / Testimonials / FAQ / CTA / Footer 섹션으로 구성된
 * 다크 테마 랜딩 페이지. Framer Motion으로 스크롤 기반 애니메이션을 적용합니다.
 */

import { memo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* 애니메이션 variants                                                   */
/* ------------------------------------------------------------------ */

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};

const slideLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const slideRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

/* ------------------------------------------------------------------ */
/* 배경 글로우 keyframe                                                  */
/* ------------------------------------------------------------------ */

const glowPulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
`;

/* ------------------------------------------------------------------ */
/* 공통 레이아웃                                                         */
/* ------------------------------------------------------------------ */

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 560px;
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
  line-height: 1.7;
`;

/* ------------------------------------------------------------------ */
/* Hero 섹션                                                            */
/* ------------------------------------------------------------------ */

const HeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing['2xl']}`};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.secondary} 0%,
    ${({ theme }) => theme.colors.gradient.heroMid} 60%,
    ${({ theme }) => theme.colors.background} 100%
  );
  color: ${({ theme }) => theme.colors.white};
  gap: ${({ theme }) => theme.spacing.xl};
  overflow: hidden;
`;

const HeroGlow = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.colors.glow} 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${glowPulse} 4s ease-in-out infinite;
  pointer-events: none;
`;

const HeroBadge = styled(motion.span)`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.glowHover};
  border: 1px solid ${({ theme }) => theme.colors.glowBorder};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.accent.light};
  font-weight: 500;
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 800;
  line-height: 1.15;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.white} 0%, ${({ theme }) => theme.colors.accent.light} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.accent.muted};
  max-width: 560px;
  line-height: 1.7;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
`;

const CTAButtonPrimary = styled(motion.a)`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing['2xl']}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  box-shadow: 0 0 24px ${({ theme }) => theme.colors.glowBorder};

  &:hover {
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.white};
    outline-offset: 2px;
  }
`;

const CTAButtonSecondary = styled(motion.a)`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing['2xl']}`};
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.6);
    outline-offset: 2px;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing['2xl']};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: rgba(255, 255, 255, 0.4);
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const ScrollArrow = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  transform: rotate(45deg);
`;

/* ------------------------------------------------------------------ */
/* Features 섹션                                                        */
/* ------------------------------------------------------------------ */

const FeaturesSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing['2xl']}`};
  background-color: ${({ theme }) => theme.colors.background};
`;

const FeatureGrid = styled(motion.div)`
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

const FeatureCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.glowBorder};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.glowCard};
  }
`;

const FeatureIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
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
/* Stats 섹션                                                           */
/* ------------------------------------------------------------------ */

const StatsSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing['2xl']}`};
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.gradient.sectionDark} 100%);
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.breakpoints.lg};
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

/* ------------------------------------------------------------------ */
/* Testimonials 섹션                                                    */
/* ------------------------------------------------------------------ */

const TestimonialsSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing['2xl']}`};
  background-color: ${({ theme }) => theme.colors.gradient.sectionDark};
  overflow: hidden;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.breakpoints.lg};
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TestimonialCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const TestimonialText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const AuthorAvatar = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: white;
  flex-shrink: 0;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const AuthorName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const AuthorRole = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StarRating = styled.div`
  color: ${({ theme }) => theme.colors.star};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: 2px;
`;

/* ------------------------------------------------------------------ */
/* FAQ 섹션                                                             */
/* ------------------------------------------------------------------ */

const FAQSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing['2xl']}`};
  background-color: ${({ theme }) => theme.colors.background};
`;

const FAQList = styled.div`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FAQItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const FAQQuestion = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  gap: ${({ theme }) => theme.spacing.md};

  &:hover {
    background: ${({ theme }) => theme.colors.glowHover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }
`;

const FAQIcon = styled(motion.span)`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

const FAQAnswer = styled(motion.div)`
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`;

const FAQAnswerInner = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
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
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.gradient.sectionDark} 0%,
    ${({ theme }) => theme.colors.gradient.heroMid} 50%,
    ${({ theme }) => theme.colors.gradient.sectionDark} 100%
  );
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CTATitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const CTADescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 480px;
  line-height: 1.7;
`;

const CTAContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => `${theme.spacing['2xl']} ${theme.spacing['2xl']}`};
`;

const FooterInner = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.lg};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FooterLogo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;

const FooterTagline = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  max-width: 300px;
`;

const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FooterColumnTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FooterLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const FooterBottom = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.lg};
  margin: ${({ theme }) => theme.spacing['2xl']} auto 0;
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

/* ------------------------------------------------------------------ */
/* 데이터                                                                */
/* ------------------------------------------------------------------ */

const FEATURES = [
  { icon: '⚡', title: '빠른 성능', description: 'Next.js 15 App Router 기반으로 서버 사이드 렌더링과 정적 생성을 최적화합니다.' },
  { icon: '🎨', title: '디자인 시스템', description: 'Styled-Components와 테마 토큰으로 일관된 UI를 손쉽게 구축할 수 있습니다.' },
  { icon: '🔄', title: '상태 관리', description: 'Jotai를 활용해 간결하고 예측 가능한 전역 상태 관리를 제공합니다.' },
  { icon: '📊', title: '실시간 분석', description: '스트리밍 데이터 파이프라인과 실시간 대시보드로 비즈니스 인사이트를 즉시 파악합니다.' },
  { icon: '🔐', title: '엔터프라이즈 보안', description: 'JWT 인증, RBAC, 감사 로그 등 기업 수준의 보안 기능을 기본 제공합니다.' },
  { icon: '🌐', title: 'API 통합', description: 'REST·GraphQL·WebSocket 등 다양한 프로토콜로 외부 서비스와 손쉽게 연동합니다.' },
  { icon: '🌏', title: '다국어 지원', description: 'i18n 내장 지원으로 글로벌 서비스 런칭에 필요한 현지화를 간단하게 처리합니다.' },
  { icon: '☁️', title: '클라우드 배포', description: 'Vercel, AWS, GCP 등 주요 클라우드 플랫폼에 원클릭 배포 파이프라인을 제공합니다.' },
  { icon: '👥', title: '팀 협업', description: '역할 기반 권한 관리와 공유 워크스페이스로 팀 단위 개발 생산성을 극대화합니다.' },
] as const;

const STATS = [
  { value: '10,000+', label: '활성 사용자' },
  { value: '99.9%', label: '서비스 가동 시간' },
  { value: '50ms', label: '평균 응답 속도' },
  { value: '12개', label: '지원 언어' },
] as const;

const TESTIMONIALS = [
  {
    text: '이 플랫폼 덕분에 대시보드 개발 기간이 절반으로 줄었습니다. 다크 테마와 컴포넌트 시스템이 특히 마음에 들어요.',
    name: '김민준',
    role: '프론트엔드 엔지니어 @ 스타트업코드',
    initial: '김',
    color: '#6366f1',
  },
  {
    text: '실시간 분석 기능이 정말 탁월합니다. 대용량 데이터를 처리하면서도 성능 저하가 거의 없었습니다.',
    name: '이서연',
    role: '데이터 엔지니어 @ 데이터랩스',
    initial: '이',
    color: '#8b5cf6',
  },
  {
    text: 'Jotai 기반 상태 관리와 SSR 조합이 완벽합니다. 팀 온보딩 시간도 크게 줄었어요.',
    name: '박도현',
    role: '풀스택 개발자 @ 클라우드팜',
    initial: '박',
    color: '#a855f7',
  },
  {
    text: '보안 기능이 기본 내장되어 있어 별도 구성 없이 엔터프라이즈 요구사항을 바로 충족할 수 있었습니다.',
    name: '최지아',
    role: '시니어 개발자 @ 핀테크웨이브',
    initial: '최',
    color: '#7c3aed',
  },
] as const;

const FAQ_ITEMS = [
  {
    question: '설치 방법은 어떻게 되나요?',
    answer: 'GitHub에서 저장소를 클론한 뒤 npm install을 실행하세요. Node.js 18 이상이 필요합니다. 이후 npm run dev로 개발 서버를 시작할 수 있습니다.',
  },
  {
    question: '어떤 기술 스택을 사용하나요?',
    answer: 'Next.js 15 (App Router), TypeScript, Styled-Components, Jotai, Framer Motion을 핵심 스택으로 사용합니다. 빌드 도구는 Next.js 내장 Webpack/Turbopack을 활용합니다.',
  },
  {
    question: '커스터마이징이 가능한가요?',
    answer: '물론입니다. styles/theme.ts에서 컬러, 타이포그래피, 스페이싱 토큰을 한 곳에서 관리할 수 있으며, 각 컴포넌트는 Styled-Components로 완전히 커스터마이징 가능합니다.',
  },
  {
    question: '라이선스는 무엇인가요?',
    answer: 'MIT 라이선스로 배포됩니다. 개인 및 상업적 프로젝트에 자유롭게 사용할 수 있으며, 수정 및 재배포도 허용됩니다.',
  },
  {
    question: '기술 지원 채널이 있나요?',
    answer: 'GitHub Issues를 통해 버그 리포트와 기능 요청을 받고 있습니다. 커뮤니티 디스코드 채널에서 실시간 도움도 받을 수 있습니다.',
  },
  {
    question: '업데이트 주기는 어떻게 되나요?',
    answer: '주요 Next.js 버전 업데이트와 함께 분기별로 메이저 릴리즈를 진행합니다. 보안 패치는 즉시 반영됩니다.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* FAQ 아이템 컴포넌트                                                   */
/* ------------------------------------------------------------------ */

const FAQItemComponent = memo(function FAQItemComponent({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <FAQItem>
      <FAQQuestion onClick={() => setOpen(!open)}>
        {question}
        <FAQIcon animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          +
        </FAQIcon>
      </FAQQuestion>
      <AnimatePresence initial={false}>
        {open && (
          <FAQAnswer
            key="answer"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <FAQAnswerInner>{answer}</FAQAnswerInner>
          </FAQAnswer>
        )}
      </AnimatePresence>
    </FAQItem>
  );
});

/* ------------------------------------------------------------------ */
/* 메인 컴포넌트                                                         */
/* ------------------------------------------------------------------ */

export default function HomeContent() {
  return (
    <MotionConfig reducedMotion="user">
      <Page>
        {/* Hero 섹션 */}
        <HeroSection>
          <HeroGlow />
          <HeroBadge
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ✨ Next.js 15 · Framer Motion · TypeScript
          </HeroBadge>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            더 나은 대시보드를<br />경험하세요
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Next.js · TypeScript · Styled-Components · Jotai · Framer Motion으로
            구축된 현대적인 웹 애플리케이션 플랫폼. 빠르고, 안전하고, 아름답습니다.
          </HeroSubtitle>
          <HeroButtons
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <CTAButtonPrimary
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              시작하기
            </CTAButtonPrimary>
            <CTAButtonSecondary
              href="https://github.com/vercel/next.js"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub 보기
            </CTAButtonSecondary>
          </HeroButtons>
          <ScrollIndicator
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <span>스크롤</span>
            <ScrollArrow
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.2, repeat: 6, ease: 'easeInOut' }}
            />
          </ScrollIndicator>
        </HeroSection>

        {/* Features 섹션 */}
        <FeaturesSection id="features">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>주요 기능</SectionTitle>
            <SectionSubtitle>
              엔터프라이즈 수준의 기능을 처음부터 내장한 현대적인 개발 플랫폼을 경험하세요.
            </SectionSubtitle>
          </motion.div>
          <FeatureGrid
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
                variants={fadeUpVariants}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </FeaturesSection>

        {/* Stats 섹션 */}
        <StatsSection>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>수치로 증명합니다</SectionTitle>
            <SectionSubtitle>
              전 세계 개발팀이 신뢰하는 플랫폼의 실제 성과입니다.
            </SectionSubtitle>
          </motion.div>
          <StatsGrid
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {STATS.map((stat) => (
              <StatCard
                key={stat.label}
                variants={fadeUpVariants}
                transition={{ duration: 0.5 }}
              >
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </StatsSection>

        {/* Testimonials 섹션 */}
        <TestimonialsSection>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>개발자들의 이야기</SectionTitle>
            <SectionSubtitle>
              실제로 사용하는 개발자들이 직접 남긴 솔직한 후기입니다.
            </SectionSubtitle>
          </motion.div>
          <TestimonialsGrid>
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                variants={index % 2 === 0 ? slideLeftVariants : slideRightVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                <StarRating>★★★★★</StarRating>
                <TestimonialText>&ldquo;{testimonial.text}&rdquo;</TestimonialText>
                <TestimonialAuthor>
                  <AuthorAvatar $color={testimonial.color}>
                    {testimonial.initial}
                  </AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorRole>{testimonial.role}</AuthorRole>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </TestimonialsSection>

        {/* FAQ 섹션 */}
        <FAQSection>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>자주 묻는 질문</SectionTitle>
            <SectionSubtitle>
              궁금한 점이 있으시면 GitHub Issues나 디스코드 채널로도 문의하실 수 있습니다.
            </SectionSubtitle>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInVariants}
            transition={{ duration: 0.5 }}
          >
            <FAQList>
              {FAQ_ITEMS.map((item) => (
                <FAQItemComponent key={item.question} question={item.question} answer={item.answer} />
              ))}
            </FAQList>
          </motion.div>
        </FAQSection>

        {/* CTA 섹션 */}
        <CTASection>
          <CTAContent
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.5 }}
          >
            <CTATitle>지금 바로 시작하세요</CTATitle>
            <CTADescription>
              보일러플레이트를 활용해 빠르게 프로젝트를 시작하고, 팀과 함께 성장하세요.
              무료로 시작할 수 있으며 신용카드가 필요 없습니다.
            </CTADescription>
            <CTAButtonPrimary
              href="https://github.com/vercel/next.js"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub에서 보기
            </CTAButtonPrimary>
          </CTAContent>
        </CTASection>

        {/* Footer */}
        <Footer>
          <FooterInner>
            <FooterBrand>
              <FooterLogo>◆ DashBoard</FooterLogo>
              <FooterTagline>
                현대적인 웹 개발을 위한 Next.js 보일러플레이트. 빠른 개발, 견고한 구조, 아름다운 UI를 한 번에.
              </FooterTagline>
            </FooterBrand>
            <FooterNav aria-label="제품">
              <FooterColumnTitle>제품</FooterColumnTitle>
              <FooterLink href="#features">기능 소개</FooterLink>
              <FooterLink href="#features">문서</FooterLink>
              <FooterLink href="#features">변경 로그</FooterLink>
              <FooterLink href="#features">로드맵</FooterLink>
            </FooterNav>
            <FooterNav aria-label="리소스">
              <FooterColumnTitle>리소스</FooterColumnTitle>
              <FooterLink href="https://github.com/vercel/next.js" target="_blank" rel="noopener noreferrer">GitHub</FooterLink>
              <FooterLink href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js 공식 문서</FooterLink>
              <FooterLink href="https://www.framer.com/motion/" target="_blank" rel="noopener noreferrer">Framer Motion</FooterLink>
              <FooterLink href="#features">디스코드 커뮤니티</FooterLink>
            </FooterNav>
          </FooterInner>
          <FooterBottom>
            © 2026 DashBoard. MIT 라이선스로 배포됩니다.
          </FooterBottom>
        </Footer>
      </Page>
    </MotionConfig>
  );
}
