import useSendEmail from '@/hooks/apis/auth/useSendEmail';
import useVerifyEmail from '@/hooks/apis/auth/useVerifyEmail';
import { useEmailFieldStore } from '@/stores/fields/useEmailFieldStore';
import { EmailPurposeType } from '@/types/authTypes';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  emailFieldName: string;
  purpose: EmailPurposeType;
}

const useEmailVerification = ({ emailFieldName, purpose }: Props) => {
  const {
    getValues,
    setError,
    formState: { errors },
  } = useFormContext();

  const {
    sendEmailStatus,
    emailCodeStatus,
    setEmailCodeStatus,
    setSendEmailStatus,
    resetSendEmailStatus,
    resetEmailCodeStatus,
    resetAllEmailStatus,
  } = useEmailFieldStore();

  const { mutate: sendEmail, isPending: isSendEmailPending } = useSendEmail({
    setError,
    setFieldStatus: setSendEmailStatus,
    resetFieldStatus: resetSendEmailStatus,
  });

  const { mutate: verifyCode, isPending: isVerifyPending } = useVerifyEmail({
    setError,
    setFieldStatus: setEmailCodeStatus,
    resetFieldStatus: resetEmailCodeStatus,
  });

  const handleEmailSend = () => {
    const emailError = errors.email;
    const email = getValues(emailFieldName);
    if (email && !emailError && (!emailCodeStatus.isVerify || !sendEmailStatus.isVerify)) {
      sendEmail({ email, purpose });
    }
  };

  const handleEmailCode = () => {
    const { email: emailError, verificationCode: codeError } = errors;
    const email = getValues(emailFieldName);
    const verificationCode = getValues('verificationCode');
    if (email && verificationCode && !emailError && !codeError && !emailCodeStatus.isVerify) {
      verifyCode({ email, purpose, verificationCode });
    }
  };

  useEffect(() => {
    return () => {
      resetAllEmailStatus();
    };
  }, [resetAllEmailStatus]);

  return {
    isSendEmailPending,
    isVerifyPending,
    handleEmailSend,
    handleEmailCode,
  };
};

export default useEmailVerification;
