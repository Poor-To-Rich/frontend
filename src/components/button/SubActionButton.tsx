import AsyncButtonBase from '@/components/button/AsyncButtonBase';
import { AsyncButtonBaseProps } from '@/types/propsTypes';

const SubActionButton = ({ disabled, isPending, ...rest }: AsyncButtonBaseProps) => {
  return (
    <AsyncButtonBase
      {...rest}
      disabled={disabled}
      isPending={isPending}
      loadingSize={18}
      spinnerColor="#e6e6e6"
      className={'w-fit h-full border border-strokeGray bg-white px-3 whitespace-nowrap'}
    />
  );
};

export default SubActionButton;
