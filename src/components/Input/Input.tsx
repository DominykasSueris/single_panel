import { ChangeEventHandler } from "react";

interface InputProps {
  className: string;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: string;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
}

const Input = ({ className, id, onChange, type, required, autoComplete, disabled }: InputProps) => {
  return (
    <div className="col-sm-12 col-md-6">
      <input
        onChange={onChange}
        id={id}
        type={type}
        className={className}
        required={required}
        autoComplete={autoComplete}
        disabled={disabled}
      ></input>
    </div>
  );
};

export default Input;
