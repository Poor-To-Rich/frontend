import AsyncButtonBase from '@/components/button/AsyncButtonBase';
import { AsyncButtonBaseProps } from '@/types/propsTypes';
import clsx from 'clsx';

const ModalButton = ({ disabled, isPending, ...rest }: AsyncButtonBaseProps) => {
  const colorStyle = disabled ? 'bg-strokeGray text-defaultGrey' : 'bg-pastelLime text-oliveGreen';

  return (
    <AsyncButtonBase
      disabled={disabled}
      isPending={isPending}
      {...rest}
      className={clsx('min-w-[9rem] px-8 h-[3.5rem]', colorStyle)}
    />
  );
};

export default ModalButton;
