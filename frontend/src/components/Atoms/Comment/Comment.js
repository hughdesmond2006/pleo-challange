import React, { Component } from "react";

class Comment extends Component {
  state = {
    text: null
  };

  constructor(props) {
    super(props);

    this.state.text = props.text;
  }

  saveChange = () => {
    let newText = this.refs.TextArea.value;

    if(newText !== this.state.text) {
      this.setState({ text: newText});

      fetch("http://localhost:3000/expenses/" + this.props.id, {
        method: "POST",
        body: `{"comment":"${newText}"}`,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed to update comment on server!");
          }
        })
        .catch(err => {
          console.dir(err);
        });
    }
  };

  handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
      case 'Escape':
        this.refs.TextArea.blur();
        break;
    }
  };

  componentDidUpdate() {
    console.log("new text: " + this.state.text);
  }

  render() {
    return (
      <textarea
        id={this.props.id}
        onBlur={this.saveChange}
        onKeyDown={this.handleKeyDown}
        ref={'TextArea'}
      >
        {this.state.text}
      </textarea>
    );
  }
}

export default Comment;
