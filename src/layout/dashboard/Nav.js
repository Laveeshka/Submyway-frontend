// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CategoryIcon from '@mui/icons-material/Category';
// built-in typechecking
import PropTypes from "prop-types";
// hooks
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
// components
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
import logo from "../../assets/logo/Submyway.svg"

// ----------------------------------------------------------------------

// navConfig

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "subscriptions",
    path: "/subscriptions",
    icon: <SubscriptionsIcon />,
  },
  {
    title: "companies",
    path: "/companies",
    icon: <BusinessCenterIcon />,
  },
  {
    title: "categories",
    path: "/categories",
    icon: <CategoryIcon />,
  }
];

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box component={RouterLink} to="/" sx={{ display: "inline-flex", justifyContent: "center", margin: "auto", width: "100%"}}>
        <Box component="img" src={logo} sx={{  height: 100 }}/>
      </Box>
      <NavSection data={navConfig} />
    </Scrollbar>
  );

  return (
    <Box
        component="nav"
        sx={{
            flexShrink: { lg: 0 },
            width: { lg: NAV_WIDTH }
        }}>
        {isDesktop ? (
            <Drawer
            open
            variant="permanent"
            PaperProps={{
              sx: {
                width: NAV_WIDTH,
                bgcolor: 'background.default',
                borderRightStyle: 'dashed',
              },
            }}
          >
            
            {renderContent}
          </Drawer>
        ) : (
            <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
        )}
    </Box>
  );

}
