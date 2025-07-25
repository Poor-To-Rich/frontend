import DefaultHeader from '@/components/header/DefaultHeader';
import { useNavigate } from 'react-router-dom';
import DefaultModal from '@/components/modal/DefaultModal';
import { useCategoryManagement } from '@/hooks/category/useCategoryManagement';
import CategoryListContainer from '@/pages/CategoriesPage/components/CategoryListContainer';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import PlusButton from '@/components/button/icon/PlusButton';
import ModalDimmed from '@/components/modal/ModalDimmed';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { type, isOpen, closeModal, categoryRef, isDeletePending, handleDeleteIconClick, handleDeleteCategory } =
    useCategoryManagement();

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DefaultHeader
        label={`${type} 카테고리`}
        leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
        rightButton={<PlusButton onClick={() => navigate(`/category?type=add&categoryType=${type}`)} />}
      />
      <PageErrorBoundary>
        <FetchErrorBoundary key={type}>
          <CategoryListContainer type={type} handleDeleteIconClick={handleDeleteIconClick} />
        </FetchErrorBoundary>
      </PageErrorBoundary>
      {isOpen && (
        <ModalDimmed onClose={closeModal}>
          <DefaultModal
            content={`"${categoryRef.current.name}"(을)를 삭제하시겠습니까?`}
            isPending={isDeletePending}
            onClick={() => handleDeleteCategory(categoryRef.current.id)}
            onClose={closeModal}
          />
        </ModalDimmed>
      )}
    </div>
  );
};

export default CategoriesPage;
