interface IOutlinedBtn {
  title: string;
  onClick?: any;
  disabled?: boolean;
}

const OutlinedBtn = ({
  title,
  onClick = () => {},
  disabled = false,
}: IOutlinedBtn) => {
  return (
    <button
      disabled={disabled}
      type="button"
      className={`custom-grey-outline-btn ms-2 ${
        disabled ? "disbaled-grey-outline-btn" : ""
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default OutlinedBtn;
