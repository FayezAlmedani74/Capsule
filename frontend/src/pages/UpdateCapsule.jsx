import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

const UpdateCapsule = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const response = await fetch(`/api/capsules/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const capsule = data.data.capsule;
          setTitle(capsule.title);
          setContent(capsule.content);
          setReleaseDate(capsule.releaseDate);
        } else {
          throw new Error("Failed to fetch capsule data.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCapsule();
  }, [id]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("releaseDate", releaseDate);

    try {
      const response = await fetch(`/api/capsules/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate("/capsules");
      } else {
        const data = await response.json();
        console.error("Error response:", data);
        throw new Error(data.message || "Failed to update capsule.");
      }
    } catch (err) {
      setError(err.message);
    }
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
          Update Capsule
        </Typography>
        <ErrorMessage message={error} />
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <TextField
          label="Release Date"
          type="datetime-local"
          variant="outlined"
          fullWidth
          margin="normal"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          sx={{ mt: 2 }}
          fullWidth
        >
          Update Capsule
        </Button>
      </Paper>
    </Box>
  );
};

export default UpdateCapsule;
