import PrimaryInput from '@/components/input/PrimaryInput';
import PrimaryButton from '@/components/button/PrimaryButton';
import { useFormContext } from 'react-hook-form';
import { EmailChangeData } from '@/types/authTypes';
import useGetUserEmail from '@/hooks/apis/auth/useGetUserEmail';
import EmailField from '@/components/input/auth/EmailField';
import { useEmailFieldStore } from '@/stores/fields/useEmailFieldStore';
import useChangeEmail from '@/hooks/apis/auth/useChangeEmail';
import { omit } from 'lodash';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

const UpdateEmailForm = () => {
  const {
    handleSubmit,
    setError,
    formState: { isValid, errors },
  } = useFormContext<EmailChangeData>();
  const { sendEmailStatus, emailCodeStatus } = useEmailFieldStore();
  const { data: userEmail, isPending: isGetUserEmailPending } = useGetUserEmail();
  const { mutate: changeEmail, isPending: isUpdateEmailPending } = useChangeEmail(setError);

  const buttonDisabled = !isValid || !errors || !sendEmailStatus.isVerify || !emailCodeStatus.isVerify;

  const onSubmit = (data: EmailChangeData) => {
    const postData = omit(data, ['verificationCode']);
    changeEmail(postData);
  };

  if (!userEmail || isGetUserEmailPending) {
    return (
      <div className="w-full flex grow justify-center items-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <form className="flex flex-col justify-between grow px-5 py-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <PrimaryInput label="현재 이메일" type="text" readOnly value={userEmail} />
        <EmailField emailFieldName="email" purpose="changeEmail" />
      </div>
      <div className="flex justify-end w-full">
        <PrimaryButton label="이메일 변경" disabled={buttonDisabled} type="submit" isPending={isUpdateEmailPending} />
      </div>
    </form>
  );
};

export default UpdateEmailForm;
