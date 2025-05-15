export type BaseCategoriesType = {
  color: string;
  name: string;
};

export type DefaultCategoriesType = BaseCategoriesType & {
  visibility: boolean;
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
