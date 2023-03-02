import LoginForm from "../components/auth/LoginForm";
// @mui
import { styled } from "@mui/material/styles";
import {
  Container,
  Typography,

} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
//illustration
import loginIllustration from "../assets/illustrations/1.svg"

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 30,
  padding: theme.spacing(0, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const mdUp = useResponsive("up", "md");

  return (
    <StyledRoot>
      {mdUp ? (
        <StyledSection>
          <Typography variant="h4" sx={{ px: 5, my: 2 }}>
            Howdy Human!
          </Typography>
          <img src={loginIllustration} alt="login" />
        </StyledSection>
      ) : null}
      <Container maxWidth="sm">
        <StyledContent>
            <Typography variant="h4" gutterBottom>Log in to Submyway</Typography>
            <LoginForm />
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
