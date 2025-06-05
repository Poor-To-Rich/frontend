import DefaultHeader from '@/components/header/DefaultHeader';
import { changePasswordSchema } from '@/schemas/authSchema';
import { ChangePasswordData } from '@/types/authTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import UpdatePasswordForm from './components/updatePasswordForm';

const UpdatePasswordPage = () => {
  const control = useForm<ChangePasswordData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      passwordConfirm: '',
    },
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  return (
    <div className="w-full h-screen min-h-screen flex flex-col relative">
      <DefaultHeader label="비밀번호 변경" hasBackButton />
      <FormProvider {...control}>
        <UpdatePasswordForm />
      </FormProvider>
    </div>
  );
};

export default UpdatePasswordPage;
