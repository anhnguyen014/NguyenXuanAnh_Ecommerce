import React from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, className, value, onChange, onBlur } = props;
  return (
    <div>
      {" "}
      <div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`form-control ${className}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

export default CustomInput;
