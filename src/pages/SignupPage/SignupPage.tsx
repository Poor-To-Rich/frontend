import DefaultHeader from '@/components/header/DefaultHeader';
import { GENDER_OPTIONS, JOB_OPTIONS } from '@/constants/options';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schemas/authSchema';
import { SignupFormType } from '@/types/authTypes';
import SignupForm from '@/pages/SignupPage/components/SignupForm';

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

  return (
    <div>
      <DefaultHeader label="회원가입" hasBackButton />
      <FormProvider {...methods}>
        <SignupForm />
      </FormProvider>
    </div>
  );
};

export default SignupPage;
