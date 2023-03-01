// built-in typechecking
import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// utils
import { bgBlur } from "../../utils/cssStyles";
// navigation
import { useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import { clearOnLogout } from "../../redux/subscriptionsSlice";

// --------------------------------------------------------------------------

const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 68;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
    justifyContent: "flex-end"
  },
 
}));

// --------------------------------------------------------------------------

// typechecking for Header prop
Header.propTypes = {
    onOpenNav: PropTypes.func
};

export default function Header({ onOpenNav }) {
  const navigate = useNavigate();
  let isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const handleLoginButtonClick = (e) => {
    console.log(`${e.target.innerText} was clicked`);
    if (e.target.innerText === "LOG IN"){
      navigate("/login");
    }
    else {
      dispatch(logoutUser());
      dispatch(clearOnLogout());
    }
  }

  return (
    <StyledAppBar>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>
          <Button variant="contained" color="secondary" size="small" onClick={handleLoginButtonClick}>{isLoggedIn ? "Log out" : "Log in"}</Button>
      </StyledToolbar>
    </StyledAppBar>
  );
}
