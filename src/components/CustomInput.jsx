import React from "react";

const CustomInput = (props) => {
  const { type, i_classname, placeholder, i_id, name, value, onCh, onBlr } =
    props;
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control ${i_classname}`}
        id={i_id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onCh}
        onBlur={onBlr}
      />
      <label htmlFor={i_id}>{placeholder}</label>
    </div>
  );
};

export default CustomInput;
