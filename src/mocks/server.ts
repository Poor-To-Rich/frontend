import { setupServer } from 'msw/node';
import { authHandlers } from '@/mocks/handler/authHandlers';
import { emailHandlers } from '@/mocks/handler/emailHandlers';
import { tokenHandlers } from './handler/tokenHandlers';
import { transactionHandlers } from './handler/transactionHandlers';

export const server = setupServer(...tokenHandlers, ...authHandlers, ...emailHandlers, ...transactionHandlers);
