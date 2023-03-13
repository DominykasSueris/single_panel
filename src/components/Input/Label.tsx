interface LabelProps {
  htmlFor: string;
  text: string;
}

const Label = ({ htmlFor, text }: LabelProps) => {
  return (
    <div className="col-sm-12 col-md-2">
      <label htmlFor={htmlFor} className="col-form-label">
        {text}
      </label>
    </div>
  );
};

export default Label;
