import { checkUsernameDuplication } from '@/api/services/authService';
import { CheckVerifyFieldProps } from '@/types/fieldType';
import { useMutation } from '@tanstack/react-query';

const useCheckUsernameDuplication = ({ setError, setFieldStatus, resetFieldStatus }: CheckVerifyFieldProps) => {
  return useMutation({
    mutationFn: checkUsernameDuplication,
    onSuccess: data => {
      setFieldStatus({ message: data.message, isVerify: true });
    },
    onError: error => {
      setError('username', {
        type: 'server',
        message: error.message,
      });
      resetFieldStatus();
    },
  });
};

export default useCheckUsernameDuplication;
