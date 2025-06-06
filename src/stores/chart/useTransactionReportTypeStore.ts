import { IncomeExpenseType } from '@/types/transactionTypes';
import { create } from 'zustand';

interface TransactionState {
  currentTransactionType: IncomeExpenseType;
  setCurrentTransactionType: (transactionType: IncomeExpenseType) => void;
  clearTransactionType: () => void;
}

export const useTransactionReportTypeStore = create<TransactionState>(set => ({
  currentTransactionType: '지출',
  setCurrentTransactionType: transactionType => set({ currentTransactionType: transactionType }),
  clearTransactionType: () => set({ currentTransactionType: '지출' }),
}));
