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

const FormSelect = (props: SelectProps) => {
  return (
    <div className="row align-items-center p-2">
      <div className="col-sm-12 col-md-3">
        <label htmlFor={props.id} className="col-form-label">
          {props.label}
        </label>
      </div>
      <div className="col-sm-12 col-md-6">
        <select
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          className="form-select"
          required={props.required ? props.required : true}
          disabled={props.disabled ? props.disabled : false}
        >
          {props.options.map(option => (
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
