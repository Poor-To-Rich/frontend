import LoadingSpinner from '@/components/loading/LoadingSpinner';
import CategoryList from '@/pages/CategoriesPage/components/CategoryList';
import { CustomCategoriesType, DefaultCategoriesType } from '@/types/categoryTypes';
import { IncomeExpenseType } from '@/types/transactionTypes';

interface Props {
  type: IncomeExpenseType;
  defaultCategories: DefaultCategoriesType[] | undefined;
  customCategories: CustomCategoriesType[] | undefined;
  handleDeleteIconClick: (id: number, name: string) => void;
  isPending: boolean;
}

const CategoryListContainer = ({
  type,
  defaultCategories,
  customCategories,
  handleDeleteIconClick,
  isPending,
}: Props) => {
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
