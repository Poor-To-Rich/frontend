import { IncomeExpenseButtonType } from '@/types/transactionTypes';
import { create } from 'zustand';

interface TransactionState {
  transactionType: IncomeExpenseButtonType;
  setTransactionType: (transactionType: IncomeExpenseButtonType) => void;
}

export const useTransactionTypeStore = create<TransactionState>(set => ({
  transactionType: '지출',
  setTransactionType: transactionType => set({ transactionType }),
}));
