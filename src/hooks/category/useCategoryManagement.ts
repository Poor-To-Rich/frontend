import useModal from '@/hooks/useModal';
import { useRef } from 'react';
import { IncomeExpenseType } from '@/types/transactionTypes';
import useDeleteCategory from '@/hooks/apis/category/useDeleteCategory';
import { useLocation } from 'react-router-dom';
import { CategoryRef } from '@/types/categoryTypes';

export const useCategoryManagement = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const categoryRef = useRef<CategoryRef>({ name: '', id: -1 });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') as IncomeExpenseType;

  const { mutate: deleteCategory, isPending: isDeletePending } = useDeleteCategory(type, closeModal);

  const handleDeleteIconClick = (id: number, name: string) => {
    categoryRef.current = { name, id };
    openModal();
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory(id.toString());
  };

  return {
    type,
    isOpen,
    closeModal,
    categoryRef,
    isDeletePending,
    handleDeleteIconClick,
    handleDeleteCategory,
  };
};
