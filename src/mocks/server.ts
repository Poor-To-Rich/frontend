import { setupServer } from 'msw/node';
import { authHandlers } from '@/mocks/handler/authHandlers';
import { emailHandlers } from '@/mocks/handler/emailHandlers';
import { loginHandlers } from '@/mocks/handler/loginHandlers';

export const server = setupServer(...authHandlers, ...emailHandlers, ...loginHandlers);
