// @mui
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// PropTypes
import PropTypes from 'prop-types';

// --------------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    gap: 0,
}));

// --------------------------------------------------------------------------

SummaryCard.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
    sx: PropTypes.object,}

export default function SummaryCard({ icon, title, total, color = 'primary', sx, ...other }) {
    return (
        <Card
            sx={{
                py: 8,
                boxShadow: 0,
                textAlign: 'center',
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,
                ...sx,
            }}
            {...other}
        >
            <StyledIcon
                sx={{
                    color: (theme) => theme.palette[color].dark,
                    backgroundImage: (theme) => `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`
                }}
            >{icon}</StyledIcon>
            <Typography variant="h3">{total}</Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>{title}</Typography>
        </Card>
    )
}