import EmailField from '@/components/input/auth/EmailField';
import NameField from '@/components/input/auth/NameField';
import NicknameField from '@/components/input/auth/NicknameField';
import UsernameField from '@/components/input/auth/UsernameField';
import PasswordField from '@/components/input/auth/PasswordField';
import BirthField from '@/components/input/auth/BirthField';
import GenderField from '@/components/input/auth/GenderField';
import JobField from '@/components/input/auth/JobField';
import ProfileImageField from '@/components/input/auth/ProfileImageField';
import PrimaryButton from '@/components/button/PrimaryButton';
import useSignup from '@/hooks/apis/auth/useSignup';
import { useFormContext } from 'react-hook-form';
import { SignupFormType } from '@/types/authTypes';
import useSignFormValidation from '@/hooks/field/useSignFormValidation';
import { filteredData } from '@/utils/filteredFormData';
import { omit } from 'lodash';

const SignupForm = () => {
  const { setError, handleSubmit } = useFormContext<SignupFormType>();
  const { mutate: signup, isPending } = useSignup({ setError });
  const { buttonDisabled } = useSignFormValidation();

  const onSubmit = (data: SignupFormType) => {
    const postData = omit(data, ['verificationCode']);
    const requestData = filteredData(postData);

    const formData = new FormData();
    Object.entries(requestData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    signup(formData);
  };

  return (
    <form className="px-5 pt-15 pb-8" onSubmit={handleSubmit(onSubmit)}>
      <ProfileImageField />
      <div className="flex flex-col gap-3 my-15">
        <NameField />
        <NicknameField />
        <UsernameField />
        <PasswordField />
        <BirthField />
        <EmailField emailFieldName="email" purpose="register" />
        <GenderField />
        <JobField />
      </div>
      <div className="w-full flex justify-end">
        <PrimaryButton label="회원가입" type="submit" isPending={isPending} disabled={buttonDisabled} />
      </div>
    </form>
  );
};

export default SignupForm;
