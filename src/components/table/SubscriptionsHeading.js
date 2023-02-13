// PropTypes
import PropTypes from "prop-types";
// @mui
import { Stack, Typography, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
// components

// ----------------------------------------------------------------------

SubscriptionsHeading.propTypes = {
    addSubscriptionClick: PropTypes.func
};

export default function SubscriptionsHeading({ addSubscriptionClick }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={5}>
        {/* <Typography variant="h4">Subscription</Typography> */}
        <Button variant="contained" startIcon={<AddIcon />} onClick={addSubscriptionClick}>New Subscription</Button>
    </Stack>
  )
  }
