import { Alert } from "@mui/material";
import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => {
  return message ? <Alert severity="error">{message}</Alert> : null;
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
