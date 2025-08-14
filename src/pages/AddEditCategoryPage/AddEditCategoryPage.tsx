import DefaultHeader from '@/components/header/DefaultHeader';
import DefaultModal from '@/components/modal/DefaultModal';
import useModal from '@/hooks/useModal';
import { FormProvider, useForm } from 'react-hook-form';
import CategoryForm from './components/CategoryForm';
import { categorySchema } from '@/schemas/categorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import useCategoryParams from '@/hooks/category/useCategoryParams';
import useDeleteCategory from '@/hooks/apis/category/useDeleteCategory';
import { useEffect } from 'react';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import TrashButton from '@/components/button/icon/TrashButton';
import ModalDimmed from '@/components/modal/ModalDimmed';

const AddEditCategoryPage = () => {
  const method = useForm({
    mode: 'onChange',
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      color: '#000000',
    },
  });

  const navigate = useNavigate();
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { categoryType, categoryId, isEdit } = useCategoryParams();
  const { mutate: deleteCategory, isSuccess, isPending } = useDeleteCategory(categoryType);

  const handleDelete = () => {
    if (categoryId) {
      deleteCategory(categoryId);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="w-full h-screen flex flex-col relative">
      <DefaultHeader
        label={`카테고리 ${isEdit ? '편집' : '추가'}`}
        leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
        rightButton={<TrashButton onClick={openDeleteModal} />}
      />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <FormProvider {...method}>
            <CategoryForm />
          </FormProvider>
        </FetchErrorBoundary>
      </PageErrorBoundary>
      {isDeleteModalOpen && (
        <ModalDimmed onClose={closeDeleteModal}>
          <DefaultModal
            content="해당 카테고리를 삭제하시겠습니까?"
            isPending={isPending}
            onClick={handleDelete}
            onClose={closeDeleteModal}
          />
        </ModalDimmed>
      )}
    </div>
  );
};

export default AddEditCategoryPage;
