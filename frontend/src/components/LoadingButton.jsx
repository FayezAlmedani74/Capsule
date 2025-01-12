import { Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

export const LoadingButton = ({ loading, children, ...props }) => (
  <Button disabled={loading} {...props}>
    {loading ? <CircularProgress size={24} /> : children}
  </Button>
);

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
