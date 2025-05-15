import SelectBox from '@/components/input/SelectBox';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants/options';
import useGetActiveCategory from '@/hooks/apis/category/useGetActiveCategory';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import { useFormContext } from 'react-hook-form';

interface Props {
  isExpense: boolean;
  type: IncomeExpenseType;
}

const CategorySelectBox = ({ isExpense, type }: Props) => {
  const { register } = useFormContext<TransactionFormDataType>();
  const { data: activeCategory } = useGetActiveCategory(type === '지출' ? 'expense' : 'income');
  const categories = isExpense ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const options = categories.filter(category => activeCategory?.includes(category.label));

  return (
    <SelectBox
      label="카테고리"
      data-testid={`${isExpense ? 'expense' : 'income'}-categories-select`}
      isRequired
      options={options}
      type={type}
      hasEditButton
      {...register('categoryName')}
    />
  );
};

export default CategorySelectBox;
