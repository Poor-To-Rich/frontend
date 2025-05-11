import PrimaryInput from '@/components/input/PrimaryInput';
import useNicknameVerification from '@/hooks/field/useNicknameVerification ';
import { useFormContext } from 'react-hook-form';

const NicknameField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { nicknameStatus, resetNicknameStatus, handleNicknameDuplication } = useNicknameVerification();

  return (
    <PrimaryInput
      {...register('nickname')}
      data-testid="nickname-input"
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
