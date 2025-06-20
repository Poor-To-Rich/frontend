import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/authSchema';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LoginFormType } from '@/types/authTypes';
import useLogin from '@/hooks/apis/auth/useLogin';
import { useLocation, useSearchParams } from 'react-router-dom';

const useLoginForm = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const failMessage = searchParams.get('failMessage');

  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const { mutate: login, isPending } = useLogin({ setErrorMessage });

  const onSubmit = (data: LoginFormType) => {
    if (!errorMessage) login(data);
  };

  const registerWithResetError = (name: keyof LoginFormType, options = {}) =>
    register(name, {
      ...options,
      onChange: () => setErrorMessage(''),
    });

  useEffect(() => {
    if (failMessage) {
      toast.error(failMessage, {
        style: {
          textAlign: 'center',
        },
      });
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [failMessage, location.pathname]);

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
