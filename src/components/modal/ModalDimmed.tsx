interface Props {
  children: React.ReactNode;
  onClose?: () => void;
}

const ModalDimmed = ({ children, onClose }: Props) => {
  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-black/20 absolute inset-0 z-10"
      onClick={onClose}>
      {children}
    </div>
  );
};

export default ModalDimmed;
