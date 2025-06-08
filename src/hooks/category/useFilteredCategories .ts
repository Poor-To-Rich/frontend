import { SelectOptionsType } from '@/types/fieldType';
import { TransactionFormDataType } from '@/types/transactionTypes';
import { useEffect, useState } from 'react';

const useFilteredCategories = (
  allCategories: SelectOptionsType[],
  transactionFormData: TransactionFormDataType | undefined,
  activeCategories: string[] | undefined,
  isEditPage: boolean,
) => {
  const [categoryOptions, setCategoryOptions] = useState<SelectOptionsType[]>([]);

  useEffect(() => {
    if (activeCategories) {
      const filteredCategory = allCategories
        .filter(category => {
          if (isEditPage && transactionFormData) {
            return activeCategories.includes(category.label) || category.label === transactionFormData.categoryName;
          }
          return activeCategories.includes(category.label);
        })
        .map(category => ({
          ...category,
          visibility: isEditPage && transactionFormData ? category.label !== transactionFormData.categoryName : true,
        }));

      setCategoryOptions(filteredCategory);
    }
  }, [allCategories, transactionFormData, activeCategories, isEditPage]);

  return {
    categoryOptions,
  };
};

export default useFilteredCategories;
