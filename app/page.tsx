/**
 * 홈 페이지 — 서버 컴포넌트
 *
 * 서버에서 데이터 페칭 등의 작업을 여기에 추가합니다.
 * Styled-Components는 클라이언트 컴포넌트에서만 사용 가능하므로
 * UI는 components/HomeContent.tsx (use client)에서 처리합니다.
 */

import HomeContent from '@/components/HomeContent';

export default function Home() {
  return <HomeContent />;
}
