import { logout } from '@/api/services/authService';
import { tokenManager } from '@/utils/tokenManager';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: data => {
      toast.success(data.message);
      tokenManager.clearToken();
      navigate('/login');
    },
    onError: error => toast.error(error.message),
  });
};

export default useLogout;
