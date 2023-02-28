// state
import { useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { editCategory } from "../redux/categoriesSlice";
import { updateSubsCategory } from "../redux/subscriptionsSlice";
// navigate
import {
  useNavigate,
  Navigate,
  useParams,
  Link as RouterLink,
} from "react-router-dom";
// components
// @mui
import {
  Container,
  Paper,
  Typography,
  Stack,
  Button,
  List,
  ListItem,
  TextField,
  Box,
} from "@mui/material";
import { theme } from "../theme/theme";
// color picker
import { HexColorPicker } from "react-colorful";

// --------------------------------------------------------------------------

export default function EditCategory() {
  // retrieve state from redux store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const categories = useSelector((state) => state.categories.categories);
  let errors = useSelector((state) => state.categories.errors);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  // retrieve the company id from the URL
  const { categoryId } = useParams();

  // find the company with companyId
  const category = categories.find((element) => element.id == categoryId);

  //state
  const [title, setTitle] = useState(category.title);
  const [color, setColor] = useState(category.color || theme.palette.primary.main)
  const [edited, setEdited] = useState(false);
  const [err, setErr] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = { token, title, color, categoryId };
    try {
        const resultAction = await dispatch(editCategory(params)).unwrap();
        console.log("resultAction is: ", resultAction);
        if (resultAction.id){
            dispatch(updateSubsCategory(resultAction));
            setErr([]);
            setEdited(true);
        } else {
            setErr(errors);
        }
    }
    catch (error){
        console.warn(error);
    }
}

  const handleEditAgainClick = () => {
    setEdited(false);
}

// navigate user to login page if not authenticated
if (!isLoggedIn) return <Navigate to="/login"/>;


  return (
    <Container component="form" maxWidth="lg" onSubmit={handleSubmit}>
    <Paper sx={{ p: { xs: 2, md: 3, lg: 4 } }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Edit Category
      </Typography>
      {edited ? (
        <>
          <Typography variant="h5" gutterBottom>
            The category was successfully edited!
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
              sx={{ width: { sm: 300, md: 400, lg: 500 } }}
            >
              View Categories
            </Button>
            <Button
              onClick={handleEditAgainClick}
              variant="text"
              sx={{ width: { sm: 300, md: 400, lg: 500 } }}
            >
              Edit Category Again
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
              <Button type="submit" variant="contained" color="primary">
                Edit
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </Paper>
  </Container>
  );
}
