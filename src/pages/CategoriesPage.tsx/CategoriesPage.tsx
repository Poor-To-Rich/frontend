import DefaultHeader from '@/components/header/DefaultHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import CategoryList from '@/pages/CategoriesPage.tsx/components/CategoryList';
import DefaultModal from '@/components/modal/DefaultModal';
import useModal from '@/hooks/useModal';
import { useEffect, useRef } from 'react';
import useGetDefaultCategory from '@/hooks/apis/category/useGetDefaultCategory';
import { IncomeExpenseType } from '@/types/transactionTypes';
import useGetCustomCategory from '@/hooks/apis/category/useGetCustomCategory';
import useDeleteCategory from '@/hooks/apis/category/useDeleteCategory';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const categoryRef = useRef<{ name: string; id: number }>({ name: '', id: -1 });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') as IncomeExpenseType;

  const { data: defaultCategories } = useGetDefaultCategory(type);
  const { data: customCategories } = useGetCustomCategory(type);
  const { mutate: deleteCategory, isSuccess } = useDeleteCategory(type);

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
  }, [isSuccess]);

  return (
    <div className="w-full h-full relative">
      <DefaultHeader
        label={`${type} 카테고리`}
        hasBackButton
        hasPlusButton
        onClick={() => navigate(`/category?type=add&categoryType=${type}`)}
      />
      <div className="flex flex-col gap-4 py-8">
        <CategoryList label="기본" defaultCategories={defaultCategories} />
        <CategoryList
          label="사용자 지정"
          type={type}
          customCategories={customCategories}
          handleDeleteIconClick={handleDeleteIconClick}
        />
      </div>
      {isOpen && (
        <DefaultModal
          content={`"${categoryRef.current.name}"(을)를 삭제하시겠습니까?`}
          onClick={() => handleDeleteCategory(categoryRef.current.id)}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
