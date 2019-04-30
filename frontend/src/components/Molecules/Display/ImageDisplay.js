import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./ImageDisplay.module.scss";
import { receiptType } from "../../../types/propShapes";

class ImageDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDelete: false
    };
  }

  showDelete = () => {
    this.setState({ showDelete: true });
  };

  hideDelete = () => {
    this.setState({ showDelete: false });
  };

  render() {
    const { image, onDelete } = this.props;
    const { showDelete } = this.state;

    // only shows the delete button if a delete function is defined
    return (
      <div
        className={styles.wrap}
        onMouseOver={this.showDelete}
        onMouseOut={this.hideDelete}
      >
        <div
          className={
            styles.delete + " " +
            (showDelete && onDelete ? styles.deleteShow : "")
          }
          onClick={() => onDelete(image.url)}
        >
        </div>
        <div
          className={styles.display}
          style={{
            backgroundImage: `url(${process.env.REACT_APP_API_URL + image.url})`
          }}
        />
      </div>
    );
  }
}

ImageDisplay.propTypes = {
  image: receiptType.isRequired,
  onDelete: PropTypes.func
};

ImageDisplay.defaultProps = {
  onDelete: null
};

export default ImageDisplay;
