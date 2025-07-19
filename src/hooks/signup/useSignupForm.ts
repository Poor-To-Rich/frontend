import { useFormContext } from 'react-hook-form';
import { SignupFormType } from '@/types/authTypes';
import { useEmailFieldStore } from '@/stores/fields/useEmailFieldStore';
import { useNicknameFieldStore } from '@/stores/fields/useNicknameFieldStore';
import { useUsernameFieldStore } from '@/stores/fields/useUsernameFieldStore';
import { filteredData } from '@/utils/form/filteredFormData';
import omit from 'lodash/omit';
import useSignup from '@/hooks/apis/auth/useSignup';

export const useSignupForm = () => {
  const { setError, handleSubmit } = useFormContext<SignupFormType>();

  const { resetAllEmailStatus } = useEmailFieldStore();
  const { resetNicknameStatus } = useNicknameFieldStore();
  const { resetUsernameStatus } = useUsernameFieldStore();

  const fieldStatusMap = {
    email: resetAllEmailStatus,
    verificationCode: resetAllEmailStatus,
    nickname: resetNicknameStatus,
    username: resetUsernameStatus,
  };

  const { mutate: signup, isPending } = useSignup({ setError, fieldStatusMap });

  const onSubmit = (data: SignupFormType) => {
    const postData = omit(data, ['verificationCode']);
    const requestData = filteredData(postData);

    const formData = new FormData();
    Object.entries(requestData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    signup(formData);
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    isPending,
  };
};
