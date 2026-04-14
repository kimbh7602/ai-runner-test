import { atom } from 'jotai';

// 카운터 예제 atom — Jotai 연동 패턴 참고용
export const counterAtom = atom(0);

// 파생 atom 예제: 카운터 값이 짝수인지 여부
export const isEvenAtom = atom((get) => get(counterAtom) % 2 === 0);
