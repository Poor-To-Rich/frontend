import { resetData } from '@/api/services/authService';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface Props {
  closeModal: () => void;
}

const useResetData = ({ closeModal }: Props) => {
  return useMutation({
    mutationFn: resetData,
    onSuccess: data => {
      toast.success(data.message);
      closeModal();
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};

export default useResetData;
