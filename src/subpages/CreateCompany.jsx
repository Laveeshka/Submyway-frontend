// state
import { useState } from "react";
// redux
import { useSelector } from "react-redux";
// navigate
import { Navigate } from "react-router-dom";
// components
// @mui
import {
  Container,
  TextField,
  List,
  ListItem,
  Paper,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";

// --------------------------------------------------------------------------

export default function CreateCompany() {
  // state
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  // retrieve state from redux store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log("submit button was clicked")
  };

  // navigate user to login page if not authenticated
  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <Container component="form" maxWidth="lg" onSubmit={handleSubmit}>
      <Paper sx={{ p: { xs: 2, md: 3, lg: 4 } }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Create New Company
        </Typography>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <TextField
            id="name-controlled"
            label="Name"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
            sx={{ width: "100%" }}
          />
          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}