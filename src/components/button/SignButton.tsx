import clsx from 'clsx';

interface Props {
  label: '로그인' | '회원가입';
  onClick?: () => void;
}

const SignButton = ({ label, onClick }: Props) => {
  return (
    <button
      className={clsx(
        'w-[20rem] h-[3.6rem] rounded-lg text-md',
        label === '로그인' && 'bg-pastelLime text-oliveGreen',
        label === '회원가입' && 'bg-[#FFCBC4] text-sunsetRose',
      )}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default SignButton;
