const defaultState = {
  expenses: []
};

// breaking the DRY principle here for the sake of readability..
const expensesReducer = (state = defaultState, action) => {
  switch (action.type) {
    // receipt additions or removals will be applied in an immutable way
    case "ADD_RECEIPT": {
      const newExpensesArray = state.expenses.map((expense) => {
        // update the corresponding expense with modified receipts array
        if (expense.id === action.payload.expenseID) {
          return {
            ...expense,  // copy the existing expense data
            receipts: [...expense.receipts, { url: action.payload.receiptURL }]  // append to the receipts array
          }
        }

        // Leave every other expense unchanged
        return expense;
      });

      state = {
        ...state,
        expenses: newExpensesArray
      };
      break;
    }
    case "REMOVE_RECEIPT": {
      const newExpensesArray = state.expenses.map((expense) => {
        // update the corresponding expense with modified receipts array
        if(expense.id === action.payload.expenseID) {
          return {
            ...expense,
            receipts: expense.receipts.filter((receipt) => {
              return receipt.url !== action.payload.receiptURL;
            })
          }
        }

        // Leave every other expense unchanged
        return expense;
      });

      state = {
        ...state,
        expenses: newExpensesArray
      };
      break;
    }
    case "UPDATE_COMMENT":
      const newExpensesArray = state.expenses.map((expense) => {
        // update the corresponding expense with modified comment
        if(expense.id === action.payload.expenseID) {
          return {
            ...expense,
            comment: action.payload.comment
          }
        }

        // Leave every other expense unchanged
        return expense;
      });

      state = {
        ...state,
        expenses: newExpensesArray
      };
      break;
    case "INIT_EXPENSES":
      state = {
        ...state,
        expenses: action.payload
      };
      break;
    default:
      break;
  }

  return state;
};

export default expensesReducer;
