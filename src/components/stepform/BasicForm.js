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
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// --------------------------------------------------------------------------

export default function BasicForm({
  setCompany,
  company,
  startDate,
  setStartDate,
  active,
  setActive,
  companies
}) {
 

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Basic details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl
            sx={{
              display: "flex",
              alignSelf: "flex-start",
            }}
          >
            <Autocomplete
              id="company-autocomplete"
              freeSolo
              inputValue={company}
              onInputChange={(event, newInputValue) => {
                setCompany(newInputValue);
                console.log("Company value: ", company);
              }}
              options={companies.map((option) => option.name)}
              renderInput={(params) => <TextField {...params} label="Company" helperText="Choose from existing list companies. Entering a company name outside of the list will create a new company"/>}
            />

            {/* <InputLabel id="company-label">Company</InputLabel>
            <Select
              labelId="company-label"
              id="company-select"
              value={company}
              label="Company"
              onChange={handleCompanyChange}
              sx={{textAlign: "start"}}
            >
              {companies.map((company) => (
                <MenuItem key={company.name} value={company.name}>{company.name}</MenuItem>
              ))}
            </Select> */}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl
              sx={{
                display: "flex",
                alignSelf: "flex-start"
              }}
            >
              <DatePicker
                label="Start date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  console.log("Start date is: ", startDate)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={active}
                    onChange={(event) => {
                      setActive(event.target.checked);
                    }}
                  />
                }
                label="This subscription is active"
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
