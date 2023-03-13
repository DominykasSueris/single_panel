interface SpanProps {
  id: string;
  text: string;
}

const Span = ({ id, text }: SpanProps) => {
  return (
    <div className="col-sm-12 col-md-4">
      <span id={id} className="form-text">
        {text}
      </span>
    </div>
  );
};

export default Span;
