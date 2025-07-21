import PrimaryButton from '@/components/button/PrimaryButton';
import EmailField from '@/components/input/auth/EmailField';
import { useEmailFieldStore } from '@/stores/fields/useEmailFieldStore';
import { FindUsernameFormType } from '@/types/authTypes';
import { useFormContext } from 'react-hook-form';

interface Props {
  onSubmit: (data: FindUsernameFormType) => void;
  isPending: boolean;
}

const FindUsernameForm = ({ onSubmit, isPending }: Props) => {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<FindUsernameFormType>();
  const { sendEmailStatus, emailCodeStatus } = useEmailFieldStore();

  return (
    <div className="flex flex-col gap-8 w-full grow p-5 pb-8">
      <h4>가입했을 때 입력한 이메일을 입력해주세요</h4>
      <form className="flex flex-col justify-between grow" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2.5">
          <EmailField emailFieldName="email" purpose="findUsername" />
        </div>
        <div className="w-full flex justify-end">
          <PrimaryButton
            label="다음"
            isPending={isPending}
            disabled={!isValid || !sendEmailStatus.isVerify || !emailCodeStatus.isVerify}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default FindUsernameForm;
