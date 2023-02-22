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
import { patchSubscription } from "../../redux/subscriptionsSlice";
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
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  // states for form inputs
  const [company, setCompany] = useState(subscription.company.name);
  const [startDate, setStartDate] = useState(parseISO(subscription.start_date));
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
            startDate={startDate}
            setStartDate={setStartDate}
            active={active}
            setActive={setActive}
            companies={companies}
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
    // if (errs.length === 0) {
    //   console.log("Okay for PATCH request");
    //   const companyObj = companies.find((val) => val.name === company);
    //   const companyId = companyObj.id;
    //   const sub = {
    //     company_id: companyId,
    //     start_date: startDate.toISOString(),
    //     status: active,
    //     pricing: price,
    //     frequency: 1,
    //     billing,
    //   };
    //   console.log(sub);
    //   const subId = subscription.id;
    //   const params = { token, sub, subId };
    //   try {
    //     const resultAction = await dispatch(patchSubscription(params)).unwrap();
    //     console.log(resultAction);
    //     if (resultAction.id) {
    //       console.log("works");
    //       setActiveStep((prev) => ++prev);
    //     }
    //   } catch (err) {
    //     console.warn(err);
    //   }
    // }
  };

  const handleViewSubscriptionsClick = () => {
    navigate("/subscriptions");
  }

  // const handleCreateAnotherClick = () => {
  //   setActiveStep(0);
  //   setCompany("");
  //   setPrice(0);
  //   setActive(true);
  //   setBilling(cycles[0]);
  //   setStartDate(new Date());
  // }

  return (
    <Container component="form" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6, lg: 9 }, p: { xs: 2, md: 3, lg: 4 } }}
      >
        <Typography variant="h4" align="center">
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
                  sx={{ mt: 3, ml: 1 }}
                >
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  onClick={handleEditClick}
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  onClick={handleNextClick}
                  variant="contained"
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
