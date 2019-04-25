import React from "react";
import PropTypes from "prop-types";

import "./CheckBox.scss";

const CheckBox = ({ label, checked, onClick }) => {
  return (
    <>
      <p className={"checkbox__label"}>{label}</p>
      <div className={"checkbox"} onClick={onClick}>
        {checked && <i className="material-icons checkbox__tick">check</i>}
      </div>
    </>
  );
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

CheckBox.defaultProps = {
  checked: false
};

export default CheckBox;
