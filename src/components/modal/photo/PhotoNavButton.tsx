import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  position: 'left' | 'right';
  children: ReactNode;
  showNav: boolean;
}

const PhotoNavButton = ({ position, children, className, showNav, ...rest }: Props) => {
  return (
    <button
      className={clsx(
        'absolute p-2 bg-black/50 text-white transition-opacity cursor-pointer z-50',
        showNav ? 'opacity-100' : 'opacity-0 md:opacity-0 md:group-hover:opacity-100',
        position === 'left' ? 'left-3' : 'right-3',
        className,
      )}
      {...rest}>
      {children}
    </button>
  );
};

export default PhotoNavButton;
