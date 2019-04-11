import React from "react";

import "./ExpenseCard.scss";
import CommentInput from "../../Molecules/Input/CommentInput";
import ImageDropzone from "../../Organisms/ImageDropzone/ImageDropzone";
import { expenseType } from "../../../types/propShapes";

//functional dumb display component
const ExpenseCard = ({expenseData}) => {
    return (
      <div className={"card"}>
        <div className={"card__header-area"}>
          <div className={"card__date"}>
            {new Date(expenseData.date).toLocaleDateString('en-GB')}
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
          <ImageDropzone images={expenseData.receipts} expenseID={expenseData.id} />
        </div>
      </div>
    );
};

ExpenseCard.propTypes = {
  expenseData: expenseType.isRequired
};

export default ExpenseCard;
