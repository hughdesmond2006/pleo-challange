import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import WarningModal from "../Modal/WarningModal";
import Spinner from "../Spinner/Spinner";

import '../../../App.scss';

class ImageUploadBox extends Component {
  constructor(props) {
    super(props);

    // 10 mb max
    this.imageMaxSize = 10000000;

    this.state = {
      imageFile: null,
      percentComplete: 100,
      uploading: false,
      showWarning: false,
      warningMessage: {
        title: '',
        body: '',
      },
    };
  }

  // called in intervals during image upload..
  componentDidUpdate(prevProps) {
    const { onUploadFinish, uploadData } = this.props;
    const { percentComplete, uploading } = this.state;

    if (uploading) {
      // if uploadData has changed..
      if (uploadData !== prevProps.uploadData) {
        // console.log(`image uploading ${uploadData.percentCompleted}%`);
        // if the upload is not complete update the % progress
        if (uploadData.complete) {
          // expose the image file to props
          //onUploadFinish(CDN_URL + uploadData.fileKey);
          // redux reset to clear loading cache from previous file
          //reset();
          // not eslint valid, may need help refactoring
          this.setState({ uploading: false, percentComplete: 100 });
        } else if (typeof uploadData.percentCompleted === 'number') {
          this.setState({ percentComplete: uploadData.percentCompleted });
        }

        // If error, display it
        if (uploadData.error) {
          this.showWarning(
            'An Error occurred while uploading the file, please try again!',
            uploadData.error.toString(),
          );
        }
      }
    }
  }

  //called when a new image is dropped or selected..
  onChange(files) {
    const { onUploadStart } = this.props;

    //Check to make sure image is valid..
    if (files && files.length > 0) {
      const isValid = this.validateFile(files[0]);
      if (isValid) {
        const reader = new FileReader();

        // this is to quickly display the base64 of the image so no wait for the upload is required..
        reader.addEventListener(
          'load',
          () => {
            // set loading state in parent component..
            onUploadStart();
            // set loading state within this component..
            this.setState({ imageFile: reader.result, uploading: true, percentComplete: 0 });

            console.log("Upload started: " + files[0]);

            // start progress tracked upload to server
            //this.uploadFile(files[0]);
          },
          false,
        );
        reader.readAsDataURL(files[0]);
      }
    } else {
      this.showWarning('Wrong File Type!', `Please choose a PNG/JPEG file`);
    }
  }

  validateFile(file) {
    if (file.size > this.imageMaxSize) {
      this.showWarning(
        'The image file size is too big!',
        `Please choose a file smaller then ${this.imageMaxSize / 100000} KB`,
      );
      return false;
    }
    return true;
  }


  // TODO upload code...
  uploadFile(file) {
    const { accountId, projectId, episodeId } = localStorage;
    const { upload } = this.props;

    const formData = new FormData();
    formData.append('filename', file.name);
    formData.append('type', 'image');
    formData.append('media', file);
    formData.append('tags', '["podcast_artwork"]');
    formData.append('episodeid', episodeId);

    // start the upload by calling a redux function "upload"
    upload(accountId, projectId, formData);
    // can track the upload in componentWillReceiveProps func above
  }

  toggleWarning() {
    this.setState(prevState => ({ showWarning: !prevState.showWarning }));
  }

  showWarning(title, body) {
    this.setState({
      showWarning: true,
      warningMessage: {
        title,
        body,
      },
    });
  }

  render() {
    const { imageDesc } = this.props;
    const { imageFile, showWarning, warningMessage, percentComplete, uploading } = this.state;

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
        <Dropzone
          className="uploadBox imageContainer"
          onDrop={(files, rejectedFiles) => this.onChange(files, rejectedFiles)}
          maxSize={this.imageMaxSize}
          accept="image/jpeg, image/png"
          multiple={false}
        >
          {imageFile && (
            <>
              <img src={imageFile} alt={imageDesc} className="imagePreview" />
              <div className="imagePreviewOverlay" style={{ width: `${100 - percentComplete}%` }} />
              {uploading && <Spinner/>}
            </>
          )}
          {!imageFile && (
            <>
              <div className="plus-ico" />
              <p>{`Drop ${imageDesc} here or click to browse`}</p>
            </>
          )}
        </Dropzone>
      </>
    );
  }
}

export default ImageUploadBox;

ImageUploadBox.propTypes = {
  imageDesc: PropTypes.string.isRequired,
  onUploadStart: PropTypes.func.isRequired,
  onUploadFinish: PropTypes.func.isRequired
};
