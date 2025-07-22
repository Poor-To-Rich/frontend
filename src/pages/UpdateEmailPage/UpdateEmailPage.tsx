import DefaultHeader from '@/components/header/DefaultHeader';
import { emailChangeSchema } from '@/schemas/authSchema';
import { EmailChangeData } from '@/types/authTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import UpdateEmailForm from '@/pages/UpdateEmailPage/components/UpdateEmailForm';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import { useNavigate } from 'react-router-dom';

const UpdateEmailPage = () => {
  const navigate = useNavigate();
  const control = useForm<EmailChangeData>({
    defaultValues: {
      email: '',
      verificationCode: 0,
    },
    resolver: zodResolver(emailChangeSchema),
    mode: 'onChange',
  });

  return (
    <div className="w-full h-screen min-h-screen flex flex-col relative">
      <DefaultHeader label="이메일 변경" leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <FormProvider {...control}>
            <UpdateEmailForm />
          </FormProvider>
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default UpdateEmailPage;
