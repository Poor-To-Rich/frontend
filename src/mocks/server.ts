import { setupServer } from 'msw/node';
import { authHandlers } from '@/mocks/handler/authHandlers';
import { emailHandlers } from '@/mocks/handler/emailHandlers';
import { loginHandlers } from '@/mocks/handler/loginHandlers';
import { tokenHandler } from '@/mocks/handler/tokenHandler';

export const server = setupServer(...loginHandlers, ...tokenHandler, ...authHandlers, ...emailHandlers);
