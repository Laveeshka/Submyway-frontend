// redux
import { useSelector } from "react-redux";
// @mui
import {
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";

// --------------------------------------------------------------------------

export default function BillingForm({ price, setPrice, billing, setBilling, cycles }) {
  //billing dropdown
  //one-liner to inform about frequency
  //price textfield
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Billing details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl
            sx={{
              display: "flex",
              alignSelf: "flex-start",
            }}
          >
            <InputLabel id="billing-label">Billing cycle</InputLabel>
            <Select
              labelId="billing-label"
              id="billing-select"
              value={billing}
              label="billing-cycle"
              onChange={(event) => {
                setBilling(event.target.value);
              }}
              sx={{ textAlign: "start" }}
            >
              {cycles.map((cycle) => (
                <MenuItem key={cycle} value={cycle}>
                  {cycle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            sx={{
              display: "flex",
              alignSelf: "flex-start",
            }}
          >
            <TextField required id="price" label="Price" type="number" value={price} onChange={(event) => {setPrice(event.target.value)}}/>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
