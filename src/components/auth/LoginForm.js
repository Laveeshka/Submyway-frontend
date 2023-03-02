import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
// @mui
import {
  List,
  ListItem,
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/userSlice";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errs, setErrs] = useState([]);

  // retrieve actions and state
  const dispatch = useDispatch();
  //const errors = useSelector((state) => state.user.loginErrors);
  const errorListItems = errs.map((error) => (
    <ListItem
      sx={{
        color: (theme) => theme.palette["error"].main,
        display: "list-item",
        typography: "subtitle2",
      }}
      key={error}
    >
      {error}
    </ListItem>
  ));

  // navigation
  const navigate = useNavigate();

  const handleLoginClick = async (e) => {
    e.preventDefault();
    console.log("Log in btn on Login page was clicked");

    const credentials = { username, password };
    try {
      const resultAction = await dispatch(loginUser(credentials)).unwrap();
      if (resultAction.message) {
        setErrs([resultAction.message]);
      }

      if (resultAction.user) {
        setUsername("");
        setPassword("");
        setErrs([]);
        navigate("/dashboard");
      }
    } catch (err) {}
  };

  const handlePasswordVisibilityClick = () => {
    console.log("Did someone call for an eye-con?");
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Stack spacing={3}>
        <List sx={{ listStyleType: "disc", pl: 3 }}> {errorListItems}</List>
        <TextField
          name="username"
          label="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibilityClick} edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack spacing={2} justifyContent="center">
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          size="large"
          type="submit"
          onClick={handleLoginClick}
        >
          Log in
        </Button>
        <Link
          component={RouterLink}
          variant="subtitle2"
          underline="hover"
          to="/register"
        >
          Don't have an account? Register here
        </Link>
      </Stack>
    </>
  );
}
