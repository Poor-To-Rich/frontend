import { SelectOptionsType } from '@/types/fieldType';
import { useEffect, useState } from 'react';

const useFilteredCategories = (activeCategories: string[] | undefined, currentCategoryName?: string) => {
  const [categoryOptions, setCategoryOptions] = useState<SelectOptionsType[]>([]);

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

  return {
    categoryOptions,
  };
};

export default useFilteredCategories;
