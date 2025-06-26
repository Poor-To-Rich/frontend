import PrimaryButton from '@/components/button/PrimaryButton';
import NotFoundFallback from '@/components/error/fallbacks/NotFoundFallback';
import { PiNoteLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10">
      <PiNoteLight size={70} color="gray" />
      <NotFoundFallback />
      <PrimaryButton
        label="홈으로"
        color={'bg-lightBlue text-oceanBlue'}
        onClick={() => navigate('/', { replace: true })}
      />
    </div>
  );
};

export default ErrorPage;
