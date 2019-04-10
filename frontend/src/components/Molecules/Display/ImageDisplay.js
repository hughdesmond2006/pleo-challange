import React, { Component } from "react";
import PropTypes from "prop-types";

import "./ImageDisplay.scss";

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
        className={"image__wrap"}
        onMouseOver={this.showDelete}
        onMouseOut={this.hideDelete}
      >
        <a
          className={
            "image__delete" +
            (showDelete && onDelete ? " image__delete--show" : "")
          }
          onClick={() => onDelete(image.url)}
        />
        <div
          className={"image__display"}
          style={{
            backgroundImage: `url(${process.env.REACT_APP_API_URL + image.url})`
          }}
        />
      </div>
    );
  }
}

ImageDisplay.propTypes = {
  image: PropTypes.shape({ url: PropTypes.string }).isRequired,
  onDelete: PropTypes.func
};

ImageDisplay.defaultProps = {
  onDelete: null
};

export default ImageDisplay;
