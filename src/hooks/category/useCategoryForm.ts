import useAddCategory from '@/hooks/apis/category/useAddCategory';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { BaseCategoriesType } from '@/types/categoryTypes';
import useGetCategory from '@/hooks/apis/category/useGetCategory';
import { useEffect } from 'react';
import useUpdateCategory from '@/hooks/apis/category/useUpdateCategory';
import useDeleteCategory from '@/hooks/apis/category/useDeleteCategory';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '@/schemas/categorySchema';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const useCategoryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const categoryType = queryParams.get('categoryType') as IncomeExpenseType;
  const type = queryParams.get('type');
  const categoryId = queryParams.get('id');
  const isEdit = type === 'edit';

  const { data } = useGetCategory(categoryId!, isEdit);
  const { mutate: addCategory, isPending: isAddPending } = useAddCategory(categoryType);
  const { mutate: updateCategory, isPending: isUpdatePending } = useUpdateCategory();
  const { mutate: deleteCategory, isSuccess } = useDeleteCategory(categoryType);

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
      deleteCategory(categoryId);
    }
  };

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess, navigate]);

  return {
    isEdit,
    control,
    handleSubmit,
    onSubmit,
    isValid,
    errors,
    isAddPending,
    isUpdatePending,
    handleDelete,
  };
};

export default useCategoryForm;
