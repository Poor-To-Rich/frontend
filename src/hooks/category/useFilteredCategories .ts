import { SelectOptionsType } from '@/types/fieldType';
import { TransactionFormDataType } from '@/types/transactionTypes';
import { useEffect, useState } from 'react';

const useFilteredCategories = (
  allCategories: SelectOptionsType[],
  transactionFormData: TransactionFormDataType | undefined,
  activeCategory: string[] | undefined,
  isEditPage: boolean,
) => {
  const [categoryOptions, setCategoryOptions] = useState<SelectOptionsType[]>([]);

  useEffect(() => {
    if (activeCategory) {
      const filteredCategory = allCategories
        .filter(category => {
          if (isEditPage && transactionFormData) {
            return activeCategory.includes(category.label) || category.label === transactionFormData.categoryName;
          }
          return activeCategory.includes(category.label);
        })
        .map(category => ({
          ...category,
          visibility: isEditPage && transactionFormData ? category.label !== transactionFormData.categoryName : true,
        }));

      setCategoryOptions(filteredCategory);
    }
  }, [allCategories, transactionFormData, activeCategory, isEditPage]);

  return {
    categoryOptions,
  };
};

export default useFilteredCategories;
