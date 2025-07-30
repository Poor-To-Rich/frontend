interface Props {
  children: React.ReactNode;
  onClose?: () => void;
}

const ModalDimmed = ({ children, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/20" onClick={onClose}>
      <div className="w-full flex justify-center max-w-[90%] sm:max-w-[500px]">{children}</div>
    </div>
  );
};

export default ModalDimmed;
