import DefaultHeader from '@/components/header/DefaultHeader';
import { GENDER_OPTIONS, JOB_OPTIONS } from '@/constants/options';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schemas/authSchema';
import { SignupFormType } from '@/types/authTypes';
import SignupForm from '@/pages/SignupPage/components/SignupForm';
import { useNavigate } from 'react-router-dom';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';

const SignupPage = () => {
  const navigate = useNavigate();
  const methods = useForm<SignupFormType>({
    defaultValues: {
      profileImage: undefined,
      name: '',
      nickname: '',
      username: '',
      password: '',
      passwordConfirm: '',
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
      <DefaultHeader label="회원가입" leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} />
      <FormProvider {...methods}>
        <SignupForm />
      </FormProvider>
    </div>
  );
};

export default SignupPage;
