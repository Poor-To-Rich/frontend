import PrimaryButton from '@/components/button/PrimaryButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import PrimaryInput from '@/components/input/PrimaryInput';
import { changePasswordSchema } from '@/schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const UpdatePasswordPage = () => {
  type ChangePasswordData = z.infer<typeof changePasswordSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: ChangePasswordData) => {
    console.log(data);
  };

  return (
    <div className="w-full h-screen min-h-screen flex flex-col relative">
      <DefaultHeader label="비밀번호 변경" hasBackButton />
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
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <PrimaryInput
                {...field}
                label="비밀번호 재입력"
                type="password"
                errorMessage={errors.passwordConfirm?.message}
              />
            )}
          />
        </div>
        <div className="w-full text-end">
          <PrimaryButton label="비밀번호 변경" disabled={!isValid} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
