import { MoonLoader } from 'react-spinners';

interface Props {
  size: number;
}

const LoadingSpinner = ({ size }: Props) => {
  return <MoonLoader size={size} color="#a1c377" />;
};

export default LoadingSpinner;
