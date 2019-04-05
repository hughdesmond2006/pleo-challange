import React, { Component } from "react";
import axios from 'axios';
import PropTypes from 'prop-types'

import "./ExpenseCard.scss";
import ImageUploadBox from "../../../Atoms/UploadBox/ImageUploadBox";
import CommentInput from "../../../Atoms/Input/CommentInput";


class ExpenseCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null
    };
  }

  fileSelectedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0]});
  };

  fileUploadHandler = (id) => {
    const formData = new FormData();
    formData.append('receipt', this.state.selectedFile, this.state.selectedFile.name);

    axios.post(`http://localhost:3000/expenses/${id}/receipts`, formData)
      .then(res => {
        console.log(res);
      });
  };

  onImageUploadStart() {
    this.setState({ isSaveDisabled: true });
  }

  onImageUploadFinish(imageFileURL) {
    const { onImageUploadFinish } = this.props;
    onImageUploadFinish(imageFileURL);

    this.setState({ isSaveDisabled: false });
  }

  render() {
    const { expenseData } = this.props;
    const { commentEditingEnabled } = this.state;

    return (
      <div className={"card"}>
        <div className={"card__header-area"}>
          <div className={"card__date"}>
            {new Date(expenseData.date).toLocaleDateString()}
          </div>
          <div className={"card__amount"}>
            {expenseData.amount.currency} {expenseData.amount.value}
          </div>
        </div>
        <div className={"card__details-area"}>
          <div className={"card__user"}>
            User: {expenseData.user.first} {expenseData.user.last} {/*expense.user.email*/}
          </div>
          <div className={"card__merchant"}>
            Merchant: {expenseData.merchant}
          </div>
          <div className={"card__category"}>
            Category: {expenseData.category}
          </div>
          <div className={"card__link"}>
            {expenseData.id}
          </div>
        </div>
        <CommentInput className={"card__comment-area"}
          text={expenseData.comment}
          id={expenseData.id}
        />
        <div className={"card__expander-area"}>
          ^
        </div>
        <ul key={expenseData.receipts.url} className={"card__receipts-area"}>
          <li className={"card__receipt temp1"}>
            receipt 1
          </li>
          <li className={"card__receipt temp2"}>
            receipt 2
          </li>
          <li className={"card__receipt temp3"}>
            receipt 3
          </li>
        </ul>
        <input type={"file"} onChange={this.fileSelectedHandler}/>
        <button className={"button1"} onClick={this.fileUploadHandler.bind(this, expenseData.id)}>Upload</button>
        <ImageUploadBox
          imageDesc="episode artwork"
          onUploadStart={() => this.onImageUploadStart()}
          onUploadFinish={imageFileURL => this.onImageUploadFinish(imageFileURL)}
        />
      </div>
    );
  }
}

ExpenseCard.propTypes = {
  expenseData: PropTypes.shape({
    id: PropTypes.string,
    amount: PropTypes.shape({
      currency: PropTypes.string,
      value: PropTypes.string
    }),
    date: PropTypes.string,
    merchant: PropTypes.string,
    receipts: PropTypes.arrayOf(
      PropTypes.shape({url: PropTypes.string})
    ),
    comment: PropTypes.string,
    category: PropTypes.string,
    user: PropTypes.shape({
      first: PropTypes.string,
      last: PropTypes.string,
      email: PropTypes.string
    }),
    index: PropTypes.number
  }),
};

export default ExpenseCard;
