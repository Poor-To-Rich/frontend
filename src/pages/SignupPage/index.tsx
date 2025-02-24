import PrimaryButton from '@/components/button/PrimaryButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import SelectBox from '@/components/input/SelectBox';
import PrimaryInput from '@/components/input/PrimaryInput';
import { GENDER_OPTIONS, JOB_OPTIONS } from '@/constants/options';

const index = () => {
  return (
    <div>
      <DefaultHeader label="회원가입" hasBackButton />
      <form className="px-5">
        <div className="flex flex-col gap-3 my-20">
          <PrimaryInput label="이름" isRequired type="text" />
          <PrimaryInput label="닉네임" isRequired type="text" />
          <PrimaryInput label="아이디" isRequired type="text" buttonLabel="중복확인" />
          <PrimaryInput label="비밀번호" isRequired type="password" />
          <PrimaryInput label="비밀번호 재입력" isRequired type="password" />
          <PrimaryInput label="생년월일" isRequired type="date" />
          <PrimaryInput label="이메일" isRequired type="email" buttonLabel="인증" />
          <PrimaryInput label="인증 코드" isRequired type="text" buttonLabel="확인" />
          <SelectBox isRequired options={GENDER_OPTIONS} />
          <SelectBox options={JOB_OPTIONS} />
        </div>
        <div className="w-full flex justify-end">
          <PrimaryButton label="회원가입" />
        </div>
      </form>
    </div>
  );
};

export default index;
