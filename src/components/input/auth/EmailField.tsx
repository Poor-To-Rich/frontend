import PrimaryInput from '@/components/input/PrimaryInput';
import useEmailVerification from '@/hooks/field/useEmailVerification';
import { Controller, useFormContext } from 'react-hook-form';

const EmailField = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const {
    sendEmailStatus,
    emailCodeStatus,
    resetSendEmailStatus,
    resetEmailCodeStatus,
    handleEmailSend,
    handleEmailCode,
  } = useEmailVerification();

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
            data-testid="verification-code-input"
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
            errorMessage={errors.verificationCode?.message}
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
