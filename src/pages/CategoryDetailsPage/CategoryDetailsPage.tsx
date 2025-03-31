import DefaultHeader from '@/components/header/DefaultHeader';
import { useSearchParams } from 'react-router-dom';
import CategoryOverviewChart from '@/pages/CategoryDetailsPage/components/CategoryOverviewChart';

const CategoryDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get('name') || '';
  const type = searchParams.get('type');
  const date = searchParams.get('date');

  return (
    <div>
      <DefaultHeader label={categoryName} hasBackButton />
      <CategoryOverviewChart type={type || ''} />
    </div>
  );
};

export default CategoryDetailsPage;
