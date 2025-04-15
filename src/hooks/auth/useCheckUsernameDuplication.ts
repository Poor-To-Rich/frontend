import { checkUsernameDuplication } from '@/api/authService';
import { SignupData } from '@/types/authTypes';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

interface Props {
  setError: UseFormSetError<SignupData>;
}

const useCheckUsernameDuplication = ({ setError }: Props) => {
  return useMutation({
    mutationFn: checkUsernameDuplication,
    onSuccess: data => {
      console.log('Username check success:', data);
    },
    onError: error => {
      setError('username', {
        type: 'server',
        message: error.message,
      });
    },
  });
};

export default useCheckUsernameDuplication;
