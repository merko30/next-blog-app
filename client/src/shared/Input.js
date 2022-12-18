const Input = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div className="my-2 w-full">
    {props.label && (
      <label htmlFor={field.name} className="block">
        {props.label}
      </label>
    )}
    <input
      className="w-full p-2 border border-grey-lighter rounded"
      type="text"
      // id for testing purpose
      id={field.name}
      {...field}
      {...props}
    />
    {touched[field.name] && errors[field.name] && (
      <div className="text-red-600 text-sm uppercase font-bold">
        {errors[field.name]}
      </div>
    )}
  </div>
);

export default Input;
