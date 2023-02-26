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
  FormHelperText,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import Link from '@mui/material/Link';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// navigation
import { Link as RouterLink } from "react-router-dom";

// --------------------------------------------------------------------------

export default function BasicForm({
  setCompany,
  company,
  category,
  setCategory,
  startDate,
  setStartDate,
  active,
  setActive,
  companies,
  categories,
}) {
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company"
                  helperText="Choose from existing list of companies. Entering a company name outside of the list will create a new company"
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            sx={{
              display: "flex",
              alignSelf: "flex-start",
            }}
          >
            <InputLabel
              id="category-label"
            >
              Category
            </InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
              sx={{ textAlign: "start" }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.title}>
                  {cat.title}
                </MenuItem>
              ))}
              <MenuItem value=""><em>None</em></MenuItem>
            </Select>
            <FormHelperText>Choose from existing list of categories. <Link component={RouterLink} to="/categories/create">Click here to add a new category</Link></FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl
              sx={{
                display: "flex",
                alignSelf: "flex-start",
              }}
            >
              <DatePicker
                label="Next payment date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  console.log("Start date is: ", startDate);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText="This is the next payment date that you will be charged for the subscription"
                  />
                )}
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
