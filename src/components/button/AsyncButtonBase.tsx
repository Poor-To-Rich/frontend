import { clsx } from 'clsx';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { AsyncButtonBaseProps } from '@/types/propsTypes';

const AsyncButtonBase = ({
  label,
  isPending,
  loadingSize = 20,
  className,
  spinnerColor,
  disabled,
  ...rest
}: AsyncButtonBaseProps) => {
  return (
    <button
      className={clsx('relative flex justify-center items-center rounded-lg text-md cursor-pointer', className)}
      disabled={isPending || disabled}
      {...rest}>
      <span className={isPending ? 'invisible' : 'visible'}>{label}</span>
      {isPending && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size={loadingSize} color={spinnerColor} />
        </span>
      )}
    </button>
  );
};

export default AsyncButtonBase;
