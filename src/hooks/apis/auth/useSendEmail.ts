import { getSendEmailCount, sendEmailCode } from '@/api/services/authService';
import { CheckVerifyFieldProps } from '@/types/fieldType';
import { useMutation } from '@tanstack/react-query';

const useSendEmail = ({ setError, setFieldStatus }: CheckVerifyFieldProps) => {
  return useMutation({
    mutationFn: sendEmailCode,
    onSuccess: async (data, { email }) => {
      const res = await getSendEmailCount(email);
      setFieldStatus({ message: `${data.message} / 남은 요청 횟수: ${res.data?.remainingAttempts}회`, isVerify: true });
    },
    onError: error =>
      setError('email', {
        type: 'server',
        message: error.message,
      }),
  });
};

export default useSendEmail;
