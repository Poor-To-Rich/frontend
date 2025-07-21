import { AsyncButtonBaseProps } from '@/types/propsTypes';
import AsyncButtonBase from '@/components/button/AsyncButtonBase';
import clsx from 'clsx';

const PrimaryButton = ({ disabled, ...rest }: AsyncButtonBaseProps) => {
  const colorStyle = disabled ? 'bg-strokeGray text-defaultGrey' : 'bg-pastelLime text-oliveGreen';

  return (
    <AsyncButtonBase {...rest} disabled={disabled} className={clsx('min-w-[12rem] h-[3.6rem] px-4', colorStyle)} />
  );
};

export default PrimaryButton;
