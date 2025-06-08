import useCheckNicknameDuplication from '@/hooks/apis/auth/useCheckNicknameDuplication';
import { useNicknameFieldStore } from '@/stores/fields/useNicknameFieldStore';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const useNicknameVerification = () => {
  const {
    getValues,
    setError,
    formState: { errors },
  } = useFormContext();

  const { nicknameStatus, setNicknameStatus, resetNicknameStatus } = useNicknameFieldStore();
  const { mutate: checkNickname } = useCheckNicknameDuplication({
    setError,
    setFieldStatus: setNicknameStatus,
    resetFieldStatus: resetNicknameStatus,
  });

  const handleNicknameDuplication = () => {
    const nicknameError = errors.nickname;
    const nickname = getValues('nickname');
    if (nickname && !nicknameError) {
      checkNickname({ nickname });
    }
  };

  useEffect(() => {
    return () => resetNicknameStatus();
  }, []);

  return { nicknameStatus, resetNicknameStatus, handleNicknameDuplication };
};

export default useNicknameVerification;
