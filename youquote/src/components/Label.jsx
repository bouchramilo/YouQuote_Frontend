const Label = ({ forname, name, labelname }) => {
  return (
    <>
      <label
        htmlFor={forname}
        name={name}
        className="block text-sm font-body text-text mb-2"
      >
        {labelname}
      </label>
    </>
  );
};

export default Label;
