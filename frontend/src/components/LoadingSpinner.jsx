import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
