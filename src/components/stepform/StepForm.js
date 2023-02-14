// @mui
import { Container, Paper, Typography, Stepper, Step, StepLabel, Box, Button, Stack } from "@mui/material";
// components
import BasicForm from "./BasicForm";
import BillingForm from "./BillingForm";
import ReviewForm from "./ReviewForm";
// useState
import { useState } from "react";

// --------------------------------------------------------------------------

const steps = ["Basic details", "Billing details", "Review subscription"];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <BasicForm />;
    case 1:
      return <BillingForm />;
    case 2:
      return <ReviewForm />;
    default:
      throw new Error("Unknown step");
  }
};

// --------------------------------------------------------------------------

export default function StepForm() {
    const [activeStep, setActiveStep] = useState(0);

    // --------------------------------------------------------------------------

    const handleBackClick = () => {
        console.log("Back button was clicked");
        setActiveStep((prev) => --prev);
    }

    const handleNextClick = () => {
        console.log("Next button was clicked");
        setActiveStep((prev) => ++prev);
    }

    return (
        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs : 3, md : 6, lg: 9 }, p: { xs: 2, md: 3, lg: 4 } }}>
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
            { activeStep === steps.length ? (
                <>
                    <Typography variant="h5" gutterBottom>
                        Your new subscription was successfully added!
                    </Typography>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 6 }}>
                    <Button variant="contained" sx={{ width: { sm: 300, md: 400, lg: 500 }}}>
                        View Subscriptions
                    </Button>
                    <Button variant="outlined" sx={{ width: { sm: 300, md: 400, lg: 500 }}}>
                        Create Another Subscription
                    </Button>
                    </Stack>
                </>
            ) : (
                <>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {activeStep !== 0 && (
                            <Button onClick={handleBackClick} variant="contained" sx={{ mt: 3, ml: 1 }}>
                                Back
                            </Button>
                        )}
                        <Button onClick={handleNextClick} variant="contained" sx={{ mt: 3, ml: 1 }}>
                            {activeStep === steps.length - 1 ? "Create" : "Next"}
                        </Button>
                    </Box>
                </>
            ) }
        </Paper>
    </Container>
    );


}
