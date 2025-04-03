import DefaultHeader from '@/components/header/DefaultHeader';
import { useSearchParams } from 'react-router-dom';
import CategoryOverviewChart from '@/pages/CategoryDetailsPage/components/CategoryOverviewChart';

const CategoryDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get('name') || '';
  const reportType = searchParams.get('reportType') || '';
  const transactionType = searchParams.get('transactionType') || '';
  const date = searchParams.get('date');

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader label={categoryName} hasBackButton />
      <CategoryOverviewChart reportType={reportType} transactionType={transactionType} />
    </div>
  );
};

export default CategoryDetailsPage;
