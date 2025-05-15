import DefaultHeader from '@/components/header/DefaultHeader';
import PrimaryInput from '@/components/input/PrimaryInput';
import { useLocation, useNavigate } from 'react-router-dom';
import ColorInput from '@/pages/AddEditCategoryPage/components/ColorInput';
import PrimaryButton from '@/components/button/PrimaryButton';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '@/schemas/categorySchema';
import useModal from '@/hooks/useModal';
import DefaultModal from '@/components/modal/DefaultModal';
import useAddCategory from '@/hooks/apis/category/useAddCategory';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { BaseCategoriesType } from '@/types/categoryTypes';
import useGetCategory from '@/hooks/apis/category/useGetCategory';
import { useEffect } from 'react';
import useUpdateCategory from '@/hooks/apis/category/useUpdateCategory';
import useDeleteCategory from '@/hooks/apis/category/useDeleteCategory';

const AddEditCategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const categoryType = queryParams.get('categoryType') as IncomeExpenseType;
  const type = queryParams.get('type');
  const categoryId = queryParams.get('id');
  const isEdit = type === 'edit';
  const { mutate: addCategory, isPending: isAddPending } = useAddCategory(categoryType);
  const { mutate: updateCategory, isPending: isUpdatePending } = useUpdateCategory();
  const { mutate: deleteCategory, isSuccess } = useDeleteCategory(categoryType);
  const { data } = useGetCategory(categoryId!, isEdit);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      color: '#000000',
    },
  });

  const onSubmit = (data: BaseCategoriesType) => {
    if (isEdit) {
      updateCategory({ id: categoryId!, body: data });
    } else {
      addCategory(data);
    }
  };

  const handleDelete = () => {
    if (categoryId) {
      console.log(categoryId);
      deleteCategory(categoryId);
    }
  };

  useEffect(() => {
    if (data) reset(data);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess]);

  return (
    <div className="w-full h-screen flex flex-col relative">
      <DefaultHeader
        label={`카테고리 ${type === 'add' ? '추가' : '편집'}`}
        hasBackButton
        hasTrashButton={type === 'edit'}
        onClick={openDeleteModal}
      />
      <form className="flex flex-col justify-between flex-grow p-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2.5">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <PrimaryInput
                {...field}
                label="카테고리명"
                errorMessage={errors.name?.message}
                onChange={e => {
                  if (e.target.value.length <= 10) {
                    field.onChange(e);
                  }
                }}
              />
            )}
          />
          <Controller name="color" control={control} render={({ field }) => <ColorInput {...field} />} />
        </div>
        <div className="w-full flex justify-end">
          <PrimaryButton label="저장" disabled={!isValid} type="submit" isPending={isAddPending || isUpdatePending} />
        </div>
      </form>
      {isDeleteModalOpen && (
        <DefaultModal content="해당 카테고리를 삭제하시겠습니까?" onClick={handleDelete} onClose={closeDeleteModal} />
      )}
    </div>
  );
};

export default AddEditCategoryPage;
