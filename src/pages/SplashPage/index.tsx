import SignButton from '@/components/button/SignButton';
import Logo from '/image/Logo.png';
import { useNavigate } from 'react-router-dom';

const index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-40 bg-vanillaCream">
      <img src={Logo} className="w-[20rem]" />
      <div className="flex flex-col w-1/2 gap-5">
        <SignButton label="로그인" onClick={() => navigate('/login')} />
        <SignButton label="회원가입" onClick={() => navigate('/signup')} />
      </div>
    </div>
  );
};

export default index;
