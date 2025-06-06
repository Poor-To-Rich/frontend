import { updateUserDetails } from '@/api/services/authService';
import { ProfileFormData } from '@/types/authTypes';
import { CheckVerifyFieldProps } from '@/types/fieldType';
import CustomError from '@/utils/CustomError';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useUpdateUserDetails = ({ setError }: Pick<CheckVerifyFieldProps, 'setError'>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateUserDetails,
    onSuccess: data => {
      toast.success(data.message);
      navigate(-1);
    },
    onError: (error: CustomError<{ field: keyof ProfileFormData }>) => {
      if (error.data)
        setError(error.data.field, {
          type: 'server',
          message: error.message,
        });
      else toast.error(error.message);
    },
  });
};

export default useUpdateUserDetails;
