import React from "react";

const SelectLanguage = ({ toggleDropdown }) => {
  return (
    <select
      id="select1"
      className="font-poppins  focus:outline-none border-none accent-gray-900"
      onChange={toggleDropdown}
    >
      <option value="option1">English</option>
      <option value="option2">Hindi</option>
    </select>
  );
};

export default SelectLanguage;
