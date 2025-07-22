import DefaultHeader from '@/components/header/DefaultHeader';
import { profileSchema } from '@/schemas/authSchema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GENDER_OPTIONS, JOB_OPTIONS } from '@/constants/options';
import { ProfileFormData } from '@/types/authTypes';
import ProfileForm from '@/pages/ProfilePage/components/ProfileForm';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';
import { useNavigate } from 'react-router-dom';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';

const ProfilePage = () => {
  const navigate = useNavigate();
  const methods = useForm<ProfileFormData>({
    defaultValues: {
      profileImage: undefined,
      name: '',
      nickname: '',
      birth: '',
      gender: GENDER_OPTIONS[0].value,
      job: JOB_OPTIONS[0].value,
    },
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
  });

  return (
    <div className="w-full h-screen min-h-screen flex flex-col relative">
      <DefaultHeader label="프로필 편집" leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <FormProvider {...methods}>
            <ProfileForm />
          </FormProvider>
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default ProfilePage;
