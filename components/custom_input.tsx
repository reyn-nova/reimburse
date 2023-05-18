type CustomInputComponentType = {
  placeholder: string;
  independentPlaceholder?: boolean;
  value?: string;
  type?: string;
  width?: string | number;
  margin?: string | number;
  isDisabled?: boolean;
};

const CustomInput = ({
  placeholder,
  type,
  width = "100%",
  margin,
  independentPlaceholder,
  value,
  isDisabled,
}: CustomInputComponentType) => {
  return (
    <div
      style={{
        width,
        margin,
      }}
    >
      {independentPlaceholder ? (
        <div
          style={{
            color: "black",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          {placeholder}
        </div>
      ) : null}

      {isDisabled ? (
        <div
          style={{
            color: "black",
          }}
        >
          {value}
        </div>
      ) : (
        <input
          placeholder={!independentPlaceholder ? placeholder : ""}
          type={type}
          style={{
            width,
            color: "black",
            padding: 10,
            borderRadius: 5,
            backgroundColor: "white",
            fontSize: 16,
          }}
        />
      )}
    </div>
  );
};

export default CustomInput;
