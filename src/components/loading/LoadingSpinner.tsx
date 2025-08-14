import { MoonLoader } from 'react-spinners';

interface Props {
  size: number;
  color?: string;
}

const LoadingSpinner = ({ size, color = '#a1c377' }: Props) => {
  return <MoonLoader data-testid="loading-spinner" size={size} color={color} />;
};

export default LoadingSpinner;
