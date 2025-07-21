import PrimaryInput from '@/components/input/PrimaryInput';
import { useFormContext } from 'react-hook-form';

const BirthField = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const formatDate = (input: string) => {
    const numbersOnly = input.replace(/\D/g, '').slice(0, 8);

    if (numbersOnly.length < 5) return numbersOnly;
    if (numbersOnly.length < 7) return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4)}`;
    return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4, 6)}-${numbersOnly.slice(6)}`;
  };

  return (
    <PrimaryInput
      {...register('birth', {
        onChange: e => {
          const formatted = formatDate(e.target.value);
          setValue('birth', formatted);
        },
      })}
      label="생년월일"
      placeholder="YYYY-MM-DD"
      isRequired
      type="text"
      errorMessage={errors.birth?.message}
      maxLength={10}
    />
  );
};

export default BirthField;
