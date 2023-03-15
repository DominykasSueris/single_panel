import { ChangeEvent } from "react";

interface SelectProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelect = ({ id, label, options, value, required, disabled, onChange }: SelectProps) => {
  return (
    <div className="row align-items-center p-2">
      <div className="col-sm-12 col-md-3">
        <label htmlFor={id} className="col-form-label">
          {label}
        </label>
      </div>
      <div className="col-sm-12 col-md-6">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="form-select"
          required={required ? required : true}
          disabled={disabled ? disabled : false}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormSelect;
