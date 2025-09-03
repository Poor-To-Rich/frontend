import DefaultHeader from '@/components/header/DefaultHeader';
import { FormProvider, useForm } from 'react-hook-form';
import OnboardingProfileForm from '@/pages/ProfileOnboardingPage/components/OnboardingProfileForm';
import { profileSchema } from '@/schemas/authSchema';
import { ProfileFormData } from '@/types/authTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import useLogout from '@/hooks/apis/auth/useLogout';

const ProfileOnboardingPage = () => {
  const { mutate: logout } = useLogout();
  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
  });

  return (
    <div className="flex flex-col w-full min-h-screen">
      <DefaultHeader
        leftButton={
          <LeftArrowButton
            onClick={() => {
              logout();
            }}
          />
        }
        label="회원정보 입력"
      />
      <FormProvider {...methods}>
        <OnboardingProfileForm />
      </FormProvider>
    </div>
  );
};

export default ProfileOnboardingPage;
