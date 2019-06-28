import React from "react";
import PropTypes from "prop-types";

class TextInput extends React.Component {
  render() {
    return (
      <div>
        {this.props.label && (
          <>
            <label htmlFor={this.props.id}>{this.props.label}</label>
            <br data-testid="break" />
          </>
        )}
        <input
          id={this.props.id}
          type={this.props.type}
          name={this.props.name}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          value={this.props.value}
          required={this.props.required}
        />
        {this.props.error && <p style={{ color: "red" }}>{this.props.error}</p>}
      </div>
    );
  }
}

TextInput.propTypes = {
  label: PropTypes.string,
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
