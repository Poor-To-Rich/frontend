import PrimaryButton from '@/components/button/PrimaryButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import PrimaryInput from '@/components/input/PrimaryInput';
import { emailChangeSchema } from '@/schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const UpdateEmailPage = () => {
  type EmailChangeData = z.infer<typeof emailChangeSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailChangeData>({
    resolver: zodResolver(emailChangeSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: EmailChangeData) => {
    console.log(data);
  };

  return (
    <div className="w-full h-screen min-h-screen flex flex-col relative">
      <DefaultHeader label="이메일 변경" hasBackButton />
      <form className="flex flex-col justify-between grow px-5 py-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <PrimaryInput label="현재 이메일" type="text" readOnly value="woic0102@naver.com" />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <PrimaryInput
                {...field}
                label="이메일"
                type="email"
                buttonLabel="인증"
                errorMessage={errors.email?.message}
              />
            )}
          />
          <PrimaryInput label="인증 코드" type="text" buttonLabel="확인" />
        </div>
        <div className="w-full text-end">
          <PrimaryButton label="이메일 변경" disabled={!isValid} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default UpdateEmailPage;
