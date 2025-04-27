import PrimaryInput from '@/components/input/PrimaryInput';
import useCheckNicknameDuplication from '@/hooks/auth/useCheckNicknameDuplication';
import { useFieldStatus } from '@/hooks/useFieldStatus';
import { useFormContext } from 'react-hook-form';

const NicknameField = () => {
  const {
    register,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext();

  const { status: nicknameStatus, setStatus: setNicknameStatus, resetStatus: resetNicknameStatus } = useFieldStatus();
  const { mutate: checkNickname } = useCheckNicknameDuplication({ setError, setFieldStatus: setNicknameStatus });

  const handleNicknameDuplication = () => {
    const nicknameError = errors.nickname;
    const nickname = getValues('nickname');
    if (nickname && !nicknameError) {
      checkNickname({ nickname });
    }
  };
  return (
    <PrimaryInput
      {...register('nickname')}
      label="닉네임"
      isRequired
      type="text"
      buttonLabel="중복확인"
      onChange={e => {
        register('nickname').onChange(e);
        resetNicknameStatus();
      }}
      hasCheckIcon={nicknameStatus.isVerify}
      errorMessage={errors.nickname?.message}
      successMessage={nicknameStatus.message}
      handleClick={handleNicknameDuplication}
    />
  );
};

export default NicknameField;
