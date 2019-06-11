import React from "react";
import PropTypes from "prop-types";

function TextInput({
  id,
  name,
  type,
  onBlur,
  onChange,
  value,
  required,
  label,
  error
}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        id={id}
        type={type}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        required={required}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["email", "text", "number", "password"]),
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string
};

TextInput.defaultProps = {
  required: false,
  error: ""
};

export default TextInput;
