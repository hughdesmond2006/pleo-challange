import React, { Component } from "react";

import './CommentInput.scss'
import axios from "axios";
import PropTypes from "prop-types";
import store from "../../../redux/store";
import { updateComment } from "../../../redux/actions/expensesActions";

class CommentInput extends Component {
  constructor(props) {
    super(props);
    const { text } = this.props;

    this.state = {
      text: text.trim(),
      isEditingEnabled: false,
      messageText: '',
      isMessageShowing: false,
      isMessageSuccess: true
    };
  }

  saveChange = () => {
    let newText = this.refs.Textbox.textContent.trim();

    // only send a new request if the text has changed, unless retying after an upload error
    if(newText !== this.state.text || (this.state.isMessageShowing && !this.state.isMessageSuccess)) {
      this.setState({ text: newText});

      // post new comment to api
      axios.post("http://localhost:3000/expenses/" + this.props.id, {
        comment: newText
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed to update comment on server!");
          }

          this.setState({
            isEditingEnabled: false,
            messageText: "Saved!",
            isMessageShowing: true,
            isMessageSuccess: true
          });

          //call redux func to update app state
          store.dispatch(updateComment(res.data.id, res.data.comment));

          setTimeout(
            function() {
              this.setState({
                isMessageShowing: false
              });
            }.bind(this),
            2000
          );
        })
        .catch(err => {
          console.dir(err);

          this.setState({
            messageText: "Error! Please retry..",
            isMessageShowing: true,
            isMessageSuccess: false
          });
        });
    }else{
      this.setState({
        isEditingEnabled: false
      });
    }
  };

  handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
      case 'Escape':
        this.refs.Textbox.blur();
        this.setState({
          isEditingEnabled: false
        });
        break;
      default:
    }
  };

  onClick = () => {
    if (!this.state.isEditingEnabled) {
      let div = this.refs.Textbox;

      setTimeout(function() {
        div.focus();
      }, 0);

      this.setState({
        isEditingEnabled: true
      });
    }
  };

  render() {
    const { text, isEditingEnabled, messageText, isMessageShowing, isMessageSuccess } = this.state;
    const { id, highlightClass } = this.props;

    // I am suppressing React's warning about unmanaged children as I am handling it myself
    return (
      <div className={"comment__wrap"}>
        <div className={"comment__text" + (text === '' && !isEditingEnabled ? " comment__text--hinting" : "") + highlightClass}
             contentEditable={isEditingEnabled}
             suppressContentEditableWarning={true}
             onMouseDown={this.onClick}
             onKeyDown={this.handleKeyDown}
             onBlur={this.saveChange}
             id={id}
             ref={'Textbox'}>
          {text === '' && !isEditingEnabled ? 'Enter a comment!' : text}
        </div>
        {isMessageShowing &&
          <div className={"comment__toast comment__toast--" + (isMessageSuccess ? "success" : "fail")}>
            {messageText}
          </div>
        }
      </div>
    );
  }
}

CommentInput.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  highlightClass: PropTypes.string
};

CommentInput.defaultProps = {
  text: '',
  highlightClass: ''
};

export default CommentInput;
