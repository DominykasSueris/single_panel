import { ChangeEventHandler } from "react";

interface InputProps {
  id: string
  name?: string
  type?: string
  disabled?: boolean
  autoComplete?: boolean
  required?: boolean
  className?: string
  containerClassName?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Input = ({
  id,
  onChange,
  name = id,
  type = "text",
  containerClassName = "col-sm-12 col-md-6",
  className = "form-control",
  autoComplete = true,
  required = true,
  disabled = false }: InputProps) => {
  return (
    <div className={containerClassName}>
      <input
        onChange={onChange}
        id={id}
        name={name}
        type={type}
        className={className}
        autoComplete={autoComplete ? id : "off"}
        disabled={disabled}
        required={required}
      ></input>
    </div>
  );
};

export default Input;
