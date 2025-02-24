import SignButton from '@/components/button/SignButton';
import Logo from '/image/Logo.png';
import { useNavigate } from 'react-router-dom';
import FloatingLabelInput from '@/pages/LoginPage/components/FloatingLabelInput';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/authSchema';

const index = () => {
  const navigate = useNavigate();

  type FormData = z.infer<typeof loginSchema>;

  const {
    register,
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
          <FloatingLabelInput
            label="아이디"
            type="text"
            {...register('username')}
            errorMessage={errors.username?.message}
          />
          <FloatingLabelInput
            label="비밀번호"
            type="password"
            {...register('password')}
            errorMessage={errors.password?.message}
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
