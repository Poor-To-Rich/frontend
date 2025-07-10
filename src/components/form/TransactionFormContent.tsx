import React from 'react';
import IncomeExpenseButton from '@/components/button/IncomeExpenseButton';
import TransactionFields from '@/components/input/transaction/TransactionFields';
import RepeatCircleButton from '@/components/button/icon/RepeatCircleButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import CustomIterationModal from '@/components/modal/custom/CustomIterationModal';
import IterationCycleModal from '@/components/modal/IterationCycleModal';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { CustomIterationType, IterationCycleValue } from '@/types/iterationTypes';
import clsx from 'clsx';
import { isIOSPWA } from '@/utils/deviceUtils';
import { SelectOptionsType } from '@/types/fieldType';

interface Props {
  transactionType: IncomeExpenseType;
  options: SelectOptionsType[];
  isValid: boolean;
  hasDraftData: boolean;
  isPending: boolean;
  isEdit?: boolean;
  onTransactionTypeChange: (value: IncomeExpenseType) => void;
  onSubmit: (e: React.FormEvent) => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isCustomOpen: boolean;
  closeCustom: () => void;
  backupCustomIteration: CustomIterationType | null;
  handleIterationTypeClick: (value: IterationCycleValue) => void;
}

const TransactionFormContent = ({
  transactionType,
  options,
  isValid,
  hasDraftData,
  isPending,
  isEdit = false,
  onTransactionTypeChange,
  onSubmit,
  isOpen,
  openModal,
  closeModal,
  isCustomOpen,
  closeCustom,
  backupCustomIteration,
  handleIterationTypeClick,
}: Props) => {
  return (
    <form className="flex flex-col w-full grow justify-between py-8 px-5" onSubmit={onSubmit}>
      <IncomeExpenseButton type={transactionType} onClick={onTransactionTypeChange} isEdit={isEdit} />
      <TransactionFields type={transactionType} options={options} />
      <div className={clsx(isIOSPWA && 'mb-9', 'w-full flex justify-between items-center')}>
        <RepeatCircleButton openModal={openModal} />
        <PrimaryButton
          data-testid="submit-button"
          label="저장"
          type="submit"
          disabled={!isValid || !hasDraftData}
          isPending={isPending}
        />
      </div>
      {isOpen && <IterationCycleModal onClose={closeModal} onClick={handleIterationTypeClick} />}
      {isCustomOpen && backupCustomIteration && (
        <CustomIterationModal
          backUpCustomIteration={backupCustomIteration}
          closeIteration={closeModal}
          closeCustom={closeCustom}
        />
      )}
    </form>
  );
};

export default TransactionFormContent;
