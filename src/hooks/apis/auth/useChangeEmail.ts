import { changeEmail } from '@/api/services/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useChangeEmail = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeEmail,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['userEmail'] });
      toast.success(data.message);
      navigate(-1);
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};

export default useChangeEmail;
