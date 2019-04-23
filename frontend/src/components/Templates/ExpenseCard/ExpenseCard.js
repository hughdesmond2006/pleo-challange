import React from "react";

import "./ExpenseCard.scss";
import CommentInput from "../../Molecules/Input/CommentInput";
import ImageDropzone from "../../Organisms/ImageDropzone/ImageDropzone";
import { expenseType } from "../../../types/propShapes";

//functional dumb display component
const ExpenseCard = ({ expenseData }) => {
  const prettyAmount = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: expenseData.amount.currency,
    useGrouping: true
  }).format(expenseData.amount.value);

  return (
    <div className={"card"}>
      <div className={"card__header-area"}>
        <div className={"card__date"}>
          {new Date(expenseData.date).toLocaleDateString("en-GB")}
        </div>
        <div className={"card__amount"}>{prettyAmount}</div>
      </div>
      <div className={"card__details-area"}>
        <div className={"card__details-wrap"}>
          <div>
            <i className="material-icons">link</i> <p>{expenseData.id}</p>
          </div>
          <div>
            <i className="material-icons">face</i>
            <p>
              <a
                href={
                  "mailto:" +
                  expenseData.user.email +
                  "?subject=Expense ID #" +
                  expenseData.id
                }
              >
                {expenseData.user.first} {expenseData.user.last}
              </a>
            </p>
          </div>
          <div>
            <i className="material-icons">store</i>
            <p>{expenseData.merchant}</p>
          </div>
          <div>
            {expenseData.category && <i className="material-icons">category</i>}
            <p>{expenseData.category}</p>
          </div>
        </div>
      </div>
      <CommentInput
        className={"card__comment-area"}
        text={expenseData.comment}
        id={expenseData.id}
      />
      <div className={"card__receipts-area"}>
        <ImageDropzone
          images={expenseData.receipts}
          expenseID={expenseData.id}
        />
      </div>
    </div>
  );
};

ExpenseCard.propTypes = {
  expenseData: expenseType.isRequired
};

export default ExpenseCard;
