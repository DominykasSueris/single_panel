import { WLDevProfiles } from "components/Auth/Login";
import { AuthRegion, AuthTarget } from "redux/specs/authSpecs";

interface SelectProps {
  defaultValue: WLDevProfiles | AuthTarget | AuthRegion;
  onChange: (input: any) => void;
  name: string;
  id: string;
  disabled?: boolean;
  values: WLDevProfiles | AuthTarget | AuthRegion;
}

const Select = ({ defaultValue, onChange, name, id, disabled }: SelectProps) => {
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
      ))
    </select>
  );
};

export default Select;
