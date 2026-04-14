'use client';

/**
 * 예제 컴포넌트 — 삭제 가능
 *
 * Styled-Components + Jotai 연동 패턴을 보여주는 카운터 예제입니다.
 * 실제 프로젝트 시작 시 이 파일과 store/atoms.ts의 예제 atom을 제거하세요.
 */

import styled from 'styled-components';
import { useAtom, useAtomValue } from 'jotai';
import { counterAtom, isEvenAtom } from '@/store/atoms';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 320px;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Count = styled.span<{ $isEven: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 700;
  color: ${({ theme, $isEven }) =>
    $isEven ? theme.colors.primary : theme.colors.error};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Button = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    opacity: 0.7;
  }
`;

const ResetButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.text.secondary};
`;

const Label = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export default function Example() {
  const [count, setCount] = useAtom(counterAtom);
  const isEven = useAtomValue(isEvenAtom);

  return (
    <Wrapper>
      <Title>Jotai 카운터 예제</Title>
      <Count $isEven={isEven}>{count}</Count>
      <Label>{isEven ? '짝수' : '홀수'}</Label>
      <ButtonGroup>
        <Button onClick={() => setCount((c) => c - 1)}>-1</Button>
        <Button onClick={() => setCount((c) => c + 1)}>+1</Button>
        <ResetButton onClick={() => setCount(0)}>초기화</ResetButton>
      </ButtonGroup>
    </Wrapper>
  );
}
