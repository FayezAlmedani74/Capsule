import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardMedia,
} from "@mui/material";
import Countdown from "./Countdown";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CapsuleCard = ({ capsule, onDelete, onRelease }) => {
  const navigate = useNavigate();
  const isReleased = new Date(capsule.releaseDate) <= new Date();
  console.log(capsule.image);

  const handleUpdate = () => {
    navigate(`/update-capsule/${capsule._id}`);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{capsule.title}</Typography>
        <Box mt={2}>
          {isReleased ? (
            <>
              <Typography variant="body2">
                Shareable Link: {capsule.shareableLink}
              </Typography>
              <Typography variant="body2">{capsule.content}</Typography>
              {capsule.image && (
                <CardMedia component="img" height="140" alt={capsule.title} />
              )}
            </>
          ) : (
            <Countdown
              releaseDate={capsule.releaseDate}
              onRelease={onRelease}
            />
          )}
        </Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleUpdate}
          sx={{ marginTop: "8px", marginRight: "8px" }}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(capsule._id)}
          sx={{ marginTop: "8px" }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

CapsuleCard.propTypes = {
  capsule: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    image: PropTypes.string,
    shareableLink: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onRelease: PropTypes.func.isRequired,
};

export default CapsuleCard;
