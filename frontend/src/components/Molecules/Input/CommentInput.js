import React, { Component } from "react";

import './CommentInput.scss'
import axios from "axios";
import PropTypes from "prop-types";

class CommentInput extends Component {
  state = {
    text: '',
    isEditingEnabled: false,
    messageText: '',
    isMessageShowing: false,
    isMessageSuccess: true,
  };

  constructor(props) {
    super(props);

    this.state.text = props.text.trim();
  }

  saveChange = () => {
    let newText = this.refs.Textbox.textContent.trim();

    console.log("contents: " + newText);

    // only send a new request if the text has changed, unless retying after an upload error
    if(newText !== this.state.text || (this.state.isMessageShowing && !this.state.isMessageSuccess)) {
      this.setState({ text: newText});

      console.log(newText);

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
    }
  };

  componentDidUpdate() {
    console.log("new text: " + this.state.text);
  }

  onClick = () => {
    if (!this.state.isEditingEnabled) {
      let div = this.refs.Textbox;

      setTimeout(function() {
        div.focus();
        console.log("focused");
      }, 0);

      this.setState({
        isEditingEnabled: true
      });
    }
  };

  render() {
    let { text, isEditingEnabled, messageText, isMessageShowing, isMessageSuccess } = this.state;
    let { id } = this.props;

    return (
      <div className={"comment__wrap"}>
        <div className={"comment__text" + (text === '' && !isEditingEnabled ? " comment__text--hinting" : "")}
             contentEditable={isEditingEnabled}
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

};

CommentInput.defaultProps = {

};

export default CommentInput;
