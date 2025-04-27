import PrimaryButton from '@/components/button/PrimaryButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import { GENDER_OPTIONS, JOB_OPTIONS } from '@/constants/options';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schemas/authSchema';
import { SignupFormType } from '@/types/authTypes';
import useSignup from '@/hooks/auth/useSignup';
import EmailField from '@/components/input/auth/EmailField';
import NameField from '@/components/input/auth/NameField';
import NicknameField from '@/components/input/auth/NicknameField';
import UsernameField from '@/components/input/auth/UsernameField';
import PasswordField from '@/components/input/auth/PasswordField';
import BirthField from '@/components/input/auth/BirthField';
import GenderField from '@/components/input/auth/GenderField';
import JobField from '@/components/input/auth/JobField';
import ProfileImageField from '@/components/input/auth/ProfileImageField';

const SignupPage = () => {
  const methods = useForm<SignupFormType>({
    defaultValues: {
      profileImage: undefined,
      name: '',
      nickname: '',
      username: '',
      password: '',
      confirmPassword: '',
      birth: '',
      email: '',
      verificationCode: 0,
      gender: GENDER_OPTIONS[0].value,
      job: JOB_OPTIONS[0].value,
    },
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const { mutate: signup, isPending } = useSignup({ setError: methods.setError });

  // const buttonDisabled =
  //   !isValid ||
  //   Object.keys(methods.errors).length > 0 ||
  //   !nicknameStatus.isVerify ||
  //   !usernameStatus.isVerify ||
  //   !sendEmailStatus.isVerify ||
  //   !emailCodeStatus.isVerify;

  const onSubmit = (data: SignupFormType) => {
    const { confirmPassword, verificationCode, ...postData } = data;
    const formData = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (!isPending) signup(formData);
  };

  return (
    <div>
      <DefaultHeader label="회원가입" hasBackButton />
      <FormProvider {...methods}>
        <form className="px-5 pt-15 pb-8" onSubmit={methods.handleSubmit(onSubmit)}>
          <ProfileImageField />
          <div className="flex flex-col gap-3 my-15">
            <NameField />
            <NicknameField />
            <UsernameField />
            <PasswordField />
            <BirthField />
            <EmailField />
            <GenderField />
            <JobField />
          </div>
          <div className="w-full flex justify-end">
            <PrimaryButton label="회원가입" type="submit" isPending={isPending} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignupPage;
