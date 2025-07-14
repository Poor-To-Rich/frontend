import PrimaryButton from '@/components/button/PrimaryButton';
import PasswordField from '@/components/input/auth/PasswordField';
import { ResetPassword } from '@/types/authTypes';
import { useFormContext } from 'react-hook-form';

interface Props {
  onSubmit: (data: ResetPassword) => void;
  isPending: boolean;
}

const ResetPasswordForm = ({ onSubmit, isPending }: Props) => {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<ResetPassword>();

  return (
    <div className="flex flex-col gap-8 w-full grow p-5 pb-8">
      <h4>새로운 비밀번호를 입력해주세요</h4>
      <form className="flex flex-col justify-between grow" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2.5">
          <PasswordField passwordName="newPassword" confirmPasswordName="confirmNewPassword" />
        </div>
        <div className="w-full flex justify-end">
          <PrimaryButton label="비밀번호 변경" isPending={isPending} disabled={!isValid} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
