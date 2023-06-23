interface IinputColor {
  label?: string;
  value?: string;
  onChange?: any;
}
const ColorInput = ({ label, value, onChange }: IinputColor) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <label className="col-form-label form-label-required">{label}</label>
      <input
        className="colorPicker"
        type="color"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ColorInput;
