'use client';

/**
 * 앱 전역 Provider 통합 컴포넌트
 *
 * - ThemeProvider: Styled-Components 테마 주입
 * - GlobalStyle: 전역 CSS 리셋 및 기본 스타일
 * - Jotai Provider: 전역 상태 스토어 초기화
 */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider as JotaiProvider } from 'jotai';
import { theme } from '@/styles/theme';
import { GlobalStyle } from '@/styles/global';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </JotaiProvider>
  );
}
