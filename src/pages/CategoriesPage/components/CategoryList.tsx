import CategoryEditButton from '@/components/button/icon/CategoryEditButton';
import MinusCircleButton from '@/components/button/icon/MinusCircleButton';
import ToggleSwitch from '@/components/button/toggle/ToggleSwitch';
import { DefaultCategoriesType, CustomCategoriesType } from '@/types/categoryTypes';
import { IncomeExpenseType } from '@/types/transactionTypes';

interface Props {
  label: '기본' | '사용자 지정';
  type: IncomeExpenseType;
  defaultCategories?: DefaultCategoriesType[];
  customCategories?: CustomCategoriesType[];
  handleDeleteIconClick?: (id: number, name: string) => void;
}

const CategoryList = ({ label, type, defaultCategories, customCategories, handleDeleteIconClick }: Props) => {
  return (
    <div className="w-full h-fit flex flex-col gap-2 px-8 font-semibold">
      <span className="text-lg">{label}</span>
      <div className="flex flex-col gap-4">
        {label === '기본' &&
          defaultCategories &&
          defaultCategories.map(({ id, color, name, visibility }) => (
            <div key={id} className="category-common">
              <span style={{ color }}>{name}</span>
              <ToggleSwitch id={id.toString()} visibility={visibility} type={type} />
            </div>
          ))}
        {label === '사용자 지정' &&
          customCategories &&
          customCategories.map(({ id, color, name }) => (
            <div key={id} className="category-common">
              <div className="flex items-center gap-2.5">
                <MinusCircleButton onClick={() => handleDeleteIconClick!(id, name)} />
                <span style={{ color }}>{name}</span>
              </div>
              <CategoryEditButton id={id} type={type} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
