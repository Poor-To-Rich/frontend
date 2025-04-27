import PrimaryInput from '@/components/input/PrimaryInput';
import useCheckUsernameDuplication from '@/hooks/auth/useCheckUsernameDuplication';
import { useFieldStatus } from '@/hooks/useFieldStatus';
import { useFormContext } from 'react-hook-form';

const UsernameField = () => {
  const {
    register,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext();

  const { status: usernameStatus, setStatus: setUsernameStatus, resetStatus: resetUsernameStatus } = useFieldStatus();
  const { mutate: checkUsername } = useCheckUsernameDuplication({ setError, setFieldStatus: setUsernameStatus });

  const handleUsernameDuplication = () => {
    const usernameError = errors.username;
    const username = getValues('username');
    if (username && !usernameError) {
      checkUsername({ username });
    }
  };

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
