import PrimaryInput from '@/components/input/PrimaryInput';
import { useFormContext } from 'react-hook-form';

const PasswordField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
