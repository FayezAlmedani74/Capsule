import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

const CreateCapsule = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title || !content || !releaseDate) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("releaseDate", releaseDate);

    try {
      const response = await fetch("/api/capsules", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate("/capsules");
      } else {
        const data = await response.json();
        console.log(data);
        throw new Error("Failed to create capsule.");
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
          Create Capsule
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
          onClick={handleCreate}
          sx={{ mt: 2 }}
          fullWidth
        >
          Create Capsule
        </Button>
      </Paper>
    </Box>
  );
};

export default CreateCapsule;
