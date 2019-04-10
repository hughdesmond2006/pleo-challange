import React from "react";
import PropTypes from 'prop-types'

import "./ExpenseCard.scss";
import CommentInput from "../../Molecules/Input/CommentInput";
import ImageDropzone from "../../Organisms/ImageDropzone/ImageDropzone";

//functional dumb display component
const ExpenseCard = ({expenseData}) => {
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
        <div className={"card__receipts-area"}>
          <ImageDropzone images={expenseData.receipts} expenseID={expenseData.id}
          />
        </div>
        <div className={"card__expander-area"}>
          ^
        </div>
      </div>
    );
};

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
  }).isRequired,
};

export default ExpenseCard;
