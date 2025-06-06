import App from '@/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { LocationDisplay } from './LocationDisplay';
import { render } from '@testing-library/react';

export const Wrapper = ({ children, initialEntry }: { children: ReactNode; initialEntry: string }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

export const renderAddPage = () => {
  return render(<App />, {
    wrapper: ({ children }) => {
      return (
        <Wrapper initialEntry={`/transaction?type=add&date=${format(new Date(), 'yyyy-MM-dd')}`}>
          {children}
          <LocationDisplay />
        </Wrapper>
      );
    },
  });
};

export const renderEditPage = (id: string, transactionType: string) => {
  return render(<App />, {
    wrapper: ({ children }) => {
      return (
        <Wrapper
          initialEntry={`/transaction?type=edit&date=${format(new Date(), 'yyyy-MM-dd')}&id=${id}&transactionType=${transactionType}`}>
          {children}
          <LocationDisplay />
        </Wrapper>
      );
    },
  });
};
