import SignButton from '@/components/button/SignButton';
import Logo from '/image/Logo.png';
import { useNavigate } from 'react-router-dom';
import FloatingLabelInput from '@/pages/LoginPage/components/FloatingLabelInput';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/authSchema';

const index = () => {
  const navigate = useNavigate();

  type FormData = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-36 bg-vanillaCream">
      <img src={Logo} className="w-[20rem]" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-3/5 gap-10">
        <div className="flex flex-col w-full gap-7">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <FloatingLabelInput label="아이디" type="text" {...field} errorMessage={errors.username?.message} />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FloatingLabelInput label="비밀번호" type="password" {...field} errorMessage={errors.password?.message} />
            )}
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          <SignButton label="로그인" onClick={() => navigate('/login')} disabled={!isValid} type="submit" />
          <SignButton label="회원가입" onClick={() => navigate('/signup')} />
        </div>
      </form>
    </div>
  );
};

export default index;
