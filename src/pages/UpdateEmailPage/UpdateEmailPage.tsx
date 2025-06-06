import DefaultHeader from '@/components/header/DefaultHeader';
import { emailChangeSchema } from '@/schemas/authSchema';
import { EmailChangeData } from '@/types/authTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import UpdateEmailForm from '@/pages/UpdateEmailPage/components/UpdateEmailForm';

const UpdateEmailPage = () => {
  const control = useForm<EmailChangeData>({
    defaultValues: {
      newEmail: '',
      verificationCode: 0,
    },
    resolver: zodResolver(emailChangeSchema),
    mode: 'onChange',
  });

  return (
    <div className="w-full h-screen min-h-screen flex flex-col relative">
      <DefaultHeader label="이메일 변경" hasBackButton />
      <FormProvider {...control}>
        <UpdateEmailForm />
      </FormProvider>
    </div>
  );
};

export default UpdateEmailPage;
