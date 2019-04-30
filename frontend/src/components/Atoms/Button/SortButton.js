import React from "react";
import PropTypes from "prop-types";

import styles from "./SortButton.module.scss";

const SortButton = ({ title, active, isAscending, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.title}>{title}</span>
      {active && (
        <i className={"material-icons " + styles.arrow}>
          {isAscending ? "arrow_drop_up" : "arrow_drop_down"}
        </i>
      )}
    </button>
  );
};

SortButton.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  isAscending: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default SortButton;
