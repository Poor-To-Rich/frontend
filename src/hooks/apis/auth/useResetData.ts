import { resetData } from '@/api/services/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface Props {
  closeModal: () => void;
}

const useResetData = ({ closeModal }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetData,
    onSuccess: data => {
      toast.success(data.message);
      queryClient.clear();
      closeModal();
    },
  });
};

export default useResetData;
