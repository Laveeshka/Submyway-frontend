// routing
import { Navigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
// @mui
import { Grid, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// components
import SummaryCard from '../components/dashboard/SummaryCard';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { calculateMonthlyCost } from "../utils/calculateMonthlyCost";
import { calculateYearlyCost } from "../utils/calculateYearlyCost";
// --------------------------------------------------------------------------

export default function Dashboard(){
    // theme
    const theme = useTheme();

    // retrieve actions and state from store
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const user = useSelector((state) => state.user.user);
    const subscriptions = useSelector((state) => state.subscriptions.subscriptions);

    if (!isLoggedIn) return <Navigate to="/login"/>

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Welcome back, {user.username}
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={4}>
                    <SummaryCard icon={<LoyaltyIcon />} title="Total Subscriptions" total={subscriptions.length} color="primary"/>
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                    <SummaryCard icon={<CalendarMonthIcon />} title="Total Monthly Costs" total={`${calculateMonthlyCost(subscriptions)} AUD`} color="warning"/>
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                    <SummaryCard icon={<AttachMoneyIcon />} title="Total Yearly Costs" total={`${calculateYearlyCost(subscriptions)} AUD`} color="error"/>
                </Grid>
            </Grid>
        </Container>
   )
}