import PrimaryButton from '@/components/button/PrimaryButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import SelectBox from '@/components/input/SelectBox';
import PrimaryInput from '@/components/input/PrimaryInput';
import { GENDER_OPTIONS, JOB_OPTIONS } from '@/constants/options';
import ProfileImageInput from '@/components/input/ProfileImageInput';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schemas/authSchema';
import useCheckUsernameDuplication from '@/hooks/auth/useCheckUsernameDuplication';
import { SignupData } from '@/types/authTypes';
import { useFieldStatus } from '@/hooks/useFieldStatus';
import useCheckNicknameDuplication from '@/hooks/auth/useCheckNicknameDuplication';

const SignupPage = () => {
  const {
    register,
    control,
    getValues,
    setError,
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

  const { status: nicknameStatus, setStatus: setNicknameStatus, resetStatus: resetNicknameStatus } = useFieldStatus();
  const { status: usernameStatus, setStatus: setUsernameStatus, resetStatus: resetUsernameStatus } = useFieldStatus();
  const { mutate: checkNickname } = useCheckNicknameDuplication({ setError, setFieldStatus: setNicknameStatus });
  const { mutate: checkUsername } = useCheckUsernameDuplication({ setError, setFieldStatus: setUsernameStatus });

  const buttonDisabled =
    !isValid || Object.keys(errors).length > 0 || !nicknameStatus.isVerify || !usernameStatus.isVerify;

  const onSubmit = (data: SignupData) => {
    console.log(data);
  };

  const handleNicknameDuplication = () => {
    const nickname = getValues('nickname');
    checkNickname({ nickname });
  };

  const handleUsernameDuplication = () => {
    const username = getValues('username');
    checkUsername({ username });
  };

  return (
    <div>
      <DefaultHeader label="회원가입" hasBackButton />
      <form className="px-5 pt-15 pb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex justify-center">
          <Controller name="profileImage" control={control} render={({ field }) => <ProfileImageInput {...field} />} />
        </div>
        <div className="flex flex-col gap-3 my-15">
          <PrimaryInput {...register('name')} label="이름" isRequired type="text" errorMessage={errors.name?.message} />
          <PrimaryInput
            {...register('nickname')}
            label="닉네임"
            isRequired
            type="text"
            buttonLabel="중복확인"
            onChange={e => {
              register('nickname').onChange(e);
              resetNicknameStatus();
            }}
            errorMessage={errors.nickname?.message}
            successMessage={nicknameStatus.message}
            handleClick={handleNicknameDuplication}
          />
          <PrimaryInput
            {...register('username')}
            label="아이디"
            isRequired
            type="text"
            buttonLabel="중복확인"
            onChange={e => {
              register('username').onChange(e);
              resetUsernameStatus();
            }}
            errorMessage={errors.username?.message}
            successMessage={usernameStatus.message}
            handleClick={handleUsernameDuplication}
          />
          <PrimaryInput
            {...register('password')}
            label="비밀번호"
            isRequired
            type="password"
            errorMessage={errors.password?.message}
          />
          <PrimaryInput
            {...register('confirmPassword')}
            label="비밀번호 재입력"
            isRequired
            type="password"
            errorMessage={errors.confirmPassword?.message}
          />
          <PrimaryInput
            {...register('birth')}
            label="생년월일"
            isRequired
            type="text"
            errorMessage={errors.birth?.message}
          />
          <PrimaryInput
            {...register('email')}
            label="이메일"
            isRequired
            type="email"
            buttonLabel="인증"
            errorMessage={errors.email?.message}
          />
          <PrimaryInput label="인증 코드" isRequired type="text" buttonLabel="확인" />
          <SelectBox {...register('gender')} label="성별" isRequired options={GENDER_OPTIONS} />
          <SelectBox {...register('job')} label="직업" options={JOB_OPTIONS} />
        </div>
        <div className="w-full flex justify-end">
          <PrimaryButton label="회원가입" type="submit" disabled={buttonDisabled} />
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
