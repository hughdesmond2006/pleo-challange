export function addReceipt(expenseID, receiptURL) {
  return {
    type: "ADD_RECEIPT",
    payload: {
      expenseID,
      receiptURL
    }
  };
}

export function removeReceipt(expenseID, receiptURL) {
  return {
    type: "REMOVE_RECEIPT",
    payload: {
      expenseID,
      receiptURL
    }
  };
}

export function updateComment(expenseID, comment) {
  return {
    type: "UPDATE_COMMENT",
    payload: {
      expenseID,
      comment
    }
  };
}

export function initExpenses(expenses) {
  return {
    type: "INIT_EXPENSES",
    payload: expenses
  };
}