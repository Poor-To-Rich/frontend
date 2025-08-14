import { useNavigate, useLocation } from 'react-router-dom';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { useDraftStore } from '@/stores/useDraftStore';
import { useRef } from 'react';

export const useTransactionBack = (initialDate: string) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setCalenderDate } = useCalenderDateStore();
  const { disableSave } = useDraftStore();

  const dateRef = useRef(initialDate);

  const handleBack = () => {
    if ((pathname === '/add-transaction' || pathname === '/edit-transaction') && dateRef.current) {
      disableSave();
      sessionStorage.removeItem('transaction-form-data');
      setCalenderDate(new Date(dateRef.current));
    }
    navigate(-1);
  };

  return handleBack;
};
