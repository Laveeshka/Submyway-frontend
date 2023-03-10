// @mui
import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Stack,
  ListItem,
  List,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// components
import BasicForm from "./BasicForm";
import BillingForm from "./BillingForm";
import ReviewForm from "./ReviewForm";
// useState
import { useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { patchSubscription, deleteSubCategory, patchSubCategory, postSubCategory } from "../../redux/subscriptionsSlice";
import { findOrCreateCompany } from "../../redux/companiesSlice";
// date
import parseISO from "date-fns/parseISO";
// navigation
import { useNavigate } from "react-router-dom";

// --------------------------------------------------------------------------

const steps = ["Basic details", "Billing details", "Review subscription"];
const cycles = ["weekly", "monthly", "yearly"];

// --------------------------------------------------------------------------

export default function EditStepForm({ subscription }) {
  //navigate obj
  const navigate = useNavigate();
  // retrieve theme
  const theme = useTheme();
  //retrieve state and actions from store
  const companies = useSelector((state) => state.companies.companies);
  const categories = useSelector((state) => state.categories.categories);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const subscription_payments = subscription.subscription_payments;
  const lastPayment = subscription_payments[subscription_payments.length - 1];
  const lastPaymentDate = lastPayment.next_payment_date;
  const subCat = (subscription.categories[0] === undefined) ? "" : subscription.categories[0].title;
  const [activeStep, setActiveStep] = useState(0);
  // states for form inputs
  const [company, setCompany] = useState(subscription.company.name);
  const [category, setCategory] = useState(subCat);
  const [startDate, setStartDate] = useState(parseISO(lastPaymentDate));
  const [active, setActive] = useState(subscription.status);
  const [price, setPrice] = useState(subscription.pricing);
  const [billing, setBilling] = useState(subscription.billing);
  const [errors, setErrors] = useState([]);

  // --------------------------------------------------------------------------

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BasicForm
            setCompany={setCompany}
            company={company}
            category={category}
            setCategory={setCategory}
            startDate={startDate}
            setStartDate={setStartDate}
            active={active}
            setActive={setActive}
            companies={companies}
            categories={categories}
          />
        );
      case 1:
        return (
          <BillingForm
            price={price}
            setPrice={setPrice}
            billing={billing}
            setBilling={setBilling}
            cycles={cycles}
          />
        );
      case 2:
        return (
          <ReviewForm
            company={company}
            category={category}
            startDate={startDate}
            active={active}
            price={price}
            billing={billing}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  // --------------------------------------------------------------------------

  const handleBackClick = () => {
    console.log("Back button was clicked");
    setActiveStep((prev) => --prev);
  };

  const handleNextClick = () => {
    console.log("Next button was clicked");
    setActiveStep((prev) => ++prev);
  };

  const handleEditClick = async () => {
    const errs = [];
    setErrors([]);
    console.log("Edit button was clicked");
    if (company.length === 0) {
      errs.push("The company cannot be blank");
    }
    if (price <= 0) {
      errs.push("The price cannot be a zero or negative value");
    }
    setErrors(errs);
    //fire the dispatch action here
    if (errs.length === 0) {
      console.log("Okay for POST find_or_create_company request");
      try{
        const params = { token, company };
        const resultAction = await dispatch(findOrCreateCompany(params)).unwrap();
        console.log("Result from POST find_or_create_company is: ", resultAction);
        if (resultAction.id){
          console.log("Okay for PATCH request");
          const companyId = resultAction.id;
          const sub = {
            company_id: companyId,
            start_date: startDate.toISOString(),
            status: active,
            pricing: price,
            frequency: 1,
            billing,
          };
          try {
            const subId = subscription.id;
            const subParams = { token, sub, subId };
            const patchResultAction = await dispatch(patchSubscription(subParams)).unwrap();
            console.log("Result from PATCH subscription is: ", patchResultAction);
            if (patchResultAction.id) {
              //new code
              if (category.length > 0){
                if (subscription.categories.length !== 0){
                const cat = categories.find((cat) => cat.title === category);
                const catId = cat.id;
                const subCat = { subscription_id: patchResultAction.id, category_id:  catId}
                const subCatId = subscription.categories[0].id;
                const updateSubCatParams = { token, subCat, subCatId }
                const patchSubCatResult = await dispatch(patchSubCategory(updateSubCatParams)).unwrap();
                console.log("Result from PATCH sub category is: ", patchSubCatResult);
                }
                else {
                  const catId = categories.find((cat) => cat.title === category).id;
                  const newSubCategory = { subscription_id: patchResultAction.id, category_id:  catId}
                  const newSubCatParams = { token, newSubCategory }
                  const postSubCatResult = await dispatch(postSubCategory(newSubCatParams)).unwrap();
                  console.log("Result from POST sub category is: ", postSubCatResult);
                }
                
              } else if (category.length === 0){
                if (subscription.categories.length !== 0){
                  const subCatId = subscription.categories[0].id;
                  const deleteSubCatParams = { token, subId, subCatId };
                  const deleteSubCatResult = await dispatch(deleteSubCategory(deleteSubCatParams)).unwrap();
                }
              }

              console.log("works");
              setActiveStep((prev) => ++prev);
            }
          } catch (err) {
            console.warn(err);
          }
        }
      }
      catch (err){
        console.warn(err);
      }
    }
  };

  const handleViewSubscriptionsClick = () => {
    navigate("/subscriptions");
  }

  return (
    <Container component="form" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6, lg: 9 }, p: { xs: 2, md: 3, lg: 4 } }}
      >
        <Typography variant="h4" align="center" color="primary">
          Edit Subscription
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Your subscription was successfully edited!
            </Typography>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ mt: 6 }}
            >
              <Button
                onClick={handleViewSubscriptionsClick}
                variant="contained"
                color="secondary"
                sx={{ width: { sm: 300, md: 400, lg: 500 } }}
              >
                View Subscriptions
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <List sx={{ listStyleType: "disc", pl: 3 }}>
              {errors.map((err) => (
                <ListItem
                  sx={{
                    color: (theme) => theme.palette["error"].main,
                    display: "list-item",
                    typography: "subtitle2",
                  }}
                  key={err}
                >
                  {err}
                </ListItem>
              ))}
            </List>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button
                  onClick={handleBackClick}
                  variant="text"
                  color="primary"
                  size="small"
                  sx={{ mt: 3, ml: 1 }}
                >
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  onClick={handleEditClick}
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3, ml: 1 }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  onClick={handleNextClick}
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3, ml: 1 }}
                >
                  Next
                </Button>
              )}
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}
