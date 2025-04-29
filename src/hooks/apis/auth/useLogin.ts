import { login } from '@/api/authService';
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
      navigate('/', { state: { successMessage: data.message } });
    },
    onError: error => {
      setErrorMessage(error.message);
    },
  });
};

export default useLogin;
