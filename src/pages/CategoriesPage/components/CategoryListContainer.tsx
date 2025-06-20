import LoadingSpinner from '@/components/loading/LoadingSpinner';
import CategoryList from '@/pages/CategoriesPage/components/CategoryList';
import { IncomeExpenseType } from '@/types/transactionTypes';
import useGetCustomCategory from '@/hooks/apis/category/useGetCustomCategory';
import useGetDefaultCategory from '@/hooks/apis/category/useGetDefaultCategory';

interface Props {
  type: IncomeExpenseType;
  handleDeleteIconClick: (id: number, name: string) => void;
}

const CategoryListContainer = ({ type, handleDeleteIconClick }: Props) => {
  const { data: defaultCategories, isPending: isGetDefaultCategories } = useGetDefaultCategory(type);
  const { data: customCategories, isPending: isGetCustomCategories } = useGetCustomCategory(type);
  const isPending = isGetDefaultCategories || isGetCustomCategories;

  if (isPending) {
    return (
      <div className="flex justify-center items-center grow">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-8">
      <CategoryList type={type} label="기본" defaultCategories={defaultCategories} />
      <CategoryList
        label="사용자 지정"
        type={type}
        customCategories={customCategories}
        handleDeleteIconClick={handleDeleteIconClick}
      />
    </div>
  );
};

export default CategoryListContainer;
