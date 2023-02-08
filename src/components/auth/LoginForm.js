import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
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

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginClick = () => {
    console.log("Log in btn on Login page was clicked");
  };

  const handlePasswordVisibilityClick = () => {
    console.log("Did someone call for an eye-con?")
    setShowPassword(!showPassword);
  }

  return (
    <>
      <Stack spacing={3}>
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
                <IconButton
                  onClick={handlePasswordVisibilityClick}
                  edge="end"
                >
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
          size="large"
          type="submit"
          onClick={handleLoginClick}
        >
          Log in
        </Button>
        <Link component={RouterLink} variant="subtitle2" underline="hover" to="/register">
            Don't have an account? Register here
        </Link>
      </Stack>
    </>
  );
}
