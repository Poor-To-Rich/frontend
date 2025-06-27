import { StepData } from '@/types/types';

const StepItem = ({ step, index }: { step: StepData; index: number }) => (
  <div className={`flex items-start space-x-3 p-3 bg-[#F0F8FF] rounded-lg`}>
    <div
      className={`flex-shrink-0 w-6 h-6 bg-oceanBlue mt-1 text-white rounded-full flex items-center justify-center text-sm font-medium`}>
      {index + 1}
    </div>
    <div>
      <p className="text-md font-medium text-gray-900">{step.title}</p>
      <p className="text-sm text-gray-600 mt-1">
        {step.description} {step.icon}
      </p>
    </div>
  </div>
);

export default StepItem;
