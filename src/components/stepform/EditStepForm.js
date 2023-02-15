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
import { postSubscription } from "../../redux/subscriptionsSlice";
// date
import parse from "date-fns/parse";
import { format } from "date-fns";
// navigation
import { useNavigate } from "react-router-dom";

// --------------------------------------------------------------------------

const steps = ["Basic details", "Billing details", "Review subscription"];
const cycles = ["weekly", "monthly", "yearly"];

// --------------------------------------------------------------------------

export default function EditStepForm() {
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
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [active, setActive] = useState(true);
  const [price, setPrice] = useState(0);
  const [billing, setBilling] = useState(cycles[0]);
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

  const handleCreateClick = async () => {
    const errs = [];
    setErrors([]);
    console.log("Create button was clicked");
    if (company.length === 0) {
      errs.push("The company cannot be blank");
    }
    if (price <= 0) {
      errs.push("The price cannot be a zero or negative value");
    }
    const startDateInString = format(startDate, "dd MMM yyyy");
    const parsedStartDate = parse(startDateInString, "dd MMM yyyy", startDate);
    const todayInString = format(new Date(), "dd MMM yyyy");
    const parsedToday = parse(todayInString, "dd MMM yyyy", new Date());

    if (parsedStartDate < parsedToday) {
      errs.push("Start date cannot be in the past");
    }
    setErrors(errs);
    //fire the dispatch action here
    if (errors.length === 0) {
      console.log("Okay for POST request");
      const companyObj = companies.find((val) => val.name === company);
      const companyId = companyObj.id;
      const newSub = {
        company_id: companyId,
        start_date: startDate.toISOString(),
        status: active,
        pricing: price,
        frequency: 1,
        billing,
      };
      console.log(newSub);
      const params = { token, newSub };
      try {
        const resultAction = await dispatch(postSubscription(params)).unwrap();
        console.log(resultAction);
        if (resultAction.id) {
          console.log("works");
          setActiveStep((prev) => ++prev);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const handleViewSubscriptionsClick = () => {
    navigate("/subscriptions");
  }

  const handleCreateAnotherClick = () => {
    setActiveStep(0);
    setCompany("");
    setPrice(0);
    setActive(true);
    setBilling(cycles[0]);
    setStartDate(new Date());
  }

  return (
    <Container component="form" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6, lg: 9 }, p: { xs: 2, md: 3, lg: 4 } }}
      >
        <Typography variant="h4" align="center">
          Create New Subscription
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
              Your new subscription was successfully added!
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
              <Button
                onClick={handleCreateAnotherClick}
                variant="text"
                sx={{ width: { sm: 300, md: 400, lg: 500 } }}
              >
                Create Another Subscription
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
                  onClick={handleCreateClick}
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                >
                  Create
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
