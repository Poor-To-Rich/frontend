import PrimaryButton from '@/components/button/PrimaryButton';
import BirthField from '@/components/input/auth/BirthField';
import GenderField from '@/components/input/auth/GenderField';
import JobField from '@/components/input/auth/JobField';
import NameField from '@/components/input/auth/NameField';
import NicknameField from '@/components/input/auth/NicknameField';
import ProfileImageField from '@/components/input/auth/ProfileImageField';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useGetOnboardingUserDetails from '@/hooks/apis/auth/useGetOnboardingUserDetails';
import useUpdateOnboardingUserDetails from '@/hooks/apis/auth/useUpdateOnboardingUserDetails';
import { useUserProfileForm } from '@/hooks/field/useUserProfileForm';

const OnboardingProfileForm = () => {
  const {
    isPending: isGetOnboardingUserDetails,
    isMutating: isUpdateOnboardingUserDetails,
    handleSubmit,
    isDisabled,
  } = useUserProfileForm({
    getHook: useGetOnboardingUserDetails,
    updateHook: useUpdateOnboardingUserDetails,
  });

  if (isGetOnboardingUserDetails)
    return (
      <div className="w-full flex grow justify-center items-center">
        <LoadingSpinner size={30} />
      </div>
    );

  return (
    <form className="flex flex-col justify-between grow px-5 pt-15 pb-8" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col">
        <ProfileImageField />
        <div className="flex flex-col gap-3 my-15">
          <NameField />
          <NicknameField />
          <BirthField />
          <GenderField />
          <JobField />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <PrimaryButton label="저장" type="submit" disabled={isDisabled} isPending={isUpdateOnboardingUserDetails} />
      </div>
    </form>
  );
};

export default OnboardingProfileForm;
