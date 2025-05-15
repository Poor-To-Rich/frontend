export type BaseCategoriesType = {
  color: string;
  name: string;
};

export type DefaultCategoriesType = BaseCategoriesType & {
  visibility: boolean;
};

export type DefaultCategoriesRes = {
  defaultCategories: DefaultCategoriesType[];
};

export type UserCategoriesType = BaseCategoriesType & {
  id: number;
};
