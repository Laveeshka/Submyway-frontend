// state
import { useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { editCompany } from "../redux/companiesSlice";
// navigate
import { useNavigate, Navigate, useParams, Link as RouterLink } from "react-router-dom";
// components
// @mui
import { Container, Paper, Typography, Stack, Button, List, ListItem, TextField } from "@mui/material";

// --------------------------------------------------------------------------

export default function EditCompany(){
    // retrieve state from redux store
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const companies = useSelector((state) => state.companies.companies);
    let errors = useSelector((state) => state.companies.errors);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();

    // navigation
    const navigate = useNavigate();

    // retrieve the company id from the URL
    const { companyId } = useParams();

    // find the company with companyId
    const company = companies.find((element) => element.id == companyId);

    //state
    const [name, setName] = useState(company.name);
    const [edited, setEdited] = useState(false);
    const [err, setErr] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const params = { token, name, companyId };
        try {
            const resultAction = await dispatch(editCompany(params)).unwrap();
            console.log("resultAction is: ", resultAction);
            if (resultAction.id){
                setErr([]);
                setEdited(true);
            } else {
                setErr(errors);
            }
        }
        catch (error){
            console.warn(error);
        }
    }

    const handleEditAgainClick = () => {
        setEdited(false);
    }

    // navigate user to login page if not authenticated
    if (!isLoggedIn) return <Navigate to="/login"/>;

    return (
        <Container component="form" maxWidth="lg" onSubmit={handleSubmit}>
          <Paper sx={{ p: { xs: 2, md: 3, lg: 4 } }}>
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
              Edit Company
            </Typography>
            {edited ? (
                          <>
                          <Typography variant="h5" gutterBottom>
                            The company was successfully edited!
                          </Typography>
                          <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            sx={{ mt: 6 }}
                          >
                            <Button
                              to="/companies"
                              component={RouterLink}
                              variant="contained"
                              sx={{ width: { sm: 300, md: 400, lg: 500 } }}
                            >
                              View Companies
                            </Button>
                            <Button
                                onClick={handleEditAgainClick}
                              variant="text"
                              sx={{ width: { sm: 300, md: 400, lg: 500 } }}
                            >
                              Edit Same Company
                            </Button>
                          </Stack>
                        </>
            ) : (
                <>
                <List sx={{ listStyleType: "disc", pl: 3 }}>
                {err.map((e) => (
                  <ListItem
                    sx={{
                      color: (theme) => theme.palette["error"].main,
                      display: "list-item",
                      typography: "subtitle2",
                    }}
                    key={e}
                  >
                    {e}
                  </ListItem>
                ))}
              </List>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <TextField
              id="edit-name-controlled"
              label="Name"
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
              sx={{ width: "100%" }}
            />
            <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary">
                Edit
              </Button>
            </Stack>
          </Stack>
          </>
            )}
    
          </Paper>
        </Container>
      );
}