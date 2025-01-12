import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import ErrorMessage from "../components/ErrorMessage";
import Countdown from "../components/Countdown"; // Import the Countdown component

const PromoCodePage = () => {
  const [promoCode, setPromoCode] = useState("");
  const [capsuleData, setCapsuleData] = useState(null);
  const [error, setError] = useState("");

  const handleFetchData = async () => {
    if (!promoCode) {
      setError("Please enter a promo code.");
      return;
    }

    try {
      const response = await fetch(`/api/capsules/shared/${promoCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCapsuleData(data.data.capsule);
        setError(""); // Clear the error if successful
      } else {
        throw new Error("Invalid promo code or data not found.");
      }
    } catch (err) {
      setError(err.message);
      setCapsuleData(null); // Clear capsule data on error
    }
  };

  const handleRelease = () => {
    // This function is called when the capsule is released
    console.log("Capsule is released!");
    // You can add any action here, such as notifying the user
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f5f5f5", p: 2 }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 2, width: "100%", maxWidth: 600 }}
      >
        <Typography variant="h4" align="center" mb={3}>
          Enter Promo Code
        </Typography>
        <ErrorMessage message={error} />
        <TextField
          label="Promo Code"
          variant="outlined"
          fullWidth
          margin="normal"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchData}
          sx={{ mt: 2 }}
          fullWidth
        >
          Fetch Data
        </Button>

        {capsuleData && (
          <Box mt={3}>
            <Typography variant="h6">Capsule Data:</Typography>
            <Typography>Title: {capsuleData.title}</Typography>
            <Typography>Content: {capsuleData.content}</Typography>
            <Typography>Release Date: {capsuleData.releaseDate}</Typography>

            {/* Show countdown if the capsule is not released yet */}
            {capsuleData.releaseDate && (
              <Countdown
                releaseDate={capsuleData.releaseDate}
                onRelease={handleRelease} // Trigger the release action when countdown is done
              />
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PromoCodePage;
