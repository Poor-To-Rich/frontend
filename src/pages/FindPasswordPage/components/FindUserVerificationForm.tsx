import PrimaryButton from '@/components/button/PrimaryButton';
import EmailField from '@/components/input/auth/EmailField';
import PrimaryInput from '@/components/input/PrimaryInput';
import { useEmailFieldStore } from '@/stores/fields/useEmailFieldStore';
import { FindUserForPassword } from '@/types/authTypes';
import { useFormContext } from 'react-hook-form';

interface Props {
  onSubmit: () => void;
}

const FindUserVerificationForm = ({ onSubmit }: Props) => {
  const {
    register,
    clearErrors,
    formState: { isValid, errors },
  } = useFormContext<FindUserForPassword>();
  const { sendEmailStatus, emailCodeStatus } = useEmailFieldStore();

  return (
    <div className="flex flex-col gap-8 w-full grow p-5 pb-8">
      <h4>가입했을 때 입력한 아이디와 이메일을 입력해주세요</h4>
      <form className="flex flex-col justify-between grow" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2.5">
          <PrimaryInput
            {...register('username')}
            label="아이디"
            type="text"
            isRequired
            onChange={e => {
              register('username').onChange(e);
              clearErrors('email');
            }}
            errorMessage={errors.username?.message}
          />
          <EmailField emailFieldName="email" purpose="changePassword" />
        </div>
        <div className="w-full flex justify-end">
          <PrimaryButton
            label="다음"
            disabled={!isValid || !sendEmailStatus.isVerify || !emailCodeStatus.isVerify}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default FindUserVerificationForm;
