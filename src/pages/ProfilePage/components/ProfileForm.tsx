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
import { useEffect } from 'react';

const ProfileForm = () => {
  const {
    reset,
    handleSubmit,
    formState: { isValid },
  } = useFormContext<ProfileFormData>();
  const { isOpen, openModal, closeModal } = useModal();
  const { mutate: deleteUser } = useDeleteUser();
  const { data: userDetails, isPending } = useGetUserDetails();

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
  };

  useEffect(() => {
    if (userDetails) {
      reset(userDetails);
    }
  }, [reset, userDetails]);

  if (isPending) return <div>로딩중</div>;

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
          <PrimaryButton label="저장" type="submit" disabled={!isValid} />
        </div>
      </form>
      {isOpen && <DefaultModal content="회원탈퇴를 하시겠습니까?" onClick={deleteUser} onClose={closeModal} />}
    </>
  );
};

export default ProfileForm;
