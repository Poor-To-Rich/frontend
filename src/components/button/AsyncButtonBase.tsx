import { clsx } from 'clsx';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { AsyncButtonBaseProps } from '@/types/propsTypes';

const AsyncButtonBase = ({
  label,
  isPending,
  loadingSize = 20,
  fullWidth = false,
  className,
  disabled,
  ...rest
}: AsyncButtonBaseProps) => {
  return (
    <button
      className={clsx(
        'relative flex justify-center items-center rounded-lg text-md cursor-pointer',
        fullWidth ? 'w-full' : 'w-fit',
        className,
      )}
      disabled={isPending || disabled}
      {...rest}>
      <span className={isPending ? 'invisible' : 'visible'}>{label}</span>
      {isPending && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size={loadingSize} />
        </span>
      )}
    </button>
  );
};

export default AsyncButtonBase;
