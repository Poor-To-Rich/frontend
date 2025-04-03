import DefaultHeader from '@/components/header/DefaultHeader';
import PrimaryInput from '@/components/input/PrimaryInput';
import { useLocation } from 'react-router-dom';
import ColorInput from '@/pages/AddEditCategoryPage/components/ColorInput';
import PrimaryButton from '@/components/button/PrimaryButton';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '@/schemas/categorySchema';
import { z } from 'zod';
import useModal from '@/hooks/useModal';
import DefaultModal from '@/components/modal/DefaultModal';

const AddEditCategoryPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const type = queryParams.get('type');
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      color: '#FFFFFF',
    },
  });

  type categoryFormType = z.infer<typeof categorySchema>;

  const onSubmit = (data: categoryFormType) => {
    console.log(data);
  };

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
                message={errors.name?.message}
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
        <div className="w-full text-end">
          <PrimaryButton label="저장" disabled={!isValid} type="submit" />
        </div>
      </form>
      {isDeleteModalOpen && <DefaultModal content="해당 카테고리를를 삭제하시겠습니까?" onClose={closeDeleteModal} />}
    </div>
  );
};

export default AddEditCategoryPage;
