import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from 'react-hot-toast';
import ScrollToUp from '@/utils/ScrollToUp';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

if (typeof window !== 'undefined') {
  if (import.meta.env.DEV) {
    const { worker } = await import('@/mocks/browser');
    await worker.start();
  }
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToUp />
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </BrowserRouter>
    <Toaster />
  </QueryClientProvider>,
);
