import DefaultHeader from '@/components/header/DefaultHeader';
import { useNavigate } from 'react-router-dom';
import CategoryList from '@/pages/CategoriesPage.tsx/components/CategoryList';
import DefaultModal from '@/components/modal/DefaultModal';
import { useCategoryManagement } from '@/hooks/category/useCategoryManagement';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const {
    type,
    isOpen,
    closeModal,
    defaultCategories,
    customCategories,
    categoryRef,
    handleDeleteIconClick,
    handleDeleteCategory,
  } = useCategoryManagement();

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
