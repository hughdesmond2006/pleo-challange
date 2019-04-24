import React from "react";

import "./ExpenseCard.scss";
import CommentInput from "../../Molecules/Input/CommentInput";
import ImageDropzone from "../../Organisms/ImageDropzone/ImageDropzone";
import { expenseType } from "../../../types/propShapes";
import PropTypes from "prop-types";

//function to add highlight class where appropriate
function highlight(highlightedField, fieldName){
  return highlightedField === fieldName || highlightedField === "all"
    ? " highlighted"
    : "";
}

//functional dumb display component
const ExpenseCard = ({ expenseData, highlightedField }) => {
  const prettyAmount = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: expenseData.amount.currency,
    useGrouping: true
  }).format(expenseData.amount.value);

  return (
    <div className={"card"}>
      <div className={"card__header-area"}>
        <div className={"card__date" + highlight(highlightedField, "date")}>
          {new Date(expenseData.date).toLocaleDateString("en-GB")}
        </div>
        <div className={"card__amount" + highlight(highlightedField, "amount")}>{prettyAmount}</div>
      </div>
      <div className={"card__details-area"}>
        <div className={"card__details-wrap"}>
          <div>
            <i className={"material-icons"}>link</i> <p className={"card__id" + highlight(highlightedField, "id")}>{expenseData.id}</p>
          </div>
          <div>
            <i className="material-icons">face</i>
            <p className={"card__user" + highlight(highlightedField, "user")}>
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
            <p className={"card__merchant" + highlight(highlightedField, "merchant")}>{expenseData.merchant}</p>
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
        highlightClass={highlight(highlightedField, "comment")}
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
  expenseData: expenseType.isRequired,
  highlightData: PropTypes.string
};

export default ExpenseCard;
