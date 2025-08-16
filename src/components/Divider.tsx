interface Props {
  color?: string;
  weight?: number;
}

const Divider = ({ color = '#e6e6e6', weight = 2.5 }: Props) => {
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: color,
        height: weight,
      }}
    />
  );
};

export default Divider;
