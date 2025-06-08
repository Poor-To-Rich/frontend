import PrimaryInput from '@/components/input/PrimaryInput';
import ColorInput from '@/pages/AddEditCategoryPage/components/ColorInput';
import PrimaryButton from '@/components/button/PrimaryButton';
import { Controller, useFormContext } from 'react-hook-form';
import useCategoryForm from '@/hooks/category/useCategoryForm';
import { BaseCategoriesType } from '@/types/categoryTypes';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

const CategoryForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useFormContext<BaseCategoriesType>();
  const { onSubmit, isFetching, isAddPending, isUpdatePending } = useCategoryForm();

  if (isFetching) {
    return (
      <div className="w-full flex flex-grow justify-center items-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
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
  );
};

export default CategoryForm;
