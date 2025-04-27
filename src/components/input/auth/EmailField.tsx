import PrimaryInput from '@/components/input/PrimaryInput';
import useSendEmail from '@/hooks/auth/useSendEmail';
import useVerifyEmail from '@/hooks/auth/useVerifyEmail';
import { useFieldStatus } from '@/hooks/useFieldStatus';
import { Controller, useFormContext } from 'react-hook-form';

const EmailField = () => {
  const {
    register,
    control,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext();

  const {
    status: sendEmailStatus,
    setStatus: setSendEmailStatus,
    resetStatus: resetSendEmailStatus,
  } = useFieldStatus();
  const {
    status: emailCodeStatus,
    setStatus: setEmailCodeStatus,
    resetStatus: resetEmailCodeStatus,
  } = useFieldStatus();

  const { mutate: sendEmail } = useSendEmail({ setError, setFieldStatus: setSendEmailStatus });
  const { mutate: verifyCode } = useVerifyEmail({ setError, setFieldStatus: setEmailCodeStatus });

  const handleEmailSend = () => {
    const emailError = errors.email;
    const email = getValues('email');
    if (email && !emailError && !emailCodeStatus.isVerify) {
      sendEmail({ email, purpose: 'register' });
    }
  };

  const handleEmailCode = () => {
    const { email: emailError, verificationCode: codeError } = errors;
    const email = getValues('email');
    const verificationCode = getValues('verificationCode');
    if (email && verificationCode && !emailError && !codeError && !emailCodeStatus.isVerify) {
      verifyCode({ email, purpose: 'register', verificationCode });
    }
  };

  return (
    <>
      <PrimaryInput
        {...register('email')}
        label="이메일"
        isRequired
        readOnly={emailCodeStatus.isVerify}
        type="email"
        onChange={e => {
          register('email').onChange(e);
          resetSendEmailStatus();
        }}
        errorMessage={errors.email?.message}
        successMessage={sendEmailStatus.message}
        handleClick={handleEmailSend}
        buttonLabel={sendEmailStatus.isVerify ? '재발급' : '인증'}
      />
      <Controller
        name="verificationCode"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            label="인증 코드"
            isRequired
            readOnly={!sendEmailStatus.isVerify || emailCodeStatus.isVerify}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            minLength={6}
            maxLength={6}
            value={field.value === 0 ? '' : field.value}
            onChange={e => {
              const value = e.target.value;

              if (/^\d*$/.test(value)) {
                field.onChange(Number(value));
                resetEmailCodeStatus();
              }
            }}
            hasCheckIcon={emailCodeStatus.isVerify}
            errorMessage={errors.email?.message}
            successMessage={emailCodeStatus.message}
            handleClick={handleEmailCode}
            buttonLabel="확인"
          />
        )}
      />
    </>
  );
};

export default EmailField;
