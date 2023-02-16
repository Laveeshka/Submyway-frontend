import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import illustration from '../../assets/illustrations/3.svg'

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


export default function EmptySubscriptionsContainer() {
    return (
        <Container>
            <StyledContent>
                <Typography variant="h3" paragraph>
                    No subscriptions found
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    You don't have any subscriptions recorded yet. Create them to start tracking!
                </Typography>
                <Box 
                    component="img"
                    src={illustration}
                    alt="subscription-illustration"
                    sx={{ height: { xs: 200, md: 300, lg: 400 }, mx: 'auto', my: { xs: 2 }}}
                />
                <Button to="create" size="large" startIcon={<AddIcon />} variant="contained" component={RouterLink}>  
                    Add Subscription
                </Button>
            </StyledContent>
        </Container>
    )
}
