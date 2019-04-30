import React from "react";

import styles from "./ExpenseCard.module.scss";
import CommentInput from "../../Molecules/Input/CommentInput";
import ImageDropzone from "../../Organisms/ImageDropzone/ImageDropzone";
import { expenseType } from "../../../types/propShapes";
import PropTypes from "prop-types";

//function to add highlight class where appropriate
function highlight(highlightedField, fieldName){
  return highlightedField === fieldName || highlightedField === "all"
    ? " " + styles.highlighted
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
    <div className={styles.card}>
      <div className={styles.headerArea}>
        <div className={styles.date + " " + highlight(highlightedField, "date")}>
          {new Date(expenseData.date).toLocaleDateString("en-GB")}
        </div>
        <div className={styles.amount + highlight(highlightedField, "amount")}>{prettyAmount}</div>
      </div>
      <div className={styles.detailsArea}>
        <div className={styles.detailsWrap}>
          <div>
            <i className={"material-icons"}>link</i> <p className={styles.id + highlight(highlightedField, "id")}>{expenseData.id}</p>
          </div>
          <div>
            <i className="material-icons">face</i>
            <p className={styles.user + highlight(highlightedField, "user")}>
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
            <p className={styles.merchant + highlight(highlightedField, "merchant")}>{expenseData.merchant}</p>
          </div>
          <div>
            {expenseData.category && <i className="material-icons">category</i>}
            <p>{expenseData.category}</p>
          </div>
        </div>
      </div>
      <CommentInput
        className={styles.commentArea}
        text={expenseData.comment}
        id={expenseData.id}
        highlighted={highlightedField === "comment" || highlightedField === "all"}
      />
      <div className={styles.receiptsArea}>
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
