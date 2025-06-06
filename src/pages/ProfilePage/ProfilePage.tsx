import DefaultHeader from '@/components/header/DefaultHeader';
import { profileSchema } from '@/schemas/authSchema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GENDER_OPTIONS, JOB_OPTIONS } from '@/constants/options';
import { ProfileFormData } from '@/types/authTypes';
import ProfileForm from '@/pages/ProfilePage/components/ProfileForm';

const ProfilePage = () => {
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
      <DefaultHeader label="프로필 편집" hasBackButton />
      <FormProvider {...methods}>
        <ProfileForm />
      </FormProvider>
    </div>
  );
};

export default ProfilePage;
