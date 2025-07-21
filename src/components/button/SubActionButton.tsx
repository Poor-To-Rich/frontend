import AsyncButtonBase from '@/components/button/AsyncButtonBase';
import { AsyncButtonBaseProps } from '@/types/propsTypes';

const SubActionButton = ({ disabled, ...rest }: AsyncButtonBaseProps) => {
  return (
    <AsyncButtonBase
      {...rest}
      disabled={disabled}
      loadingSize={18}
      spinnerColor="#e6e6e6"
      className={'h-full border border-strokeGray bg-white px-3 whitespace-nowrap'}
    />
  );
};

export default SubActionButton;
