'use client';

/**
 * 대시보드 콘텐츠 — 클라이언트 컴포넌트
 *
 * KPI 카드 4종 + 차트 4종(Line/Pie/Bar/Area) + 분석 테이블로 구성된
 * 더미 데이터 기반 분석 대시보드. 다크 테마 디자인 시스템 적용.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import styled from 'styled-components';
import { motion, MotionConfig } from 'framer-motion';

import {
  MONTHLY_REVENUE,
  CATEGORY_SALES,
  DAILY_VISITORS,
  WEEKLY_PERFORMANCE,
  KPI_DATA,
  TOP_PAGES,
  CHART_COLORS,
} from '@/data/dashboard';

/* ------------------------------------------------------------------ */
/* PieChart 색상 팔레트 (방어적 순환 접근)                                 */
/* ------------------------------------------------------------------ */

const PIE_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.purple,
  CHART_COLORS.violet,
  CHART_COLORS.green,
  CHART_COLORS.amber,
];

/* ------------------------------------------------------------------ */
/* 애니메이션 variants                                                   */
/* ------------------------------------------------------------------ */

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ------------------------------------------------------------------ */
/* 레이아웃                                                              */
/* ------------------------------------------------------------------ */

const Page = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
`;

/* ------------------------------------------------------------------ */
/* 헤더                                                                  */
/* ------------------------------------------------------------------ */

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 800;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.white} 0%,
    ${({ theme }) => theme.colors.accent.light} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const PageSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const DateBadge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.glowHover};
  border: 1px solid ${({ theme }) => theme.colors.glowBorder};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.accent.light};
  font-weight: 500;
`;

/* ------------------------------------------------------------------ */
/* KPI 카드                                                              */
/* ------------------------------------------------------------------ */

const KpiGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const KpiCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.glowBorder};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.glowCard};
  }
`;

const KpiLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
`;

const KpiValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const KpiChange = styled.div<{ $positive: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.success : theme.colors.error};
`;

const KpiSparkline = styled.div`
  height: 36px;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

/* ------------------------------------------------------------------ */
/* 차트 그리드                                                            */
/* ------------------------------------------------------------------ */

const ChartGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ChartCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.glowBorder};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.glowCard};
  }
`;

const ChartTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ChartArea = styled.div`
  height: 240px;
`;

/* ------------------------------------------------------------------ */
/* 분석 테이블                                                            */
/* ------------------------------------------------------------------ */

const TableCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  overflow-x: auto;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.glowBorder};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.glowCard};
  }
`;

const TableTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
`;

const Td = styled.td`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  tr:last-child & {
    border-bottom: none;
  }
`;

const TdMono = styled(Td)`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.accent.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

/* ------------------------------------------------------------------ */
/* Recharts 커스텀 툴팁                                                  */
/* ------------------------------------------------------------------ */

const TooltipBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TooltipLabel = styled.div`
  font-weight: 700;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

interface TooltipEntry {
  name?: string | number;
  value?: number | string | Array<number | string>;
  color?: string;
}

function CustomTooltip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  formatter?: (value: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <TooltipBox>
      <TooltipLabel>{label}</TooltipLabel>
      {payload.map((p, i) => {
        const numValue = typeof p.value === 'number' ? p.value : Number(p.value ?? 0);
        return (
          <div key={`${String(p.name)}-${i}`} style={{ color: p.color }}>
            {p.name}: {formatter ? formatter(numValue) : numValue.toLocaleString()}
          </div>
        );
      })}
    </TooltipBox>
  );
}

/* ------------------------------------------------------------------ */
/* 메인 컴포넌트                                                          */
/* ------------------------------------------------------------------ */

export default function DashboardContent() {
  // SSR 하이드레이션 불일치 방지: 날짜는 클라이언트 마운트 후 설정
  const [today, setToday] = useState('');
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Page>
        <Inner>
          {/* 헤더 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ duration: 0.4 }}
          >
            <Header>
              <HeaderLeft>
                <BackLink href="/">← 홈으로</BackLink>
                <PageTitle>대시보드</PageTitle>
                <PageSubtitle>더미 데이터 기반 분석 화면</PageSubtitle>
              </HeaderLeft>
              {today && <DateBadge>{today}</DateBadge>}
            </Header>
          </motion.div>

          {/* KPI 카드 */}
          <KpiGrid
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {KPI_DATA.map((kpi) => (
              <KpiCard key={kpi.label} variants={fadeUpVariants} transition={{ duration: 0.4 }}>
                <KpiLabel>{kpi.label}</KpiLabel>
                <KpiValue>{kpi.value}</KpiValue>
                <KpiChange $positive={kpi.change >= 0}>
                  {kpi.change >= 0 ? '▲' : '▼'} {Math.abs(kpi.change)}% 전월 대비
                </KpiChange>
                <KpiSparkline>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={kpi.sparkline.map((v, i) => ({ i, v }))}>
                      <Line
                        type="monotone"
                        dataKey="v"
                        stroke={kpi.change >= 0 ? CHART_COLORS.green : CHART_COLORS.primary}
                        strokeWidth={2}
                        dot={false}
                        animationDuration={800}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </KpiSparkline>
              </KpiCard>
            ))}
          </KpiGrid>

          {/* 차트 4종 */}
          <ChartGrid
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* 월별 매출 추이 — LineChart */}
            <ChartCard variants={fadeUpVariants} transition={{ duration: 0.4 }}>
              <ChartTitle>월별 매출 추이</ChartTitle>
              <ChartArea role="img" aria-label="올해와 작년 월별 매출 추이 비교 선형 차트">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MONTHLY_REVENUE}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                    <XAxis dataKey="month" tick={{ fill: CHART_COLORS.text, fontSize: 11 }} />
                    <YAxis
                      tick={{ fill: CHART_COLORS.text, fontSize: 11 }}
                      tickFormatter={(v: number) => `${(v / 1000000).toFixed(0)}M`}
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          formatter={(v) => `₩${v.toLocaleString()}`}
                        />
                      }
                    />
                    <Legend wrapperStyle={{ color: CHART_COLORS.text, fontSize: 12 }} />
                    <Line
                      type="monotone"
                      dataKey="올해"
                      stroke={CHART_COLORS.primary}
                      strokeWidth={2}
                      dot={{ r: 3, fill: CHART_COLORS.primary }}
                      activeDot={{ r: 5 }}
                      animationDuration={800}
                    />
                    <Line
                      type="monotone"
                      dataKey="작년"
                      stroke={CHART_COLORS.purple}
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ r: 3, fill: CHART_COLORS.purple }}
                      activeDot={{ r: 5 }}
                      animationDuration={800}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartArea>
            </ChartCard>

            {/* 카테고리별 매출 비율 — PieChart */}
            <ChartCard variants={fadeUpVariants} transition={{ duration: 0.4 }}>
              <ChartTitle>카테고리별 매출 비율</ChartTitle>
              <ChartArea role="img" aria-label="카테고리별 매출 비율 도넛 차트">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CATEGORY_SALES}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      animationDuration={800}
                    >
                      {CATEGORY_SALES.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, '비율']}
                      contentStyle={{
                        background: CHART_COLORS.tooltip,
                        border: `1px solid ${CHART_COLORS.grid}`,
                        borderRadius: 8,
                        fontSize: 12,
                        color: '#e5e5e5',
                      }}
                    />
                    <Legend
                      wrapperStyle={{ color: CHART_COLORS.text, fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartArea>
            </ChartCard>

            {/* 일별 방문자 수 — BarChart */}
            <ChartCard variants={fadeUpVariants} transition={{ duration: 0.4 }}>
              <ChartTitle>일별 방문자 수 (최근 14일)</ChartTitle>
              <ChartArea role="img" aria-label="최근 14일간 일별 방문자 수 막대 차트">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DAILY_VISITORS}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                    <XAxis dataKey="day" tick={{ fill: CHART_COLORS.text, fontSize: 11 }} />
                    <YAxis tick={{ fill: CHART_COLORS.text, fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="방문자"
                      fill={CHART_COLORS.primary}
                      radius={[4, 4, 0, 0]}
                      animationDuration={800}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartArea>
            </ChartCard>

            {/* 주간 성과 트렌드 — AreaChart */}
            <ChartCard variants={fadeUpVariants} transition={{ duration: 0.4 }}>
              <ChartTitle>주간 성과 트렌드</ChartTitle>
              <ChartArea role="img" aria-label="최근 7일 페이지뷰 및 세션 수 영역 차트">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={WEEKLY_PERFORMANCE}>
                    <defs>
                      <linearGradient id="colorPageview" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorSession" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS.green} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={CHART_COLORS.green} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                    <XAxis dataKey="day" tick={{ fill: CHART_COLORS.text, fontSize: 11 }} />
                    <YAxis tick={{ fill: CHART_COLORS.text, fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: CHART_COLORS.text, fontSize: 12 }} />
                    <Area
                      type="monotone"
                      dataKey="페이지뷰"
                      stroke={CHART_COLORS.primary}
                      strokeWidth={2}
                      fill="url(#colorPageview)"
                      animationDuration={800}
                    />
                    <Area
                      type="monotone"
                      dataKey="세션"
                      stroke={CHART_COLORS.green}
                      strokeWidth={2}
                      fill="url(#colorSession)"
                      animationDuration={800}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartArea>
            </ChartCard>
          </ChartGrid>

          {/* 분석 테이블 */}
          <TableCard
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <TableTitle>상위 페이지 분석</TableTitle>
            <StyledTable>
              <thead>
                <tr>
                  <Th>페이지</Th>
                  <Th>방문 수</Th>
                  <Th>평균 체류 시간</Th>
                  <Th>이탈률</Th>
                </tr>
              </thead>
              <tbody>
                {TOP_PAGES.map((row) => (
                  <tr key={row.page}>
                    <TdMono>{row.page}</TdMono>
                    <Td>{row.방문수.toLocaleString()}</Td>
                    <Td>{row.체류시간}</Td>
                    <Td>{row.이탈률}</Td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableCard>
        </Inner>
      </Page>
    </MotionConfig>
  );
}
