import PrimaryButton from '@/components/button/PrimaryButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import SelectBox from '@/components/input/SelectBox';
import PrimaryInput from '@/components/input/PrimaryInput';
import { GENDER_OPTIONS, JOB_OPTIONS } from '@/constants/options';
import ProfileImageInput from '@/components/input/ProfileImageInput';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schemas/authSchema';
import { z } from 'zod';

const SignupPage = () => {
  type SignupData = z.infer<typeof signupSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupData>({
    defaultValues: {
      profileImage: '',
      name: '',
      nickname: '',
      username: '',
      password: '',
      confirmPassword: '',
      birth: '',
      email: '',
      gender: GENDER_OPTIONS[0].value,
      job: JOB_OPTIONS[0].value,
    },
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: SignupData) => {
    console.log(data);
  };

  return (
    <div>
      <DefaultHeader label="회원가입" hasBackButton />
      <form className="px-5 py-15" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex justify-center">
          <Controller name="profileImage" control={control} render={({ field }) => <ProfileImageInput {...field} />} />
        </div>
        <div className="flex flex-col gap-3 my-15">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <PrimaryInput {...field} label="이름" isRequired type="text" message={errors.name?.message} />
            )}
          />
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => (
              <PrimaryInput {...field} label="닉네임" isRequired type="text" message={errors.nickname?.message} />
            )}
          />
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <PrimaryInput
                {...field}
                label="아이디"
                isRequired
                type="text"
                buttonLabel="중복확인"
                message={errors.username?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PrimaryInput {...field} label="비밀번호" isRequired type="password" message={errors.password?.message} />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <PrimaryInput
                {...field}
                label="비밀번호 재입력"
                isRequired
                type="password"
                message={errors.confirmPassword?.message}
              />
            )}
          />
          <Controller
            name="birth"
            control={control}
            render={({ field }) => (
              <PrimaryInput {...field} label="생년월일" isRequired type="text" message={errors.birth?.message} />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <PrimaryInput
                {...field}
                label="이메일"
                isRequired
                type="email"
                buttonLabel="인증"
                message={errors.email?.message}
              />
            )}
          />
          <PrimaryInput label="인증 코드" isRequired type="text" buttonLabel="확인" />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => <SelectBox {...field} label="성별" isRequired options={GENDER_OPTIONS} />}
          />
          <Controller
            name="job"
            control={control}
            render={({ field }) => <SelectBox {...field} label="직업" options={JOB_OPTIONS} />}
          />
        </div>
        <div className="w-full flex justify-end">
          <PrimaryButton label="회원가입" type="submit" disabled={!isValid} />
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
