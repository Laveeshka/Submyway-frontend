import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import illustration from '../../assets/illustrations/9.svg'

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme}) => ({
    maxWidth: 'md',
    margin: 'auto',
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(6, 0),
    textAlign: 'center',
}));

// ----------------------------------------------------------------------


export default function NotFoundContainer() {
    return (
        <Container>
            <StyledContent>
                <Typography variant="h3" color="primary" paragraph>
                    Where did you go?
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    You've gone off the beaten path. Go back!
                </Typography>
                <Box 
                    component="img"
                    src={illustration}
                    alt="dashboard-illustration"
                    sx={{ height: { xs: 200, md: 300, lg: 400 }, mx: 'auto', my: { xs: 2 }}}
                />
                <Button to="/" size="large" color="secondary" variant="contained" component={RouterLink}>  
                    Go Home
                </Button>
            </StyledContent>
        </Container>
    )
}
