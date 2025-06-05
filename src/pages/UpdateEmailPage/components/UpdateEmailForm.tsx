import PrimaryInput from '@/components/input/PrimaryInput';
import PrimaryButton from '@/components/button/PrimaryButton';
import { useFormContext } from 'react-hook-form';
import { EmailChangeData } from '@/types/authTypes';
import useGetUserEmail from '@/hooks/apis/auth/useGetUserEmail';
import EmailField from '@/components/input/auth/EmailField';
import { useEmailFieldStore } from '@/stores/fields/useEmailFieldStore';
import useChangeEmail from '@/hooks/apis/auth/useChangeEmail';
import { omit } from 'lodash';

const UpdateEmailForm = () => {
  const {
    handleSubmit,
    formState: { isValid, errors },
  } = useFormContext<EmailChangeData>();
  const { sendEmailStatus, emailCodeStatus } = useEmailFieldStore();
  const { data: userEmail, isPending } = useGetUserEmail();
  const { mutate: changeEmail } = useChangeEmail();

  const buttonDisabled = !isValid || !errors || !sendEmailStatus.isVerify || !emailCodeStatus.isVerify;

  const onSubmit = (data: EmailChangeData) => {
    const postData = omit(data, ['verificationCode']);
    changeEmail(postData);
  };

  if (!userEmail || isPending) {
    return <div>로딩중..</div>;
  }

  return (
    <form className="flex flex-col justify-between grow px-5 py-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <PrimaryInput label="현재 이메일" type="text" readOnly value={userEmail} />
        <EmailField emailFieldName="newEmail" purpose="changeEmail" />
      </div>
      <div className="flex justify-end w-full">
        <PrimaryButton label="이메일 변경" disabled={buttonDisabled} type="submit" />
      </div>
    </form>
  );
};

export default UpdateEmailForm;
