const Error = ({ showError, errorMessage }) => {
  return (
    <>
     {showError && (
        <div className="text-red-600 text-xs">{errorMessage}</div>
      )}
    </>
  );
};

export default Error;
