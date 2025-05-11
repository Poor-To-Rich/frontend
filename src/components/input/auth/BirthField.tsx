import PrimaryInput from '@/components/input/PrimaryInput';
import { useFormContext } from 'react-hook-form';

const BirthField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <PrimaryInput {...register('birth')} label="생년월일" isRequired type="text" errorMessage={errors.birth?.message} />
  );
};

export default BirthField;
