import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/authSchema';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LoginFormType } from '@/types/authTypes';
import useLogin from '@/hooks/apis/auth/useLogin';
import { useLocation } from 'react-router-dom';

const useLoginForm = () => {
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const { mutate, isPending } = useLogin({ setErrorMessage });

  const onSubmit = (data: LoginFormType) => {
    if (!Boolean(errorMessage)) mutate(data);
  };

  const registerWithResetError = (name: keyof LoginFormType, options = {}) =>
    register(name, {
      ...options,
      onChange: () => setErrorMessage(''),
    });

  useEffect(() => {
    const message = location.state?.successMessage;
    if (message) {
      toast.success(message);
      window.history.replaceState({}, document.title);
    }
  }, []);

  return {
    errors,
    isValid,
    isPending,
    errorMessage,
    onSubmit,
    handleSubmit,
    registerWithResetError,
  };
};

export default useLoginForm;
