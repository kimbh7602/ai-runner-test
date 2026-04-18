'use client';

/**
 * BorderGlowCard — 마우스 위치를 추적하는 인터랙티브 border-glow 래퍼
 *
 * 기본 상태에서는 정적 border를 표시하고, hover 시 마우스 위치를 따라
 * radial-gradient border-glow가 활성화됩니다.
 *
 * 원리:
 *   - GlowWrapper: padding 1px + background(정적 border 색 or glow gradient)
 *   - ::before pseudo-element: gradient overlay (hover 시 opacity 1)
 *   - GlowInner: 카드 배경으로 내부를 채워 1px padding만 border처럼 보이게 함
 *
 * GlowWrapper를 motion.div 기반으로 구성하여 framer-motion의 variant
 * propagation chain이 유지됩니다 (staggerChildren 정상 동작).
 */

import { useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* 스타일                                                                */
/* ------------------------------------------------------------------ */

/* motion.div 기반 — framer-motion variant propagation 유지 */
const GlowWrapper = styled(motion.div)<{ $borderRadius: string }>`
  position: relative;
  border-radius: ${({ $borderRadius }) => $borderRadius};
  /* 기본 상태: 정적 border 색을 배경으로 사용 (padding 1px으로 테두리처럼 보임) */
  background: ${({ theme }) => theme.colors.border};
  padding: 1px;

  /* glow 레이어 — 마우스 위치에 따라 이동 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      circle 150px at var(--mouse-x, 50%) var(--mouse-y, 50%),
      ${({ theme }) => theme.colors.glowBorderGlow},
      transparent 80%
    );
    opacity: var(--glow-opacity, 0);
    transition: opacity 0.35s ease;
    pointer-events: none;
  }

  /* hover 시에만 GPU 레이어 생성 — 상시 적용 시 불필요한 메모리 사용 방지 */
  &:hover::before {
    will-change: opacity;
  }

  /* 모바일/터치 기기에서는 glow 비활성화 — 정적 border만 표시 */
  @media (hover: none) {
    &::before {
      display: none;
    }
  }

  /* 접근성: 움직임 감소 설정 시 glow 비활성화 */
  @media (prefers-reduced-motion: reduce) {
    &::before {
      display: none;
    }
  }
`;

const GlowInner = styled.div<{ $borderRadius: string }>`
  position: relative;
  border-radius: ${({ $borderRadius }) => $borderRadius};
  /* 내부를 배경색으로 채워 GlowWrapper의 1px padding이 border처럼 보이게 함 */
  background: ${({ theme }) => theme.colors.surface};
`;

/* ------------------------------------------------------------------ */
/* 컴포넌트                                                              */
/* ------------------------------------------------------------------ */

interface BorderGlowCardProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
}

export default function BorderGlowCard({
  children,
  className,
  borderRadius = '0.75rem',
}: BorderGlowCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    /* CSS 변수를 직접 조작하여 리렌더링 없이 위치 업데이트 */
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    wrapperRef.current?.style.setProperty('--glow-opacity', '1');
  }, []);

  const handleMouseLeave = useCallback(() => {
    wrapperRef.current?.style.setProperty('--glow-opacity', '0');
  }, []);

  return (
    <GlowWrapper
      ref={wrapperRef}
      $borderRadius={borderRadius}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GlowInner $borderRadius={borderRadius}>{children}</GlowInner>
    </GlowWrapper>
  );
}
