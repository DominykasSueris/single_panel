import { ChangeEventHandler } from "react";

interface InputProps {
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: string;
  disabled: boolean;
}

const Input = ({ id, onChange, type, disabled }: InputProps) => {
  return (
    <div className="col-sm-12 col-md-6">
      <input
        onChange={onChange}
        id={id}
        type={type}
        className="form-control"
        required
        autoComplete={"on"}
        disabled={disabled}
      ></input>
    </div>
  );
};

export default Input;
