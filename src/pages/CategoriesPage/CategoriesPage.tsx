import DefaultHeader from '@/components/header/DefaultHeader';
import { useNavigate } from 'react-router-dom';
import DefaultModal from '@/components/modal/DefaultModal';
import { useCategoryManagement } from '@/hooks/category/useCategoryManagement';
import CategoryListContainer from '@/pages/CategoriesPage/components/CategoryListContainer';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const {
    type,
    isOpen,
    closeModal,
    defaultCategories,
    customCategories,
    categoryRef,
    isGetPending,
    isDeletePending,
    handleDeleteIconClick,
    handleDeleteCategory,
  } = useCategoryManagement();

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DefaultHeader
        label={`${type} 카테고리`}
        hasBackButton
        hasPlusButton
        onClick={() => navigate(`/category?type=add&categoryType=${type}`)}
      />
      <CategoryListContainer
        type={type}
        defaultCategories={defaultCategories}
        customCategories={customCategories}
        handleDeleteIconClick={handleDeleteIconClick}
        isPending={isGetPending}
      />
      {isOpen && (
        <DefaultModal
          content={`"${categoryRef.current.name}"(을)를 삭제하시겠습니까?`}
          isPending={isDeletePending}
          onClick={() => handleDeleteCategory(categoryRef.current.id)}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
