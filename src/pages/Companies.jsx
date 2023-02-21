// redux
import { useSelector } from "react-redux"
// navigation
import { Navigate, Link as RouterLink } from "react-router-dom";
// @mui
import { Container, Stack, Card, CardHeader, Button, Paper, ListItem, ListItemText, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// components
import { FixedSizeList } from "react-window";

// --------------------------------------------------------------------------

const Row = ({ index, style, data }) => {
    // console.log("data is: ", data)
    return (
        <ListItem 
            style={style} 
            key={index}
            secondaryAction={
                <>
                <IconButton 
                    to={`edit/${data[index].id}`}
                    component={RouterLink}
                    edge="end" 
                    sx={{ mr: 1 }}
                >
                    <EditIcon />
                </IconButton>
                <IconButton 
                    edge="end"
                >
                    <DeleteIcon />
                </IconButton>
                </>
            }
            >
        <ListItemText primary={data[index].name}/>
    </ListItem>
    )};

// --------------------------------------------------------------------------

export default function Companies(){

    //retrieve state from store
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const companies = useSelector((state) => state.companies.companies);

    if (!isLoggedIn) return <Navigate to="/login"/>

    // render the companies in a virtualised list

    return(
        <>
        <Container maxWidth="lg">
            <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ mb: 4 }}>
                <Button to="create" component={RouterLink} variant="contained" startIcon={<AddIcon />}>New Company</Button>
            </Stack>
            <Card sx={{ width: "100%" }}>
                <CardHeader title="Companies" sx={{ textAlign: "start" }}/>
                    <Paper sx={{ width: "100%",height: {xs: 200, md: 300, lg: 400} }}>
                        <FixedSizeList
                            height={400}
                            width="lg"
                            itemData={companies}
                            itemSize={80}
                            itemCount={companies.length}
                        >
                            {Row}
                        </FixedSizeList>
                    </Paper>
            </Card>
        </Container>
        </>
    )
}