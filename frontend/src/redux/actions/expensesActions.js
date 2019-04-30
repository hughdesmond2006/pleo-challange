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

export function fetchData() {
  return dispatch => {
    dispatch({
      type: "LOADING",
      payload: true
    });

    //gets all expenses from the api
    return fetch("http://localhost:3000/expenses")
      .then(response => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("failed to receive expense data");
        }

        return response.json();
      })
      .then(data => {
        dispatch({
          type: "INIT_EXPENSES",
          payload: data.expenses
        });

        dispatch({
          type: "LOADING",
          payload: false
        });
      })
      .catch(err =>
        dispatch({
          type: "SHOW_ERROR",
          payload: err
        })
      );
  };
}
