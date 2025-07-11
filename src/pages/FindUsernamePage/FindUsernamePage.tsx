import DefaultHeader from '@/components/header/DefaultHeader';
import { FormProvider, useForm } from 'react-hook-form';
import FindUsernameForm from './components/FindUsernameForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { findUsernameSchema } from '@/schemas/authSchema';
import useFindUsername from '@/hooks/apis/auth/useFindUsername';
import { FindUsernameReq } from '@/types/authTypes';
import CustomError from '@/utils/error/CustomError';
import ResultMessageBox from '@/components/auth/ResultMessageBox';

const FindUsernamePage = () => {
  const method = useForm({
    mode: 'onChange',
    resolver: zodResolver(findUsernameSchema),
  });
  const { mutate: findUsername, data, isSuccess, error, isError, isPending } = useFindUsername(method.setError);
  const isNotFound = isError && (error as CustomError).statusCode === 404;

  const onSubmit = (data: FindUsernameReq) => {
    findUsername(data);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <DefaultHeader hasBackButton label="아이디 찾기" />
      {isSuccess || isNotFound ? (
        <ResultMessageBox isNotFound={isNotFound} username={data?.data?.username} />
      ) : (
        <FormProvider {...method}>
          <FindUsernameForm onSubmit={onSubmit} isPending={isPending} />
        </FormProvider>
      )}
    </div>
  );
};

export default FindUsernamePage;
