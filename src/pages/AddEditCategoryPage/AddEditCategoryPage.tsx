import DefaultHeader from '@/components/header/DefaultHeader';
import PrimaryInput from '@/components/input/PrimaryInput';
import ColorInput from '@/pages/AddEditCategoryPage/components/ColorInput';
import PrimaryButton from '@/components/button/PrimaryButton';
import { Controller } from 'react-hook-form';
import DefaultModal from '@/components/modal/DefaultModal';
import useModal from '@/hooks/useModal';
import useCategoryForm from '@/hooks/category/useCategoryForm';

const AddEditCategoryPage = () => {
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { isEdit, control, handleSubmit, onSubmit, isValid, errors, isAddPending, isUpdatePending, handleDelete } =
    useCategoryForm();

  return (
    <div className="w-full h-screen flex flex-col relative">
      <DefaultHeader
        label={`카테고리 ${isEdit ? '편집' : '추가'}`}
        hasBackButton
        hasTrashButton={isEdit}
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
