import { ChangeEvent } from "react"

interface InputProps {
    id: string,
    type?: string,
    label: string,
    value?: string,
    placeholder: string,
    required?: boolean
    disabled?: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const FormInput = (props: InputProps) => {
    return (
        <div className="row align-items-center">
            <div className="col-sm-12 col-md-3">
                <label htmlFor={props.id} className="col-form-label">
                    {props.label}
                </label>
            </div>
            <div className="col-sm-12 col-md-9">
                <input
                    id={props.id}
                    value={props.value}
                    placeholder={props.placeholder}
                    type={props.type ? props.type : "text"}
                    onChange={props.onChange}
                    className="form-control"
                    required={props.required ? props.required : true}
                    disabled={props.disabled ? props.disabled : false}
                >
                </input>
            </div>
        </div>
    )
}

export default FormInput;