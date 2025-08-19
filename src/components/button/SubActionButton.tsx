import AsyncButtonBase from '@/components/button/AsyncButtonBase';
import { AsyncButtonBaseProps } from '@/types/propsTypes';
import clsx from 'clsx';

const SubActionButton = ({ disabled, isPending, className, ...rest }: AsyncButtonBaseProps) => {
  return (
    <AsyncButtonBase
      {...rest}
      disabled={disabled}
      isPending={isPending}
      loadingSize={18}
      spinnerColor="#e6e6e6"
      className={clsx('w-fit h-full border border-strokeGray bg-white px-3 whitespace-nowrap', className)}
    />
  );
};

export default SubActionButton;
