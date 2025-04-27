import PrimaryInput from '@/components/input/PrimaryInput';
import useUsernameVerification from '@/hooks/field/useUsernameVerification';

import { useFormContext } from 'react-hook-form';

const UsernameField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { usernameStatus, resetUsernameStatus, handleUsernameDuplication } = useUsernameVerification();

  return (
    <PrimaryInput
      {...register('username')}
      label="아이디"
      isRequired
      type="text"
      buttonLabel="중복확인"
      onChange={e => {
        register('username').onChange(e);
        resetUsernameStatus();
      }}
      hasCheckIcon={usernameStatus.isVerify}
      errorMessage={errors.username?.message}
      successMessage={usernameStatus.message}
      handleClick={handleUsernameDuplication}
    />
  );
};

export default UsernameField;
