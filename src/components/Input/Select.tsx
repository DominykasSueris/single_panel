import { WLDevProfiles } from "components/Auth/Login";
import { AuthRegion, AuthTarget } from "redux/specs/authSpecs";

interface SelectProps {
  defaultValue: WLDevProfiles | AuthTarget | AuthRegion;
  onChange: (input: any) => void;
  name: string;
  id: string;
  disabled: boolean;
  options: Option[];
}

export interface Option {
  key: string,
  value: string | number
}

const Select = ({ defaultValue, onChange, name, id, options, disabled }: SelectProps) => {
  return (
    <select
      defaultValue={defaultValue}
      onChange={onChange}
      name={name}
      required
      className="form-select"
      id={id}
      aria-label="Default select example"
      disabled={disabled}
    >
      {
        options.map(option =>
          <option key={option.key} value={option.key}>{option.value}</option>)
      }
    </select>
  );
};

export default Select;
