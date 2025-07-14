import PrimaryInput from '@/components/input/PrimaryInput';
import PrimaryButton from '@/components/button/PrimaryButton';
import { Controller, useFormContext } from 'react-hook-form';
import { ChangePasswordData } from '@/types/authTypes';
import useUpdatePassword from '@/hooks/apis/auth/useUpdatePassword';
import PasswordField from '@/components/input/auth/PasswordField';
import { useState } from 'react';

const UpdatePasswordForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useFormContext<ChangePasswordData>();
  const { mutate: updatePassword, isPending } = useUpdatePassword(setError);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibleClick = () => setIsVisible(prev => !prev);

  const onSubmit = (data: ChangePasswordData) => {
    updatePassword(data);
  };

  return (
    <form className="flex flex-col justify-between grow px-5 py-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <PrimaryInput
              {...field}
              label="현재 비밀번호"
              type={isVisible ? 'text' : 'password'}
              errorMessage={errors.currentPassword?.message}
              isPassword
              isPasswordVisible={isVisible}
              handleVisibleClick={handleVisibleClick}
            />
          )}
        />
        <PasswordField passwordName="newPassword" confirmPasswordName="confirmNewPassword" />
      </div>
      <div className="flex justify-end w-full">
        <PrimaryButton label="비밀번호 변경" disabled={!isValid} type="submit" isPending={isPending} />
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
