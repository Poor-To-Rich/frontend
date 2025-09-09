import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import { useNavigate } from 'react-router-dom';
import PhotoList from './components/PhotoList';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';

const PhotoListPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} label="사진" />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <PhotoList />
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default PhotoListPage;
