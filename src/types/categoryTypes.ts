export type BaseCategoriesType = {
  color: string;
  name: string;
};

export type CategoryVisibility = {
  visibility: boolean;
};

export type DefaultCategoriesType = BaseCategoriesType &
  CategoryVisibility & {
    id: number;
  };

export type CustomCategoriesType = BaseCategoriesType & {
  id: number;
};

export type DefaultCategoriesRes = {
  defaultCategories: DefaultCategoriesType[];
};

export type CustomCategoriesRes = {
  customCategories: CustomCategoriesType[];
};

export type ActiveCategoriesRes = {
  categories: string[];
};

export type CategoryRef = {
  name: string;
  id: number;
};
