import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

const Countdown = ({ releaseDate, onRelease }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(releaseDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
        onRelease();
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [releaseDate, onRelease]);

  if (!timeLeft) {
    return <Typography variant="h6">Released!</Typography>;
  }

  return (
    <Box>
      <Typography variant="body1">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
        {timeLeft.seconds}s
      </Typography>
    </Box>
  );
};

Countdown.propTypes = {
  releaseDate: PropTypes.string.isRequired,
  onRelease: PropTypes.func.isRequired,
};

export default Countdown;
