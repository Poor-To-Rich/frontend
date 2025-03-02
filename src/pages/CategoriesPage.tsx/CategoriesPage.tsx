import DefaultHeader from '@/components/header/DefaultHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import CategoryList from '@/pages/CategoriesPage.tsx/components/CategoryList';
import { DefaultCategoriesType, UserCategoriesType } from '@/types/types';
import DefaultModal from '@/components/modal/DefaultModal';
import useModal from '@/hooks/useModal';
import { useRef } from 'react';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const categoryRef = useRef('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  const handleDeleteClick = (value: string) => {
    categoryRef.current = value;
    openModal();
  };

  const defaultCategories: DefaultCategoriesType[] = [
    {
      color: '#4A90E2',
      name: '주거비',
      visibility: true,
    },
    {
      color: '#7ED321',
      name: '식비',
      visibility: true,
    },
  ];

  const UserCategories: UserCategoriesType[] = [
    {
      color: '#4A90E2',
      name: '냠냠냠',
      id: 1,
    },
    {
      color: '#7ED321',
      name: '소확행',
      id: 2,
    },
  ];

  return (
    <div className="w-full h-full relative">
      <DefaultHeader
        label={`${type} 카테고리`}
        hasBackButton
        hasPlusButton
        onClick={() => navigate('/category?type=add')}
      />
      <div className="flex flex-col gap-4 py-8">
        <CategoryList label="기본" defaultCategories={defaultCategories} />
        <CategoryList label="사용자 지정" userCategories={UserCategories} handleDeleteClick={handleDeleteClick} />
      </div>
      {isOpen && <DefaultModal content={`"${categoryRef.current}"(을)를 삭제하시겠습니까?`} onClose={closeModal} />}
    </div>
  );
};

export default CategoriesPage;
