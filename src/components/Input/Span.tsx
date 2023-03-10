interface SpanProps {
  id: string;
  className: string;
  text: string;
}

const Span = ({ id, className, text }: SpanProps) => {
  return (
    <div className="col-sm-12 col-md-4">
      <span id={id} className={className}>
        {text}
      </span>
    </div>
  );
};

export default Span;
