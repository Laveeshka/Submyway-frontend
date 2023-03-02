import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton } from '@mui/material';
import { Box, List, ListItemText } from '@mui/material';


// ----------------------------------------------------------------------

const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavSection.propTypes = {
    data: PropTypes.array,
  };
  
  export default function NavSection({ data = [], ...other }) {
    return (
      <Box {...other}>
        <List disablePadding sx={{ p: 1 }}>
          {data.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
        </List>
      </Box>
    );
  }
  
  // ----------------------------------------------------------------------
  
  NavItem.propTypes = {
    item: PropTypes.object,
  };
  
  function NavItem({ item }) {
    const { title, path, icon, info } = item;
  
    return (
      <StyledNavItem
        component={RouterLink}
        to={path}
        sx={{
          marginBottom: 1.5,
          '&.active': {
            color: 'text.primary',
            bgcolor: 'action.selected',
            fontWeight: 'fontWeightBold',
          },
          "& .MuiTouchRipple-child": {
            backgroundColor: "primary.main",
        }}}
      >
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
  
        <ListItemText disableTypography primary={title} />
  
        {info && info}
      </StyledNavItem>
    );
  }
