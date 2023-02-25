// redux
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../redux/categoriesSlice";
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

export default function Categories(){

     //retrieve state from store
     const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
     let categories = useSelector((state) => state.categories.categories) || [];
     const token = useSelector((state) => state.user.token);
     const dispatch = useDispatch();

     const row = ({ index, style, data }) => {
        console.log("row data is: ", data[index]);
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
                        onClick={(event) => handleDeleteClick(event, data[index].id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                    </>
                }
                >
            <ListItemText primary={data[index].title}/>
        </ListItem>
        )};

        const handleDeleteClick = async (event, id) => {
            const params = { token, id }
            try {
                const resultAction = await dispatch(deleteCategory(params)).unwrap();
                console.log("resultAction is: ", resultAction);
            }
            catch (err){
                console.warn(err);
            }
        }
    
        if (!isLoggedIn) return <Navigate to="/login"/>
    

    return(
        <>
        <Container maxWidth="lg">
            <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ mb: 4 }}>
                <Button to="create" component={RouterLink} variant="contained" startIcon={<AddIcon />}>New Category</Button>
            </Stack>
            <Card sx={{ width: "100%" }}>
                <CardHeader title="Categories" sx={{ textAlign: "start" }}/>
                    <Paper sx={{ width: "100%",height: 500 }}>
                        <FixedSizeList
                            height={500}
                            width="lg"
                            itemData={categories}
                            itemSize={80}
                            itemCount={categories.length}
                        >
                            {row}
                        </FixedSizeList>
                    </Paper>
            </Card>
        </Container>
        </>
    )
}