import { ChangeEvent } from "react";

interface InputProps {
  id: string;
  type?: string;
  label: string;
  value?: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  id,
  type,
  label,
  value,
  placeholder,
  required,
  disabled,
  onChange
}: InputProps) => {
  return (
    <div className="row align-items-center p-2">
      <div className="col-sm-12 col-md-3">
        <label htmlFor={id} className="col-form-label">
          {label}
        </label>
      </div>
      <div className="col-sm-12 col-md-6">
        <input
          id={id}
          value={value}
          placeholder={placeholder}
          type={type ? type : "text"}
          onChange={onChange}
          className="form-control"
          required={required ? required : true}
          disabled={disabled ? disabled : false}
        ></input>
      </div>
    </div>
  );
};

export default FormInput;
