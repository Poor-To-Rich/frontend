import SelectBox from '@/components/input/SelectBox';
import { JOB_OPTIONS } from '@/constants/options';
import { useFormContext } from 'react-hook-form';

const JobField = () => {
  const { register } = useFormContext();

  return <SelectBox {...register('job')} label="직업" options={JOB_OPTIONS} />;
};

export default JobField;
