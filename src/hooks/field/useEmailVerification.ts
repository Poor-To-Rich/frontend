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

  const { emailCodeStatus, setEmailCodeStatus, setSendEmailStatus, resetEmailCodeStatus, resetSendEmailStatus } =
    useEmailFieldStore();

  const { mutate: sendEmail } = useSendEmail({ setError, setFieldStatus: setSendEmailStatus });
  const { mutate: verifyCode } = useVerifyEmail({ setError, setFieldStatus: setEmailCodeStatus });

  const handleEmailSend = () => {
    const emailError = errors.email;
    const email = getValues(emailFieldName);
    if (email && !emailError && !emailCodeStatus.isVerify) {
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
      resetEmailCodeStatus();
      resetSendEmailStatus();
    };
  }, []);

  return {
    handleEmailSend,
    handleEmailCode,
  };
};

export default useEmailVerification;
