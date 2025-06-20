import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from 'react-hot-toast';
import ScrollToUp from '@/utils/ScrollToUp';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/libs/queryClient.ts';
import GlobalErrorBoundary from '@/components/error/GlobalErrorBoundary.tsx';

if (typeof window !== 'undefined') {
  if (import.meta.env.DEV) {
    const { worker } = await import('@/mocks/browser');
    await worker.start();
  }
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <GlobalErrorBoundary>
        <ScrollToUp />
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </GlobalErrorBoundary>
    </BrowserRouter>
    <Toaster />
  </QueryClientProvider>,
);
