import { clsx } from 'clsx';
import AsyncButtonBase from '@/components/button/AsyncButtonBase';
import { AsyncButtonBaseProps } from '@/types/propsTypes';

interface Props extends Omit<AsyncButtonBaseProps, 'label'> {
  label: '카카오로 로그인' | '아이디로 로그인' | '로그인' | '회원가입';
}

const SignButton = ({ label, disabled, ...rest }: Props) => {
  const colorClass = (() => {
    if (label === '카카오로 로그인') return 'bg-[#FEE500] text-[#191919]';
    if (label === '회원가입') return 'bg-pinkRed text-sunsetRose';
    if (label === '아이디로 로그인' || label === '로그인') {
      return disabled ? 'bg-strokeGray text-defaultGrey' : 'bg-pastelLime text-oliveGreen';
    }
    return '';
  })();

  return <AsyncButtonBase {...rest} label={label} disabled={disabled} className={clsx('h-[4rem] px-4', colorClass)} />;
};

export default SignButton;
