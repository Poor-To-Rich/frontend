import PrimaryButton from '@/components/button/PrimaryButton';
import { FIND_ID_NOT_FOUND, FIND_ID_SUCCESS } from '@/constants/message';
import { useNavigate } from 'react-router-dom';

interface Props {
  isNotFound?: boolean;
  username?: string;
}

const ResultMessageBox = ({ isNotFound, username }: Props) => {
  const navigate = useNavigate();
  const message = isNotFound ? FIND_ID_NOT_FOUND : FIND_ID_SUCCESS;
  const buttonLabel = isNotFound ? '회원가입 하기' : '로그인 하기';
  const targetPath = isNotFound ? '/signup' : '/login/id';

  return (
    <div className="flex flex-col justify-between w-full grow p-5 pb-8">
      <div className="flex flex-col gap-8">
        <h4 className="whitespace-pre-line">{message}</h4>
        {!isNotFound && (
          <div className="w-full p-7 border border-strokeGray rounded-2xl">
            <p>아이디 : {username}</p>
          </div>
        )}
      </div>
      <div className="w-full flex justify-end">
        <PrimaryButton label={buttonLabel} type="button" onClick={() => navigate(targetPath, { replace: true })} />
      </div>
    </div>
  );
};

export default ResultMessageBox;
