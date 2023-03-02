import { createTheme } from "@mui/material/styles";
import { alpha } from '@mui/material/styles';

// SETUP COLORS
const GREY = {
    0: '#FFFFFF',
    100: '#f3f3f7',
    200: '#dbdbe6',
    300: '#b7b7cc',
    400: '#a0a0bb',
    500: '#7c7ca2',
    600: '#5d5d83',
    700: '#4c4c6b',
    800: '#3b3b54',
    900: '#333348',
  };
  
  const PRIMARY = {
    lighter: '#e3c2ff',
    light: '#c685ff',
    main: '#a333ff',
    dark: '#8700f5',
    darker: '#7000cc',
    contrastText: '#fff',
  };
  
  const SECONDARY = {
    lighter: '#9efaeb',
    light: '#77f8e2',
    main: '#0ce9c4',
    dark: '#0ac2a3',
    darker: '#078872',
    contrastText: '#44445f',
  };

  const TERTIARY = {
    lighter: '#a977f8',
    light: '#772af4',
    main: '#5809d7',
    dark: '#40079d',
    darker: '#280561',
    contrastText: '#fff',
  };
  
  const INFO = {
    lighter: '#c5fcf2',
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
    darker: '#04297A',
    contrastText: '#fff',
  };
  
  const SUCCESS = {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
    contrastText: GREY[800],
  };
  
  const WARNING = {
    lighter: '#FFF7CD',
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    darker: '#7A4F01',
    contrastText: GREY[800],
  };
  
  const ERROR = {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E',
    contrastText: '#fff',
  };

  
export const theme = createTheme({
    palette: {
        common: { black: '#000', white: '#fff' },
        primary: PRIMARY,
        secondary: SECONDARY,
        tertiary: TERTIARY,
        info: INFO,
        success: SUCCESS,
        warning: WARNING,
        error: ERROR,
        grey: GREY,
        divider: alpha(GREY[500], 0.24),
        text: {
          primary: GREY[800],
          secondary: GREY[600],
          disabled: GREY[500],
        },
        background: {
          paper: GREY[0],
          default: GREY[100],
          neutral: GREY[200],
        },
        action: {
          active: PRIMARY.main,
          hover: alpha(PRIMARY.light, 0.08),
          selected: alpha(PRIMARY.light, 0.16),
          disabled: alpha(PRIMARY.light, 0.8),
          disabledBackground: alpha(GREY[500], 0.24),
          focus: alpha(PRIMARY.light, 0.24),
          hoverOpacity: 0.08,
          disabledOpacity: 0.48,
        },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '4rem',
          }
        }
      }
    }
})