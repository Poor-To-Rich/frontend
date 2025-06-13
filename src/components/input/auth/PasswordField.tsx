import PrimaryInput from '@/components/input/PrimaryInput';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const PasswordField = () => {
  const {
    watch,
    trigger,
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === 'password') {
        trigger(['passwordConfirm']);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  return (
    <>
      <PrimaryInput
        {...register('password')}
        data-testid="password-input"
        label="비밀번호"
        isRequired
        type="password"
        errorMessage={errors.password?.message}
      />
      <PrimaryInput
        {...register('passwordConfirm')}
        data-testid="confirm-password-input"
        label="비밀번호 재입력"
        isRequired
        type="password"
        errorMessage={errors.passwordConfirm?.message}
      />
    </>
  );
};

export default PasswordField;
