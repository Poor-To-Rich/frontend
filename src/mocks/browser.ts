import { setupWorker } from 'msw/browser';
import { authHandlers } from '@/mocks/handler/authHandlers';
import { emailHandlers } from '@/mocks/handler/emailHandlers';
import { loginHandlers } from '@/mocks/handler/loginHandlers';
import { tokenHandler } from '@/mocks/handler/tokenHandler';

export const worker = setupWorker(...loginHandlers, ...tokenHandler, ...authHandlers, ...emailHandlers);
