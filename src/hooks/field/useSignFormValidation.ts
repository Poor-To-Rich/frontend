import { useEffect, useState } from 'react';
import useNicknameVerification from './useNicknameVerification ';
import useUsernameVerification from './useUsernameVerification';
import { useFormContext } from 'react-hook-form';
import { useEmailFieldStore } from '@/stores/fields/useEmailFieldStore';

const useSignFormValidation = () => {
  const {
    formState: { isValid, errors },
  } = useFormContext();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const { nicknameStatus } = useNicknameVerification();
  const { usernameStatus } = useUsernameVerification();
  const { sendEmailStatus, emailCodeStatus } = useEmailFieldStore();

  useEffect(() => {
    (() => {
      const isFormInvalid = !isValid || Object.keys(errors).length > 0;
      const isVerificationInvalid =
        !nicknameStatus.isVerify || !usernameStatus.isVerify || !sendEmailStatus.isVerify || !emailCodeStatus.isVerify;

      setButtonDisabled(isFormInvalid || isVerificationInvalid);
    })();
  }, [
    isValid,
    errors,
    nicknameStatus.isVerify,
    usernameStatus.isVerify,
    sendEmailStatus.isVerify,
    emailCodeStatus.isVerify,
  ]);

  return { buttonDisabled };
};

export default useSignFormValidation;
