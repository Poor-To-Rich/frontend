import { NavigateFunction } from 'react-router-dom';

export const handleClickCategoryChart = (
  navigate: NavigateFunction,
  categoryId: number,
  categoryName: string,
  transactionType: string,
  reportType: string,
  date: string,
  isSavings?: boolean,
) => {
  navigate(`/chart/${categoryId}/category-details`, {
    state: {
      categoryName,
      categoryId,
      transactionType,
      reportType,
      date,
      isSavings,
    },
  });
};
