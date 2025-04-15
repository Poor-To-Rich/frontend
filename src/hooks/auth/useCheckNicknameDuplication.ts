import { checkNicknameDuplication } from '@/api/authService';
import { CheckVerifyFieldProps } from '@/types/propsTypes';
import { useMutation } from '@tanstack/react-query';

const useCheckNicknameDuplication = ({ setError, setFieldStatus }: CheckVerifyFieldProps) => {
  return useMutation({
    mutationFn: checkNicknameDuplication,
    onSuccess: data => setFieldStatus({ message: data.message, isVerify: true }),
    onError: error =>
      setError('nickname', {
        type: 'server',
        message: error.message,
      }),
  });
};

export default useCheckNicknameDuplication;
