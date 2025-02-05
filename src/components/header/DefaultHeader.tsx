interface Props {
  label: string;
  hasBackButton?: boolean;
  hasPlusButton?: boolean;
  hasDeleteButton?: boolean;
}

const DefaultHeader = ({ label, hasBackButton, hasPlusButton, hasDeleteButton }: Props) => {
  return (
    <div className="w-full h-[50px] flex justify-center items-center bg-red-50 font-bold">
      <span>{label}</span>
    </div>
  );
};

export default DefaultHeader;
