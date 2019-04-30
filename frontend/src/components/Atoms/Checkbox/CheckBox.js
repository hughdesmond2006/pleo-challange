import React from "react";
import PropTypes from "prop-types";

import styles from "./CheckBox.module.scss";

const CheckBox = ({ label, checked, onClick }) => {
  return (
    <>
      <p className={styles.label}>{label}</p>
      <div className={styles.checkbox} onClick={onClick}>
        {checked && <i className={"material-icons " + styles.tick}>check</i>}
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
