// PropTypes
import PropTypes from "prop-types";
// @mui
import {
  Stack,
  Button,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// state
import { useState } from "react";

// ----------------------------------------------------------------------

SubscriptionsHeading.propTypes = {
  addSubscriptionClick: PropTypes.func,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// ----------------------------------------------------------------------

export default function SubscriptionsHeading({
  addSubscriptionClick,
  categories = [],
  onCategoriesChange
}) {
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const splitValues = typeof value === "string" ? value.split(",") : value;
    setCategoriesSelected(
      // On autofill we get a stringified value.
      splitValues
    );
    onCategoriesChange(splitValues);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
    >
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={addSubscriptionClick}
      >
        New Subscription
      </Button>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Filter by category</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={categoriesSelected}
          onChange={handleChange}
          input={<OutlinedInput label="Filter by category" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              <Checkbox checked={categoriesSelected.indexOf(cat) > -1} />
              <ListItemText primary={cat} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
