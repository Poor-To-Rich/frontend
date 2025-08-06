import XIconButton from '@/components/button/icon/XIconButton';
import ModalButton from '@/components/button/modal/ModalButton';
import CheckedCircleIcon from '@/components/icon/CheckedCircleIcon';
import DefaultCircleIcon from '@/components/icon/DefaultCircleIcon';
import { REPORT_REASONS_OPTIONS } from '@/constants/options';
import clsx from 'clsx';
import { useState } from 'react';

const ReportReasonModal = () => {
  const [reason, setReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');

  return (
    <div
      className="min-w-[63%] w-fit p-10 flex flex-col items-start justify-evenly gap-6 rounded-lg bg-white relative"
      onClick={e => e.stopPropagation()}>
      <XIconButton className="absolute top-5 left-5" />
      <p className="w-full text-center">신고 사유 선택</p>
      <form className="w-full flex flex-col gap-4 items-start my-3">
        {REPORT_REASONS_OPTIONS.map(({ label, value }) => (
          <label
            key={value}
            className={clsx('flex gap-2.5 cursor-pointer', value === 'CUSTOM' ? 'items-start w-full' : 'items-center')}>
            <input
              type="radio"
              name="reportReason"
              value={value}
              checked={reason === value}
              onChange={() => setReason(value)}
              className="hidden"
            />
            {reason === value ? <CheckedCircleIcon /> : <DefaultCircleIcon />}
            <div className="w-full flex flex-col gap-1.5">
              <p className="text">{label}</p>
              {value === 'CUSTOM' && (
                <textarea
                  value={customReason}
                  onChange={e => setCustomReason(e.target.value)}
                  placeholder="신고 사유를 입력하세요"
                  className="w-full h-24 p-2 border border-strokeGray rounded-md text-sm focus:outline-none resize-none overflow-y-auto custom-scrollbar"
                  required
                />
              )}
            </div>
          </label>
        ))}
      </form>
      <div className="flex w-full justify-end gap-4">
        <ModalButton label={'제출'} type="submit" />
      </div>
    </div>
  );
};

export default ReportReasonModal;
