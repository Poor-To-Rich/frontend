import App from '@/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { LocationDisplay } from './LocationDisplay';
import { act, render } from '@testing-library/react';

export const Wrapper = ({ children, initialEntry }: { children: ReactNode; initialEntry: string }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

export const renderAddPage = async (date?: Date) => {
  await act(async () => {
    render(<App />, {
      wrapper: ({ children }) => (
        <Wrapper initialEntry={`/add-transaction?date=${format(date || new Date(), 'yyyy-MM-dd')}`}>
          {children}
          <LocationDisplay />
        </Wrapper>
      ),
    });
  });
};

export const renderEditPage = async (id: string, transactionType: string) => {
  await act(async () => {
    render(<App />, {
      wrapper: ({ children }) => {
        return (
          <Wrapper
            initialEntry={`/edit-transaction?date=${format(new Date(), 'yyyy-MM-dd')}&id=${id}&transactionType=${transactionType}`}>
            {children}
            <LocationDisplay />
          </Wrapper>
        );
      },
    });
  });
};
