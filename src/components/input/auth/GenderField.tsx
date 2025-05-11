import SelectBox from '@/components/input/SelectBox';
import { GENDER_OPTIONS } from '@/constants/options';
import { useFormContext } from 'react-hook-form';

const GenderField = () => {
  const { register } = useFormContext();

  return <SelectBox {...register('gender')} label="성별" isRequired options={GENDER_OPTIONS} />;
};

export default GenderField;
