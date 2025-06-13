import PrimaryInput from '@/components/input/PrimaryInput';
import PrimaryButton from '@/components/button/PrimaryButton';
import { Controller, useFormContext } from 'react-hook-form';
import { ChangePasswordData } from '@/types/authTypes';
import useUpdatePassword from '@/hooks/apis/auth/useUpdatePassword';
import { useEffect } from 'react';

const UpdatePasswordForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useFormContext<ChangePasswordData>();
  const { mutate: updatePassword, isPending } = useUpdatePassword(setError);

  const onSubmit = (data: ChangePasswordData) => {
    updatePassword(data);
  };

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === 'newPassword') {
        trigger('confirmNewPassword');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

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
              type="password"
              errorMessage={errors.currentPassword?.message}
            />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <PrimaryInput {...field} label="새 비밀번호" type="password" errorMessage={errors.newPassword?.message} />
          )}
        />
        <Controller
          name="confirmNewPassword"
          control={control}
          render={({ field }) => (
            <PrimaryInput
              {...field}
              label="비밀번호 재입력"
              type="password"
              errorMessage={errors.confirmNewPassword?.message}
            />
          )}
        />
      </div>
      <div className="flex justify-end w-full">
        <PrimaryButton label="비밀번호 변경" disabled={!isValid} type="submit" isPending={isPending} />
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
