import { getVerifyEmailCodeCount, verifyEmailCode } from '@/api/services/authService';
import { CheckVerifyFieldProps } from '@/types/fieldType';
import { useMutation } from '@tanstack/react-query';

const useVerifyEmail = ({ setError, setFieldStatus }: CheckVerifyFieldProps) => {
  return useMutation({
    mutationFn: verifyEmailCode,
    onSuccess: async (data, { email }) => {
      const res = await getVerifyEmailCodeCount(email);
      setFieldStatus({ message: `${data.message} / 남은 인증 횟수: ${res.data?.remainingAttempts}회`, isVerify: true });
    },
    onError: error =>
      setError('verificationCode', {
        type: 'server',
        message: error.message,
      }),
  });
};

export default useVerifyEmail;
