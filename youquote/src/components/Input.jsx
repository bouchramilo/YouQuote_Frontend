const Input = ({ type, name, required, placeholder, id, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      required={required}
      placeholder={placeholder}
      value={value} 
      onChange={onChange} 
      className="w-full pl-10 pr-4 py-2 border-2 border-secondary rounded-lg focus:outline-none focus:border-accent"
    />
  );
};

export default Input;
