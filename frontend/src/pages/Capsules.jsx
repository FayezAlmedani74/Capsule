import { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import CapsuleCard from "../components/CapsuleCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Capsules = () => {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCapsules = async () => {
    try {
      const response = await fetch("/api/capsules", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.ok) {
        const data = await response.json();
        setCapsules(data.data.capsules);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapsules();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/capsules/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCapsules((prev) => prev.filter((capsule) => capsule._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRelease = () => {
    fetchCapsules();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Capsules
      </Typography>
      <Grid container spacing={3}>
        {capsules.length > 0 ? (
          capsules.map((capsule) => (
            <Grid item xs={12} sm={6} md={4} key={capsule._id}>
              <CapsuleCard
                capsule={capsule}
                onDelete={handleDelete}
                onRelease={handleRelease}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" width="100%">
            No capsules available.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Capsules;
