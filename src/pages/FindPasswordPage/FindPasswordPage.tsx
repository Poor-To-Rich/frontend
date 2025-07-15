import { useState } from 'react';
import DefaultHeader from '@/components/header/DefaultHeader';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FindUserVerificationForm from '@/pages/FindPasswordPage/components/FindUserVerificationForm';
import { findUserForPasswordSchema, resetPasswordSchema } from '@/schemas/authSchema';
import ResetPasswordForm from '@/pages/FindPasswordPage/components/ResetPasswordForm';
import useResetPassword from '@/hooks/apis/auth/useResetPassword';

const FindPasswordPage = () => {
  const verifyForm = useForm({
    mode: 'onChange',
    resolver: zodResolver(findUserForPasswordSchema),
  });

  const resetForm = useForm({
    mode: 'onChange',
    resolver: zodResolver(resetPasswordSchema),
  });

  const [step, setStep] = useState<'verifyUser' | 'resetPassword'>('verifyUser');
  const { mutate: resetPassword, isPending: isResetPending } = useResetPassword(resetForm.setError);

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <DefaultHeader hasBackButton label="비밀번호 찾기" />
      {step === 'verifyUser' && (
        <FormProvider {...verifyForm}>
          <FindUserVerificationForm
            onSubmit={() => {
              setStep('resetPassword');
            }}
          />
        </FormProvider>
      )}
      {step === 'resetPassword' && (
        <FormProvider {...resetForm}>
          <ResetPasswordForm
            onSubmit={data => {
              const email = verifyForm.getValues('email');
              resetPassword({ ...data, email });
            }}
            isPending={isResetPending}
          />
        </FormProvider>
      )}
    </div>
  );
};

export default FindPasswordPage;
