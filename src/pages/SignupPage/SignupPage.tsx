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
import useSendEmail from '@/hooks/auth/useSendEmail';
import useVerifyEmail from '@/hooks/auth/useVerifyEmail';

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

  const { status: nicknameStatus, setStatus: setNicknameStatus, resetStatus: resetNicknameStatus } = useFieldStatus();
  const { status: usernameStatus, setStatus: setUsernameStatus, resetStatus: resetUsernameStatus } = useFieldStatus();
  const {
    status: emailSendStatus,
    setStatus: setEmailSendStatus,
    resetStatus: resetEmailSendStatus,
  } = useFieldStatus();
  const {
    status: emailCodeStatus,
    setStatus: setEmailCodeStatus,
    resetStatus: resetEmailCodeStatus,
  } = useFieldStatus();

  const { mutate: checkNickname } = useCheckNicknameDuplication({ setError, setFieldStatus: setNicknameStatus });
  const { mutate: checkUsername } = useCheckUsernameDuplication({ setError, setFieldStatus: setUsernameStatus });
  const { mutate: emailSend } = useSendEmail({ setError, setFieldStatus: setEmailSendStatus });
  const { mutate: verifyCode } = useVerifyEmail({ setError, setFieldStatus: setEmailCodeStatus });

  const buttonDisabled =
    !isValid ||
    Object.keys(errors).length > 0 ||
    !nicknameStatus.isVerify ||
    !usernameStatus.isVerify ||
    !emailSendStatus.isVerify ||
    !emailCodeStatus.isVerify;

  const onSubmit = (data: SignupData) => {
    const { confirmPassword, verificationCode, ...postData } = data;
    console.log(postData);
  };

  const handleNicknameDuplication = () => {
    const nicknameError = errors.nickname;
    const nickname = getValues('nickname');
    if (nickname && !nicknameError) {
      checkNickname({ nickname });
    }
  };

  const handleUsernameDuplication = () => {
    const usernameError = errors.username;
    const username = getValues('username');
    if (username && !usernameError) {
      checkUsername({ username });
    }
  };

  const handleEmailSend = () => {
    const emailError = errors.email;
    const email = getValues('email');
    if (email && !emailError && !emailCodeStatus.isVerify) {
      emailSend({ email, purpose: 'register' });
    }
  };

  const handleEmailCode = () => {
    const { email: emailError, verificationCode: codeError } = errors;
    const email = getValues('email');
    const verificationCode = getValues('verificationCode');
    if (email && verificationCode && !emailError && !codeError && !emailCodeStatus.isVerify) {
      verifyCode({ email, purpose: 'register', verificationCode });
    }
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
            hasCheckIcon={nicknameStatus.isVerify}
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
            hasCheckIcon={usernameStatus.isVerify}
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
            readOnly={emailCodeStatus.isVerify}
            type="email"
            onChange={e => {
              register('email').onChange(e);
              resetEmailSendStatus();
            }}
            errorMessage={errors.email?.message}
            successMessage={emailSendStatus.message}
            handleClick={handleEmailSend}
            buttonLabel={emailSendStatus.isVerify ? '재발급' : '인증'}
          />
          <Controller
            name="verificationCode"
            control={control}
            render={({ field }) => (
              <PrimaryInput
                label="인증 코드"
                isRequired
                readOnly={!emailSendStatus.isVerify || emailCodeStatus.isVerify}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                minLength={6}
                maxLength={6}
                value={field.value === 0 ? '' : field.value}
                onChange={e => {
                  const value = e.target.value;

                  if (/^\d*$/.test(value)) {
                    field.onChange(Number(value));
                    resetEmailCodeStatus();
                  }
                }}
                hasCheckIcon={emailCodeStatus.isVerify}
                errorMessage={errors.verificationCode?.message}
                successMessage={emailCodeStatus.message}
                handleClick={handleEmailCode}
                buttonLabel="확인"
              />
            )}
          />

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
