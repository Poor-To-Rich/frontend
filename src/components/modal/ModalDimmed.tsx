interface Props {
  children: React.ReactNode;
  onClose?: () => void;
}

const ModalDimmed = ({ children, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/20" onClick={onClose}>
      {children}
    </div>
  );
};

export default ModalDimmed;
