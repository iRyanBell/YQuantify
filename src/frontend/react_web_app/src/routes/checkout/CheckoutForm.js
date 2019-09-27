import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import {
  Paper,
  Box,
  Button,
  InputBase,
  InputAdornment,
  FormLabel,
  Divider
} from "@material-ui/core";
import { MdAccountBox, MdEmail } from "react-icons/md";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  textInput: {
    fontSize: "18px",
    fontFamily: "Roboto"
  }
}));

const CheckoutForm = ({ stripe }) => {
  const classes = useStyles();

  const sendPayment = () => {
    stripe
      .createPaymentMethod("card", { billing_details: { name: "Ryan Bell" } })
      .then(({ paymentMethod }) => {
        console.log("Received Stripe PaymentMethod:", paymentMethod);
      });
  };

  return (
    <Box width={480} padding={1}>
      <Box>
        <Box padding={1}>
          <FormLabel>Payment Details</FormLabel>
        </Box>
        <Paper elevation={4}>
          <Box padding={2}>
            <InputBase
              fullWidth
              placeholder="Name"
              classes={{ root: classes.textInput }}
              startAdornment={
                <InputAdornment position="start">
                  <Box display="flex" justifyContent="flex-end" width={35}>
                    <MdAccountBox size={28} color="#b1b7c7" />
                  </Box>
                </InputAdornment>
              }
            />
            <Box marginY={1}>
              <Divider />
            </Box>
            <InputBase
              fullWidth
              placeholder="Email"
              classes={{ root: classes.textInput }}
              startAdornment={
                <InputAdornment position="start">
                  <Box display="flex" justifyContent="flex-end" width={35}>
                    <MdEmail size={28} color="#b1b7c7" />
                  </Box>
                </InputAdornment>
              }
            />
            <Box marginY={1}>
              <Divider />
            </Box>
            <Box padding={1}>
              <CardElement
                style={{
                  base: {
                    fontSize: "18px",
                    fontFamily: "Roboto",
                    color: "#101012",
                    "::placeholder": {
                      color: "rgba(16, 16, 18, 0.4)"
                    }
                  }
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box marginTop={1} display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={sendPayment}>
          Send Payment
        </Button>
      </Box>
      <Box marginTop={4} textAlign="center">
        Test VISA: 4242-4242-4242-4242
      </Box>
    </Box>
  );
};

export default injectStripe(CheckoutForm);
