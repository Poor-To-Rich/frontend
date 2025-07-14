import { useState } from 'react';
import DefaultHeader from '@/components/header/DefaultHeader';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FindUserVerificationForm from '@/pages/FindPasswordPage/components/FindUserVerificationForm';
import { findUserForPasswordSchema, resetPasswordSchema } from '@/schemas/authSchema';
import ResetPasswordForm from '@/pages/FindPasswordPage/components/ResetPasswordForm';
import useVerifyUser from '@/hooks/apis/auth/useVerifyUser';
import useResetPassword from '@/hooks/apis/auth/useResetPassword';
import CustomError from '@/utils/error/CustomError';
import ResultMessageBox from '@/components/auth/ResultMessageBox';

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
  const {
    mutate: verifyUser,
    error,
    isError,
    isPending: isVerifyPending,
  } = useVerifyUser(verifyForm.setError, setStep);
  const { mutate: resetPassword, isPending: isResetPending } = useResetPassword(resetForm.setError);

  const isNotFound = isError && (error as CustomError).statusCode === 404;

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <DefaultHeader hasBackButton label="비밀번호 찾기" />
      {isNotFound ? (
        <ResultMessageBox isNotFound={isNotFound} />
      ) : (
        step === 'verifyUser' && (
          <FormProvider {...verifyForm}>
            <FindUserVerificationForm
              onSubmit={data => {
                verifyUser(data);
              }}
              isPending={isVerifyPending}
            />
          </FormProvider>
        )
      )}
      {step === 'resetPassword' && (
        <FormProvider {...resetForm}>
          <ResetPasswordForm
            onSubmit={data => {
              resetPassword(data);
            }}
            isPending={isResetPending}
          />
        </FormProvider>
      )}
    </div>
  );
};

export default FindPasswordPage;
