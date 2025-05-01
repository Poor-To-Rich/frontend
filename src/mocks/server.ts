import { setupServer } from 'msw/node';
import { authHandlers } from '@/mocks/handler/authHandlers';
import { emailHandlers } from '@/mocks/handler/emailHandlers';
import { loginHandlers } from '@/mocks/handler/loginHandlers';
import { tokenHandlers } from '@/mocks/handler/tokenHandlers';

export const server = setupServer(...loginHandlers, ...tokenHandlers, ...authHandlers, ...emailHandlers);
