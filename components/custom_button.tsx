type CustomButtonComponentType = {
  label: string;
  onClick?: () => void;
  backgroundColor?: string;
  width?: string | number;
  margin?: string | number;
};

const CustomButton = ({
  label,
  onClick,
  backgroundColor = "green",
  width = "100%",
  margin,
}: CustomButtonComponentType) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor,
        padding: 10,
        color: "white",
        borderRadius: 5,
        width,
        fontSize: 16,
        margin,
        fontWeight: "bold",
      }}
    >
      {label}
    </button>
  );
};

export default CustomButton;
