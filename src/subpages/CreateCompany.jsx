// state
import { useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { createCompany } from "../redux/companiesSlice";
// navigate
import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
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
} from "@mui/material";

// --------------------------------------------------------------------------

export default function CreateCompany() {
  // state
  const [name, setName] = useState("");
  const [err, setErr] = useState([]);
  const [created, setCreated] = useState(false);

  // retrieve state from redux store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user.token);
  const errors = useSelector((state) => state.companies.errors)
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log("submit button was clicked")
    const params = { token, name };
    try {
        const resultAction = await dispatch(createCompany(params)).unwrap();
        console.log("resultAction is: ", resultAction);
        if (resultAction.id){
            setErr([]);
            setName("");
            setCreated(true);
        } else {
            setErr(errors);
        }
    }
    catch (err){
        console.warn(err);
    }
  };

  const handleCreateAnotherClick = () => {
    setCreated(false);
  }

  // navigate user to login page if not authenticated
  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <Container component="form" maxWidth="lg" onSubmit={handleSubmit}>
      <Paper sx={{ p: { xs: 2, md: 3, lg: 4 } }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Create New Company
        </Typography>
        {created ? (
                      <>
                      <Typography variant="h5" gutterBottom>
                        The new company was successfully added!
                      </Typography>
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{ mt: 6 }}
                      >
                        <Button
                          to="/companies"
                          component={RouterLink}
                          variant="contained"
                          sx={{ width: { sm: 300, md: 400, lg: 500 } }}
                        >
                          View Companies
                        </Button>
                        <Button
                            onClick={handleCreateAnotherClick}
                          variant="text"
                          sx={{ width: { sm: 300, md: 400, lg: 500 } }}
                        >
                          Create Another Company
                        </Button>
                      </Stack>
                    </>
        ) : (
            <>
            <List sx={{ listStyleType: "disc", pl: 3 }}>
            {err.map((e) => (
              <ListItem
                sx={{
                  color: (theme) => theme.palette["error"].main,
                  display: "list-item",
                  typography: "subtitle2",
                }}
                key={e}
              >
                {e}
              </ListItem>
            ))}
          </List>
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
      </>
        )}

      </Paper>
    </Container>
  );
}
