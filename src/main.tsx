import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from 'react-hot-toast';
import ScrollToUp from '@/utils/ScrollToUp';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

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
    </BrowserRouter>
    <Toaster />
  </QueryClientProvider>,
);
