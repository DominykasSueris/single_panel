interface LabelProps {
  htmlFor: string;
  className: string;
  text: string;
}

const Label = ({ htmlFor, className, text }: LabelProps) => {
  return (
    <div className="col-sm-12 col-md-2">
      <label htmlFor={htmlFor} className={className}>
        {text}
      </label>
    </div>
  );
};

export default Label;
