import BackButton from "../Buttons/BackButton";

const ComingSoonAlert = () => {
  return (
    <>
      <BackButton />
      <div
        className="alert alert-warning col-sm-12 col-md-6 offset-md-3 text-center mt-4"
        role="alert"
      >
        Coming Soon!!!
      </div>
    </>
  );
};

export default ComingSoonAlert;
