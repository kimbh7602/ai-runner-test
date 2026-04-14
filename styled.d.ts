import type { Theme } from './styles/theme';

// styled-components DefaultTheme을 프로젝트 테마 타입으로 확장
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
