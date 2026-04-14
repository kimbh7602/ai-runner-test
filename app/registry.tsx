'use client';

/**
 * Styled-Components SSR registry
 *
 * Next.js App Router에서 서버 사이드 렌더링 시 스타일을 수집해
 * HTML에 삽입하기 위한 컴포넌트입니다.
 * 공식 Next.js 문서의 useServerInsertedHTML 패턴을 따릅니다.
 *
 * 참고: clearTag()는 styled-components v6의 내부 API입니다.
 * 메이저 버전 업그레이드 시 동작을 확인하세요.
 * (관련 이슈: https://github.com/styled-components/styled-components/issues/3738)
 */

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // clearTag()는 수집된 스타일을 초기화하여 중복 삽입을 방지합니다.
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // StyleSheetManager를 항상 렌더링하여 SSR/CSR 모두에서 일관된 스타일 수집을 보장합니다.
  // typeof window 분기를 사용하지 않아 hydration mismatch를 방지합니다.
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
