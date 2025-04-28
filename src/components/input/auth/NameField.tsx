import PrimaryInput from '@/components/input/PrimaryInput';
import { useFormContext } from 'react-hook-form';

const NameField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return <PrimaryInput {...register('name')} label="이름" isRequired type="text" errorMessage={errors.name?.message} />;
};

export default NameField;
