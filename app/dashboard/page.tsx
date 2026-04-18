import type { Metadata } from 'next';
import DashboardContent from '@/components/DashboardContent';

export const metadata: Metadata = {
  title: '대시보드 | Dashboard',
  description: '더미 데이터 기반의 분석 대시보드',
};

export default function DashboardPage() {
  return <DashboardContent />;
}
