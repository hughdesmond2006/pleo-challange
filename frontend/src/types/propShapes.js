import PropTypes from "prop-types";

export const amountType = PropTypes.shape({
  currency: PropTypes.string,
  value: PropTypes.string
});

export const receiptType = PropTypes.shape({
  url: PropTypes.string
});

export const userType = PropTypes.shape({
  first: PropTypes.string,
  last: PropTypes.string,
  email: PropTypes.string
});

export const expenseType = PropTypes.shape({
  id: PropTypes.string,
  amount: amountType,
  date: PropTypes.string,
  merchant: PropTypes.string,
  receipts: PropTypes.arrayOf(receiptType),
  comment: PropTypes.string,
  category: PropTypes.string,
  user: userType,
  index: PropTypes.number
});