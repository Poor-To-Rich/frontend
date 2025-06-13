import '@testing-library/jest-dom'; // jest-dom을 사용하여 DOM 테스트
import { server } from '@/mocks/server';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// 모든 테스트 시작 전에 MSW 서버 시작
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// 각 테스트 종료 후 핸들러 초기화
afterEach(() => server.resetHandlers());

// 모든 테스트 종료 후 서버 종료
afterAll(() => server.close());
