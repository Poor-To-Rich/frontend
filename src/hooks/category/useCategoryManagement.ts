import useModal from '@/hooks/useModal';
import { useEffect, useRef } from 'react';
import useGetDefaultCategory from '@/hooks/apis/category/useGetDefaultCategory';
import { IncomeExpenseType } from '@/types/transactionTypes';
import useGetCustomCategory from '@/hooks/apis/category/useGetCustomCategory';
import useDeleteCategory from '@/hooks/apis/category/useDeleteCategory';
import { useLocation } from 'react-router-dom';
import { CategoryRef } from '@/types/categoryTypes';

export const useCategoryManagement = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const categoryRef = useRef<CategoryRef>({ name: '', id: -1 });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') as IncomeExpenseType;

  const { data: defaultCategories, isPending: isGetDefaultCategories } = useGetDefaultCategory(type);
  const { data: customCategories, isPending: isGetCustomCategories } = useGetCustomCategory(type);
  const { mutate: deleteCategory, isSuccess, isPending: isDeletePending } = useDeleteCategory(type);

  const handleDeleteIconClick = (id: number, name: string) => {
    categoryRef.current = { name, id };
    openModal();
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory(id.toString());
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  return {
    type,
    isOpen,
    closeModal,
    defaultCategories,
    customCategories,
    categoryRef,
    isGetPending: isGetDefaultCategories || isGetCustomCategories,
    isDeletePending,
    handleDeleteIconClick,
    handleDeleteCategory,
  };
};
