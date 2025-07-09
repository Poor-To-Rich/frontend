import { setupServer } from 'msw/node';
import { authHandlers } from '@/mocks/handler/authHandlers';
import { emailHandlers } from '@/mocks/handler/emailHandlers';
import { tokenHandlers } from '@/mocks/handler/tokenHandlers';
import { transactionHandlers } from '@/mocks/handler/transactionHandlers';
import { categoryHandlers } from '@/mocks/handler/categoryHandlers';
import { totalHandlers } from '@/mocks/handler/totalHandlers';

export const server = setupServer(
  ...tokenHandlers,
  ...authHandlers,
  ...emailHandlers,
  ...transactionHandlers,
  ...totalHandlers,
  ...categoryHandlers,
);
