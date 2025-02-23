import clsx from 'clsx';

interface Props {
  label: '로그인' | '회원가입';
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  onClick?: () => void;
}

const SignButton = ({ label, onClick, disabled, type = 'button' }: Props) => {
  return (
    <button
      className={clsx(
        'w-full h-[3.6rem] rounded-lg text-md cursor-pointer',
        label === '로그인' && (disabled ? 'bg-strokeGray text-defaultGrey' : 'bg-pastelLime text-oliveGreen'),
        label === '회원가입' && 'bg-pinkRed text-sunsetRose',
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default SignButton;
