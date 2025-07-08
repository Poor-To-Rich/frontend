import { deleteUser } from '@/api/services/authService';
import { tokenManager } from '@/utils/tokenManager';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useDeleteUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: data => {
      toast.success(data.message);
      tokenManager.clearToken();
      queryClient.clear();
      navigate('/login');
    },
  });
};

export default useDeleteUser;
