import CategoryEditButton from '@/components/button/icon/CategoryEditButton';
import MinusCircleButton from '@/components/button/icon/MinusCircleButton';
import ToggleSwitch from '@/components/button/ToggleSwitch';
import { DefaultCategoriesType, UserCategoriesType } from '@/types/types';

interface Props {
  label: '기본' | '사용자 지정';
  defaultCategories?: DefaultCategoriesType[];
  userCategories?: UserCategoriesType[];
  handleDeleteClick?: (value: string) => void;
}

const CategoryList = ({ label, defaultCategories, userCategories, handleDeleteClick }: Props) => {
  return (
    <div className="w-full h-fit flex flex-col gap-2 px-8 font-semibold">
      <span className="text-lg">{label}</span>
      <div className="flex flex-col gap-4">
        {label === '기본' &&
          defaultCategories &&
          defaultCategories.map(({ color, name, visibility }) => (
            <div key={name} className="category-common">
              <span style={{ color }}>{name}</span>
              <ToggleSwitch visibility={visibility} />
            </div>
          ))}
        {label === '사용자 지정' &&
          userCategories &&
          userCategories.map(({ color, name, id }) => (
            <div key={id} className="category-common">
              <div className="flex items-center gap-2.5">
                <MinusCircleButton onClick={() => handleDeleteClick!(name)} />
                <span style={{ color }}>{name}</span>
              </div>
              <CategoryEditButton />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
