import DefaultHeader from '@/components/header/DefaultHeader';
import { changePasswordSchema } from '@/schemas/authSchema';
import { ChangePasswordData } from '@/types/authTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import UpdatePasswordForm from '@/pages/UpdatePasswordPage/components/UpdatePasswordForm';
import { useNavigate } from 'react-router-dom';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';

const UpdatePasswordPage = () => {
  const navigate = useNavigate();
  const control = useForm<ChangePasswordData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  return (
    <div className="w-full h-screen min-h-screen flex flex-col relative">
      <DefaultHeader label="비밀번호 변경" leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} />
      <FormProvider {...control}>
        <UpdatePasswordForm />
      </FormProvider>
    </div>
  );
};

export default UpdatePasswordPage;
