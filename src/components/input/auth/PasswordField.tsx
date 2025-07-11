import PrimaryInput from '@/components/input/PrimaryInput';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface PasswordFieldProps {
  passwordName?: string;
  confirmPasswordName?: string;
}

const PasswordField = ({ passwordName = 'password', confirmPasswordName = 'passwordConfirm' }: PasswordFieldProps) => {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibleClick = () => setIsVisible(prev => !prev);

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      console.log(name, passwordName, confirmPasswordName);
      if (name === passwordName) {
        trigger([confirmPasswordName]);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger, passwordName, confirmPasswordName]);

  return (
    <>
      <PrimaryInput
        {...register(passwordName)}
        label="비밀번호"
        isRequired
        type={isVisible ? 'text' : 'password'}
        errorMessage={errors[passwordName]?.message}
        isPassword
        isPasswordVisible={isVisible}
        handleVisibleClick={handleVisibleClick}
      />
      <PrimaryInput
        {...register(confirmPasswordName)}
        label="비밀번호 재입력"
        isRequired
        type="password"
        errorMessage={errors[confirmPasswordName]?.message}
      />
    </>
  );
};

export default PasswordField;
