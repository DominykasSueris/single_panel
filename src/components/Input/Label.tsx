interface LabelProps {
  htmlFor: string;
  className: string;
  text: string;
}

const Label = ({ htmlFor, className, text }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {text}
    </label>
  );
};

export default Label;
