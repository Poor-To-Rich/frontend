import DefaultHeader from '@/components/header/DefaultHeader';
import { FormProvider, useForm } from 'react-hook-form';
import OnboardingProfileForm from '@/pages/ProfileOnboardingPage/components/OnboardingProfileForm';
import { profileSchema } from '@/schemas/authSchema';
import { ProfileFormData } from '@/types/authTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import useLogout from '@/hooks/apis/auth/useLogout';
import { useLocation } from 'react-router-dom';
import ConsentModal from '@/components/modal/chat/ConsentModal';
import ModalDimmed from '@/components/modal/ModalDimmed';
import { useState } from 'react';
import { ACCOUNT_MERGE_CONFIRM } from '@/constants/modal';
import useRevertOnboardingUserDetails from '@/hooks/apis/auth/useRevertOnboardingUserDetails';

const ProfileOnboardingPage = () => {
  const { state } = useLocation();
  const isMergeRequired = state.userRole === 'KAKAO_EXISTING_USER_PENDING';
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isMergeRequired);

  const { mutate: logout } = useLogout();
  const { mutate: revertUserDetails } = useRevertOnboardingUserDetails(logout);
  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
  });

  return (
    <>
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
      {isModalOpen && (
        <ModalDimmed>
          <ConsentModal
            leftButtonLabel="예"
            rightButtonLabel="아니요"
            content={ACCOUNT_MERGE_CONFIRM}
            onClick={() => setIsModalOpen(false)}
            onClose={revertUserDetails}
          />
        </ModalDimmed>
      )}
    </>
  );
};

export default ProfileOnboardingPage;
