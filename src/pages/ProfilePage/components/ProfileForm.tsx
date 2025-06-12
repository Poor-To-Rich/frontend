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
import { ProfileFormData, ProfileUpdateFormData } from '@/types/authTypes';
import DeleteUserButton from '@/pages/ProfilePage/components/DeleteUserButton';
import useDeleteUser from '@/hooks/apis/auth/useDeleteUser';
import useGetUserDetails from '@/hooks/apis/auth/useGetUserDetails';
import { useEffect } from 'react';
import useUpdateUserDetails from '@/hooks/apis/auth/useUpdateUserDetails';
import { filteredData } from '@/utils/filteredFormData';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

const ProfileForm = () => {
  const {
    reset,
    handleSubmit,
    setError,
    formState: { isValid, dirtyFields },
  } = useFormContext<ProfileFormData>();
  const { isOpen, openModal, closeModal } = useModal();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateUserDetails, isPending: isUpdateUserDetailsPending } = useUpdateUserDetails(setError);
  const { data: userDetails, isPending: isGetUserDetailsPending } = useGetUserDetails();

  const onSubmit = (data: ProfileFormData) => {
    let postData: ProfileUpdateFormData = { ...data };

    if (dirtyFields.profileImage) {
      if (!data.profileImage) {
        postData = { ...postData, isDefaultProfile: true };
      } else {
        postData = { ...postData, isDefaultProfile: false };
      }
    } else {
      delete postData.profileImage;
    }

    const requestData = filteredData(postData);

    const formData = new FormData();

    Object.entries(requestData).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        value = String(value);
      }
      formData.append(key, value);
    });

    updateUserDetails(formData);
  };

  useEffect(() => {
    if (userDetails) {
      reset(userDetails);
    }
  }, [reset, userDetails]);

  if (isGetUserDetailsPending)
    return (
      <div className="w-full flex grow justify-center items-center">
        <LoadingSpinner size={30} />
      </div>
    );

  return (
    <>
      <form className="flex flex-col justify-between grow px-5 pt-15 pb-8" onSubmit={handleSubmit(onSubmit)}>
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
          <PrimaryButton label="저장" type="submit" disabled={!isValid} isPending={isUpdateUserDetailsPending} />
        </div>
      </form>
      {isOpen && <DefaultModal content="회원탈퇴를 하시겠습니까?" onClick={deleteUser} onClose={closeModal} />}
    </>
  );
};

export default ProfileForm;
