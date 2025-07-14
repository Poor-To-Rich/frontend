import SignButton from '@/components/button/SignButton';
import Logo from '/image/Logo.png';
import { useNavigate } from 'react-router-dom';

const LoginChoicePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-vanillaCream">
      <div className="flex flex-col w-full grow items-center justify-center gap-36">
        <img src={Logo} alt="로고 이미지" className="w-[20rem] aspect-square" />
        <div className="flex flex-col w-3/5 gap-5">
          <SignButton label="로그인" type="button" onClick={() => navigate('/login/id')} />
          <SignButton label="카카오로 로그인" type="button" onClick={() => navigate('/login/id')} />
        </div>
      </div>
    </div>
  );
};

export default LoginChoicePage;
