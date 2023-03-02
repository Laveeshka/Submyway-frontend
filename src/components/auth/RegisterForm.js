import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
// @mui
import {
  Link,
  List,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Button,
  ListItem,
} from "@mui/material";
// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
//redux
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/userSlice";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errs, setErrs] = useState([]);

  //navigation
  const navigate = useNavigate();

  //retrieve state from store
  const dispatch = useDispatch();
  let errors = useSelector((state) => state.user.registerErrors);

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

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    console.log("Register btn on Registration page was clicked");
    const credentials = {
      username: username,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    try {
      const resultAction = await dispatch(registerUser(credentials)).unwrap();
      if(resultAction.errors){
        setErrs(resultAction.errors);
      }
      if (resultAction.user) {
        setUsername("");
        setPassword("");
        setPasswordConfirmation("");
        setErrs([]);
        navigate("/login");
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
      <List sx={{ listStyleType: "disc", pl: 3 }}>{errorListItems}</List>
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
        <TextField
          name="password-confirmation"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
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
          onClick={handleRegisterClick}
        >
          Register
        </Button>
        <Link
          component={RouterLink}
          variant="subtitle2"
          underline="hover"
          to="/login"
        >
          Already have an account? Log in here
        </Link>
      </Stack>
    </>
  );
}
