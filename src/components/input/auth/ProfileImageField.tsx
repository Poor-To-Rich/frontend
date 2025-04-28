import ProfileImageInput from '@/components/input/ProfileImageInput';
import { Controller, useFormContext } from 'react-hook-form';

const ProfileImageField = () => {
  const { control } = useFormContext();

  return (
    <div className="w-full flex justify-center">
      <Controller name="profileImage" control={control} render={({ field }) => <ProfileImageInput {...field} />} />
    </div>
  );
};

export default ProfileImageField;
