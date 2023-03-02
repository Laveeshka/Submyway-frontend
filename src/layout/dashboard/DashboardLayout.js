import { useState } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { alpha } from '@mui/material/styles';

// components
import Header from "./Header";
import Nav from './Nav';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 68;
const NAV_WIDTH = 280;

const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

const Main = styled('div')(({ theme}) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    "&::before": {
        position: "absolute",
        content: '""',
        background: "transparent",
        borderRadius: "50%",
        border: `4px solid ${alpha(theme.palette.primary.lighter, 0.7)}`,
        zIndex: -9999,
        width: 200,
        height: 200,
        top: APP_BAR_MOBILE + 24,
        left: -16,
        [theme.breakpoints.up('lg')]:  {
            left: NAV_WIDTH - 32,
            top: APP_BAR_DESKTOP + 24,
            width: 400,
            height: 400
            }
    },
    "&::after": {
        position: "absolute",
        content: '""',
        background: "transparent",
        borderRadius: "50%",
        border: `4px solid ${alpha(theme.palette.tertiary.lighter, 0.4)}`,
        zIndex: -9999,
        width: 150,
        height: 150,
        bottom: 32,
        right: 16,
        [theme.breakpoints.up('lg')]:  {
            bottom: 32,
            right: 32,
            width: 300,
            height: 300
            }
    }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);

    return (
        <StyledRoot>
            <Header onOpenNav={() => setOpen(true)}/>
            <Nav openNav={open} onCloseNav={() => setOpen(false)}/>
            <Main>
                <Outlet />
            </Main>
        </StyledRoot>
    );
}