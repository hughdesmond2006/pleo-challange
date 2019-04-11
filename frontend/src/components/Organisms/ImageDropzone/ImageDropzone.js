import React, { Component } from "react";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";

import WarningModal from "../../Atoms/Modal/WarningModal";
import "./ImageDropzone.scss";
import axios from "axios";
import ImageDisplay from "../../Molecules/Display/ImageDisplay";
import { receiptType } from "../../../types/propShapes";

class ImageDropzone extends Component {
  constructor(props) {
    super(props);
    const { images } = this.props;

    // 10 mb max
    this.imageMaxSize = 10000000;

    this.state = {
      isExpanded: false,
      images: images,
      showWarning: false,
      warningMessage: {
        title: "",
        body: ""
      }
    };
  }

  //called when a new image is dropped or selected..
  onChange = (expenseID, files) => {
    //Check to make sure image is valid..
    if (files && files.length > 0) {
      const isValid = this.validateFile(files[0]);
      if (isValid) {
        const formData = new FormData();
        formData.append("receipt", files[0], files[0].name);

        axios
          .post(
            `http://localhost:3000/expenses/${expenseID}/receipts`,
            formData
          )
          .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error(`failed to upload new image for #${expenseID}`);
            }

            this.refreshImageList(expenseID);
          })
          .catch(err => {
            console.dir(err);
          });
      }
    } else {
      this.setWarning("Wrong File Type!", `Please choose a PNG/JPEG file`);
    }
  };

  validateFile(file) {
    if (file.size > this.imageMaxSize) {
      this.setWarning(
        "The image file size is too big!",
        `Please choose a file smaller then ${this.imageMaxSize / 100000} KB`
      );
      return false;
    }
    return true;
  }

  refreshImageList = expenseID => {
    axios
      .get(`http://localhost:3000/expenses/${expenseID}`)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`failed to receive expense data for #${expenseID}`);
        }

        this.setState({ images: res.data.receipts });
      })
      .catch(err => {
        console.dir(err);
      });
  };

  toggleWarning() {
    this.setState(prevState => ({ isExpanded: !prevState.showWarning }));
  }

  setWarning(title, body) {
    this.setState({
      showWarning: true,
      warningMessage: {
        title,
        body
      }
    });
  }

  removeImage = (expenseID, url) => {
    axios
      .delete(`http://localhost:3000/expenses/${expenseID}${url}`)
      .then(() => {
        console.log("IMAGE REMOVED: " + url);
        this.refreshImageList(expenseID);
      })
      .catch(err => {
        console.dir(err);
      });
  };

  browseImages = () => {
    this.refs.dropzone.open();
  };

  toggleExpander = () => {
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  };

  render() {
    const { expenseID } = this.props;

    const { isExpanded, images, showWarning, warningMessage } = this.state;

    return (
      <>
        {showWarning && (
          <WarningModal
            modalOpen={showWarning}
            onCloseModal={() => this.toggleWarning()}
            title={warningMessage.title}
            body={warningMessage.body}
          />
        )}
        {isExpanded && (
          <Dropzone
            className="dropzone"
            onDrop={this.onChange.bind(this, expenseID)}
            maxSize={this.imageMaxSize}
            accept="image/jpeg, image/png"
            multiple={false}
            disableClick={true}
            ref={"dropzone"}
          >
            <ul className={"image__list"}>
              {images.map((image, i) => (
                <li key={i}>
                  <ImageDisplay
                    image={image}
                    onDelete={this.removeImage.bind(this, expenseID)}
                  />
                </li>
              ))}
              <div className={"image__add"}>
                <div className={"add__click"} onClick={this.browseImages} />
                <p className={"add__plus"}>+</p>
                <p className={"add__text"}>
                  Drop or click here to add a new receipt
                </p>
              </div>
            </ul>
          </Dropzone>
        )}
        <div className={"dropzone__expander"} onClick={this.toggleExpander}>
          {isExpanded ? (
            <p className={"expander__arrow"}>^</p>
          ) : (
            <p className={"expander__receipt-count"}>
              Receipts ({images.length})
            </p>
          )}
        </div>
      </>
    );
  }
}

ImageDropzone.propTypes = {
  images: PropTypes.arrayOf(receiptType).isRequired,
  expenseID: PropTypes.string.isRequired
};

export default ImageDropzone;
