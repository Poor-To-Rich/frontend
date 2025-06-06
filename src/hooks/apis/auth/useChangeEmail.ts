import { changeEmail } from '@/api/services/authService';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useChangeEmail = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: changeEmail,
    onSuccess: data => {
      toast.success(data.message);
      navigate(-1);
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};

export default useChangeEmail;
