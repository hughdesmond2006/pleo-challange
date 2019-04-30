import React, { Component } from "react";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";

import WarningModal from "../../Atoms/Modal/WarningModal";
import styles from "./ImageDropzone.module.scss";
import axios from "axios";
import ImageDisplay from "../../Molecules/Display/ImageDisplay";
import { receiptType } from "../../../types/propShapes";
import store from "../../../redux/store";
import { addReceipt, removeReceipt } from "../../../redux/actions/expensesActions";

class ImageDropzone extends Component {
  constructor(props) {
    super(props);

    // 10 mb max
    this.imageMaxSize = 10000000;

    this.state = {
      isExpanded: false,
      showWarning: false,
      showDropBorder: false,
      warningMessage: {
        title: "",
        body: ""
      }
    };
  }

  //called when a new image is dropped or selected..
  onChange = (expenseID, files) => {
    this.setState({ showDropBorder: false});

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

            //call redux func to update app state. send expense id and url of new receipt
            store.dispatch(addReceipt(expenseID, res.data.receipts[res.data.receipts.length - 1].url));
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

  toggleWarning = () => {
    this.setState(prevState => ({ showWarning: !prevState.showWarning }));
  };

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
        //call redux func to update app state
        store.dispatch(removeReceipt(expenseID, url));
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

  onDragEnter = () => {
    this.setState({ showDropBorder: true});
  };

  onDragLeave = () => {
    this.setState({ showDropBorder: false});
  };

  render() {
    const { expenseID, images } = this.props;
    const { showDropBorder, isExpanded, showWarning, warningMessage } = this.state;

    return (
      <>
        {showWarning && (
          <WarningModal
            modalOpen={showWarning}
            onCloseModal={this.toggleWarning}
            title={warningMessage.title}
            body={warningMessage.body}
          />
        )}
        {isExpanded && (
          <Dropzone
            className={styles.zone + " " + (showDropBorder ? styles.zoneDragover : "")}
            onDrop={this.onChange.bind(this, expenseID)}
            maxSize={this.imageMaxSize}
            accept="image/jpeg, image/png"
            multiple={false}
            disableClick={true}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            ref={"dropzone"}
          >
            <ul className={styles.list}>
              {images.map((image, i) => (
                <li key={i}>
                  <ImageDisplay
                    image={image}
                    onDelete={this.removeImage.bind(this, expenseID)}
                  />
                </li>
              ))}
              <div className={styles.add}>
                <div className={styles.add_click} onClick={this.browseImages} />
                <p className={styles.add_plus}>+</p>
                <p className={styles.add_text}>
                  Drop or click here to add a new receipt
                </p>
              </div>
            </ul>
          </Dropzone>
        )}
        <div className={styles.expander} onClick={this.toggleExpander}>
          {isExpanded ? (
            <p className={styles.expander_arrow}>^</p>
          ) : (
            <p className={styles.expander_count}>
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
