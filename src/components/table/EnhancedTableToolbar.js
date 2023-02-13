// PropTypes
import PropTypes from "prop-types";
import {
    Toolbar,
    Typography,
    Tooltip,
    IconButton,
  } from "@mui/material";
  import DeleteIcon from '@mui/icons-material/Delete';
  import FilterListIcon from '@mui/icons-material/FilterList';
  import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  // ----------------------------------------------------------------------

export default function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
          align="left"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
          align="left"
        >
          Subscriptions
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

