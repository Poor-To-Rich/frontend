import { checkNicknameDuplication } from '@/api/services/authService';
import { CheckVerifyFieldProps } from '@/types/fieldType';
import { useMutation } from '@tanstack/react-query';

const useCheckNicknameDuplication = ({ setError, setFieldStatus, resetFieldStatus }: CheckVerifyFieldProps) => {
  return useMutation({
    mutationFn: checkNicknameDuplication,
    onSuccess: data => setFieldStatus({ message: data.message, isVerify: true }),
    onError: error => {
      setError('nickname', {
        type: 'server',
        message: error.message,
      });
      resetFieldStatus();
    },
  });
};

export default useCheckNicknameDuplication;
