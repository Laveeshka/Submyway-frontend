// state
import { useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../redux/categoriesSlice";
// navigate
import { Navigate, Link as RouterLink } from "react-router-dom";
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
  Box
} from "@mui/material";
// color picker
import { HexColorPicker } from "react-colorful";
import { theme } from "../theme/theme";

// --------------------------------------------------------------------------

export default function CreateCategory() {
  // state
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(theme.palette.primary.main);
  const [err, setErr] = useState([]);
  const [created, setCreated] = useState(false);

  // retrieve state from redux store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user.token);
  const errors = useSelector((state) => state.categories.errors);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = { token, title, color };
    try {
        const resultAction = await dispatch(createCategory(params)).unwrap();
        console.log("resultAction is: ", resultAction);
        if (resultAction.id){
            setErr([]);
            setTitle("");
            setColor(theme.palette.primary.main);
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
  };

  // navigate user to login page if not authenticated
  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <Container component="form" maxWidth="lg" onSubmit={handleSubmit}>
      <Paper sx={{ p: { xs: 2, md: 3, lg: 4 } }}>
        <Typography variant="h4" color="primary" align="center" sx={{ mb: 4 }}>
          Create New Category
        </Typography>
        {created ? (
          <>
            <Typography variant="h5" gutterBottom>
              The new category was successfully added!
            </Typography>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ mt: 6 }}
            >
              <Button
                to="/categories"
                component={RouterLink}
                variant="contained"
                color="secondary"
                sx={{ width: { sm: 300, md: 400, lg: 500 } }}
              >
                View Categories
              </Button>
              <Button
                onClick={handleCreateAnotherClick}
                variant="text"
                size="small"
                sx={{ width: { sm: 300, md: 400, lg: 500 } }}
              >
                Create Another Category
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
              alignItems="start"
              spacing={4}
            >
              <TextField
                id="title-controlled"
                label="Title"
                value={title}
                required
                onChange={(event) => setTitle(event.target.value)}
                sx={{ width: "100%" }}
              />
              <Box sx={{width: "100%", textAlign: "start"}}>
              <Typography variant="subtitle1" color={theme.palette.text.main} mb={1}>Pick color of the category</Typography>
              <HexColorPicker style={{width: "auto", marginBottom: 20}} color={color} onChange={setColor} />
              <Stack direction="row" justifyContent="start" alignItems="center" spacing={1}>
                <Box sx={{width: 30, height: 30, backgroundColor: color }}/>
                <Typography variant="body1" color={theme.palette.text.secondary}>Current color is {color}</Typography>
              </Stack>
              </Box>
              <Stack
                sx={{ width: "100%" }}
                direction="row"
                justifyContent="flex-end"
              >
                <Button type="submit" variant="contained" color="secondary">
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
