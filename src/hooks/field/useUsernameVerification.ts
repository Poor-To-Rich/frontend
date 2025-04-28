import useCheckUsernameDuplication from '@/hooks/apis/auth/useCheckUsernameDuplication';
import { useUsernameFieldStore } from '@/stores/fields/useUsernameFieldStore';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const useUsernameVerification = () => {
  const {
    getValues,
    setError,
    formState: { errors },
  } = useFormContext();

  const { usernameStatus, setUsernameStatus, resetUsernameStatus } = useUsernameFieldStore();
  const { mutate: checkUsername } = useCheckUsernameDuplication({ setError, setFieldStatus: setUsernameStatus });

  const handleUsernameDuplication = () => {
    const usernameError = errors.username;
    const username = getValues('username');
    if (username && !usernameError) {
      checkUsername({ username });
    }
  };

  useEffect(() => {
    return () => resetUsernameStatus();
  }, []);

  return { usernameStatus, resetUsernameStatus, handleUsernameDuplication };
};

export default useUsernameVerification;
