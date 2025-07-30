import { setupWorker } from 'msw/browser';
import { authHandlers } from '@/mocks/handler/authHandlers';
import { emailHandlers } from '@/mocks/handler/emailHandlers';
import { loginHandlers } from '@/mocks/handler/loginHandlers';
import { tokenHandlers } from '@/mocks/handler/tokenHandlers';
import { totalHandlers } from '@/mocks/handler/totalHandlers';
import { transactionHandlers } from '@/mocks/handler/transactionHandlers';
import { categoryHandlers } from '@/mocks/handler/categoryHandlers';
import { chartHandlers } from '@/mocks/handler/chartHandlers';
import { categoryLogsHandler } from '@/mocks/handler/categoryLogsHandler';
import { chatHandlers } from '@/mocks/handler/chatHandlers';

export const worker = setupWorker(
  ...loginHandlers,
  ...tokenHandlers,
  ...authHandlers,
  ...emailHandlers,
  ...totalHandlers,
  ...transactionHandlers,
  ...categoryHandlers,
  ...chartHandlers,
  categoryLogsHandler,
  ...chatHandlers,
);
