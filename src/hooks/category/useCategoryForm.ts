import useAddCategory from '@/hooks/apis/category/useAddCategory';
import { BaseCategoriesType } from '@/types/categoryTypes';
import useGetCategory from '@/hooks/apis/category/useGetCategory';
import { useEffect } from 'react';
import useUpdateCategory from '@/hooks/apis/category/useUpdateCategory';
import useCategoryParams from './useCategoryParams';
import { useFormContext } from 'react-hook-form';

const useCategoryForm = () => {
  const { reset, setError } = useFormContext();
  const { categoryType, categoryId, isEdit } = useCategoryParams();
  const { data, isFetching } = useGetCategory(categoryId!, isEdit);
  const { mutate: addCategory, isPending: isAddPending } = useAddCategory({ type: categoryType, setError });
  const { mutate: updateCategory, isPending: isUpdatePending } = useUpdateCategory();

  const onSubmit = (data: BaseCategoriesType) => {
    if (isEdit) {
      updateCategory({ id: categoryId!, body: data });
    } else {
      addCategory(data);
    }
  };

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  return {
    onSubmit,
    isFetching,
    isAddPending,
    isUpdatePending,
  };
};

export default useCategoryForm;
