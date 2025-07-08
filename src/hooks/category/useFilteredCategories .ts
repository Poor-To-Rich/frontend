import { SelectOptionsType } from '@/types/fieldType';
import { TransactionFormDataType } from '@/types/transactionTypes';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const useFilteredCategories = (activeCategories: string[] | undefined, currentCategoryName?: string) => {
  const [categoryOptions, setCategoryOptions] = useState<SelectOptionsType[]>([]);
  const { setValue } = useFormContext<TransactionFormDataType>();

  useEffect(() => {
    if (!activeCategories) return;

    const deduped = new Set<string>();
    const result: SelectOptionsType[] = [];

    if (currentCategoryName && !activeCategories.includes(currentCategoryName)) {
      result.push({
        label: currentCategoryName,
        value: currentCategoryName,
        visibility: false,
      });
      deduped.add(currentCategoryName);
    }

    for (const category of activeCategories) {
      if (!deduped.has(category)) {
        result.push({
          label: category,
          value: category,
          visibility: true,
        });
        deduped.add(category);
      }
    }

    setCategoryOptions(result);
  }, [activeCategories, currentCategoryName]);

  useEffect(() => {
    if (categoryOptions.length > 0) {
      const raw = sessionStorage.getItem('transaction-form-data');
      const storageFormData = raw ? JSON.parse(raw) : null;

      if (storageFormData && categoryOptions.some(option => option.value === storageFormData.categoryName)) {
        setValue('categoryName', storageFormData.categoryName);
      } else if (currentCategoryName) {
        setValue('categoryName', currentCategoryName);
      } else {
        setValue('categoryName', categoryOptions[0].value);
      }
    }
  }, [currentCategoryName, categoryOptions, setValue]);

  return {
    categoryOptions,
  };
};

export default useFilteredCategories;
