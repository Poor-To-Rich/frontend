import DefaultHeader from '@/components/header/DefaultHeader';
import { FormProvider, useForm } from 'react-hook-form';
import FindIDForm from './components/FindIDForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { findUsernameSchema } from '@/schemas/authSchema';

const FindIDPage = () => {
  const method = useForm({
    mode: 'onChange',
    resolver: zodResolver(findUsernameSchema),
  });

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <DefaultHeader hasBackButton label="아이디 찾기" />
      <FormProvider {...method}>
        <FindIDForm />
      </FormProvider>
    </div>
  );
};

export default FindIDPage;
