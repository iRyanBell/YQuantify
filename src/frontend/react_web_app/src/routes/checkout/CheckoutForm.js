import React from "react";
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

export default () => {
  const classes = useStyles();

  const sendPayment = () => {
    const stripe = window.Stripe("pk_test_Jk5tUWmPGGO41NMhr5T2cgcJ00VtcrxExE");
    stripe
      .redirectToCheckout({
        items: [{ plan: "basic", quantity: 1 }],
        successUrl: "https://www.yquantify.com/success",
        cancelUrl: "https://www.yquantify.com/canceled"
      })
      .then(result => {
        if (result.error) {
          const displayError = document.getElementById("error-message");
          displayError.textContent = result.error.message;
        }
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
