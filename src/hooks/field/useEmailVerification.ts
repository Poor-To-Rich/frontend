import useSendEmail from '@/hooks/apis/auth/useSendEmail';
import useVerifyEmail from '@/hooks/apis/auth/useVerifyEmail';
import { useEmailFieldStore } from '@/stores/fields/useEmailFieldStore';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const useEmailVerification = () => {
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
    resetEmailCodeStatus,
    resetSendEmailStatus,
  } = useEmailFieldStore();

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

  useEffect(() => {
    return () => {
      resetEmailCodeStatus();
      resetSendEmailStatus();
    };
  }, []);

  return {
    sendEmailStatus,
    emailCodeStatus,
    resetSendEmailStatus,
    resetEmailCodeStatus,
    handleEmailSend,
    handleEmailCode,
  };
};

export default useEmailVerification;
