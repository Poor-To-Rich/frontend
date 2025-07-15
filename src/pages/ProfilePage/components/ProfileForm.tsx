import NameField from '@/components/input/auth/NameField';
import NicknameField from '@/components/input/auth/NicknameField';
import ProfileImageField from '@/components/input/auth/ProfileImageField';
import BirthField from '@/components/input/auth/BirthField';
import GenderField from '@/components/input/auth/GenderField';
import JobField from '@/components/input/auth/JobField';
import PrimaryButton from '@/components/button/PrimaryButton';
import useModal from '@/hooks/useModal';
import DefaultModal from '@/components/modal/DefaultModal';
import { useFormContext } from 'react-hook-form';
import { ProfileFormData } from '@/types/authTypes';
import DeleteUserButton from '@/pages/ProfilePage/components/DeleteUserButton';
import useDeleteUser from '@/hooks/apis/auth/useDeleteUser';
import useGetUserDetails from '@/hooks/apis/auth/useGetUserDetails';
import useUpdateUserDetails from '@/hooks/apis/auth/useUpdateUserDetails';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { useUserProfileForm } from '@/hooks/field/useUserProfileForm';

const ProfileForm = () => {
  const { setError } = useFormContext<ProfileFormData>();
  const { isOpen, openModal, closeModal } = useModal();
  const { mutate: deleteUser } = useDeleteUser();

  const {
    isPending: isGetUserDetailsPending,
    isMutating: isUpdateUserDetailsPending,
    handleSubmit,
    isDisabled,
  } = useUserProfileForm<ProfileFormData>({
    getHook: useGetUserDetails,
    updateHook: useUpdateUserDetails,
    setError,
    checkChanged: true,
  });

  if (isGetUserDetailsPending)
    return (
      <div className="w-full flex grow justify-center items-center">
        <LoadingSpinner size={30} />
      </div>
    );

  return (
    <>
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
        <div className="w-full flex items-center justify-between">
          <DeleteUserButton openModal={openModal} />
          <PrimaryButton label="저장" type="submit" disabled={isDisabled} isPending={isUpdateUserDetailsPending} />
        </div>
      </form>
      {isOpen && <DefaultModal content="회원탈퇴를 하시겠습니까?" onClick={deleteUser} onClose={closeModal} />}
    </>
  );
};

export default ProfileForm;
