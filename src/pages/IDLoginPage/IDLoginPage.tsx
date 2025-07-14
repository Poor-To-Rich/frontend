import FloatingLabelInput from '@/pages/IDLoginPage/components/FloatingLabelInput';
import useLoginForm from '@/hooks/login/useLoginForm';
import { useNavigate } from 'react-router-dom';
import DefaultHeader from '@/components/header/DefaultHeader';
import SignButton from '@/components/button/SignButton';
import { useState } from 'react';

const IDLoginPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { errors, isValid, isPending, errorMessage, onSubmit, handleSubmit, registerWithResetError } = useLoginForm();

  const handleVisibleClick = () => setIsVisible(prev => !prev);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-vanillaCream">
      <DefaultHeader hasBackButton bgColor={'bg-vanillaCream'} />
      <div className="flex flex-col w-full grow items-center justify-center gap-36">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-3/5 gap-10">
          <div className="flex flex-col w-full gap-7">
            <FloatingLabelInput
              label="아이디"
              type="text"
              maxLength={10}
              {...registerWithResetError('username')}
              errorMessage={errors.username?.message}
            />
            <FloatingLabelInput
              label="비밀번호"
              type={isVisible ? 'text' : 'password'}
              maxLength={15}
              {...registerWithResetError('password')}
              errorMessage={errors.password?.message}
              isPassword
              isPasswordVisible={isVisible}
              handleVisibleClick={handleVisibleClick}
            />
            <span className="text-sm text-sunsetRose">{errorMessage}</span>
          </div>
          <div className="flex flex-col w-full gap-5">
            <SignButton
              label="로그인"
              disabled={!isValid || Boolean(errorMessage)}
              isPending={isPending}
              type="submit"
            />
            <SignButton label="회원가입" onClick={() => navigate('/signup')} />
          </div>
          <div className="flex justify-center gap-4 text-defaultGrey">
            <button
              className="cursor-pointer"
              onClick={() => {
                navigate('/login/find-id');
              }}>
              아이디 찾기
            </button>
            |
            <button
              className="cursor-pointer"
              onClick={() => {
                navigate('/login/find-password');
              }}>
              비밀번호 찾기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IDLoginPage;
