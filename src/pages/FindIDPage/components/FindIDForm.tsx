import PrimaryButton from '@/components/button/PrimaryButton';
import EmailField from '@/components/input/auth/EmailField';
import PrimaryInput from '@/components/input/PrimaryInput';
import { FindUsernameReq } from '@/types/authTypes';
import { useFormContext } from 'react-hook-form';

const FindIDForm = () => {
  const {
    register,
    formState: { isValid, errors },
  } = useFormContext<FindUsernameReq>();

  return (
    <div className="flex flex-col gap-8 w-full grow p-5 pb-8">
      <h4>가입했을 때 입력한 이메일을 입력해주세요</h4>
      <form className="flex flex-col justify-between grow">
        <div className="flex flex-col gap-2.5">
          <PrimaryInput
            {...register('username')}
            label="아이디"
            type="text"
            isRequired
            errorMessage={errors.username?.message}
          />
          <EmailField emailFieldName="email" purpose="changeEmail" />
        </div>
        <div className="w-full flex justify-end">
          <PrimaryButton label="다음" disabled={!isValid} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default FindIDForm;
