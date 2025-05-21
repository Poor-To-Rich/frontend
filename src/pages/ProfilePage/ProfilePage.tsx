import DefaultHeader from '@/components/header/DefaultHeader';
import { profileSchema } from '@/schemas/authSchema';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { GENDER_OPTIONS, JOB_OPTIONS } from '@/constants/options';
import PrimaryInput from '@/components/input/PrimaryInput';
import SelectBox from '@/components/input/SelectBox';
import PrimaryButton from '@/components/button/PrimaryButton';
import useModal from '@/hooks/useModal';
import DefaultModal from '@/components/modal/DefaultModal';
import ProfileImageField from '@/components/input/auth/ProfileImageField';

const ProfilePage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  type ProfileFormData = z.infer<typeof profileSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileFormData>({
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

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
  };

  return (
    <div className="w-full h-screen min-h-screen flex flex-col relative">
      <DefaultHeader label="프로필 편집" hasBackButton />
      <form className="flex flex-col justify-between grow px-5 pt-15 pb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col">
          <ProfileImageField />
          <div className="flex flex-col gap-3 my-15">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <PrimaryInput {...field} label="이름" isRequired type="text" errorMessage={errors.name?.message} />
              )}
            />
            <Controller
              name="nickname"
              control={control}
              render={({ field }) => (
                <PrimaryInput
                  {...field}
                  label="닉네임"
                  isRequired
                  type="text"
                  errorMessage={errors.nickname?.message}
                />
              )}
            />
            <Controller
              name="birth"
              control={control}
              render={({ field }) => (
                <PrimaryInput {...field} label="생년월일" isRequired type="text" errorMessage={errors.birth?.message} />
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => <SelectBox {...field} label="성별" isRequired options={GENDER_OPTIONS} />}
            />
            <Controller
              name="job"
              control={control}
              render={({ field }) => <SelectBox {...field} label="직업" options={JOB_OPTIONS} />}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <button className="text-sunsetRose cursor-pointer" onClick={openModal} type="button">
            회원탈퇴
          </button>
          <PrimaryButton label="저장" type="submit" disabled={!isValid} />
        </div>
      </form>
      {isOpen && <DefaultModal content="회원탈퇴를 하시겠습니까?" onClose={closeModal} />}
    </div>
  );
};

export default ProfilePage;
