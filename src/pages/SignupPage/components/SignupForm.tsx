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
import useSignFormValidation from '@/hooks/field/useSignFormValidation';
import { useSignupForm } from '@/hooks/signup/useSignupForm';

const SignupForm = () => {
  const { handleSubmit, isPending } = useSignupForm();
  const { buttonDisabled } = useSignFormValidation();

  return (
    <form className="px-5 pt-15 pb-8" onSubmit={handleSubmit}>
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
