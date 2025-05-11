import { login } from '@/api/services/authService';
import { tokenManager } from '@/utils/tokenManager';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface Props {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const useLogin = ({ setErrorMessage }: Props) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      navigate('/');
      if (data.data) {
        tokenManager.setToken(data.data?.accessToken);
      }
    },
    onError: error => {
      setErrorMessage(error.message);
    },
  });
};

export default useLogin;
