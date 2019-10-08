import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import resourcesLanding from "../../resources/english/landing";
import { FaRegHeart, FaRegStar, FaMedal } from "react-icons/fa";

const useStyles = makeStyles(theme => ({
  whiteButton: {
    color: theme.palette.common.white,
    borderColor: "rgba(255, 255, 255, 0.5)"
  }
}));

const Hero = ({ onDialog }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={480}
      color="#fff"
      style={{
        backgroundImage: "url(landing_banner.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center bottom"
      }}
    >
      <Box
        padding={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box marginBottom={1}>
          <Typography variant="h2" style={{ fontWeight: 700 }}>
            {resourcesLanding.heading}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" style={{ fontWeight: 300 }}>
            {resourcesLanding.subheading}
          </Typography>
        </Box>
        <Box padding={1} width="100%" display="flex" justifyContent="flex-end">
          <Button
            onClick={() => onDialog("signUp")}
            classes={{ root: classes.whiteButton }}
            variant="outlined"
            size="large"
          >
            {resourcesLanding.callToAction}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const Plan = ({
  isRaised,
  width,
  Icon,
  heading,
  subheading,
  description,
  color,
  price,
  disabled,
  onClick
}) => {
  const theme = useTheme();

  return (
    <Box padding={1} style={{ width }}>
      <Box style={{ paddingTop: !isRaised ? `${theme.spacing(2)}px` : 0 }}>
        <Paper style={{ borderTop: `${theme.spacing(1)}px solid ${color}` }}>
          <Box
            padding={2}
            marginTop={isRaised ? 2 : 0}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="h5" style={{ fontWeight: 400 }}>
              {heading}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              style={{ marginTop: "-4px" }}
            >
              {subheading}
            </Typography>
            <Box padding={2}>
              <Icon size={72} />
            </Box>
            <Typography variant="h4">
              <span>{price}</span>
              <span style={{ fontSize: "1rem" }}>/mo</span>
            </Typography>
          </Box>
          <Box minHeight={64} paddingX={2} paddingBottom={2}>
            <Typography color="textSecondary" variant="body2">
              {description}
            </Typography>
          </Box>
          <Box
            paddingRight={1}
            paddingBottom={1}
            display="flex"
            justifyContent="flex-end"
          >
            <Button onClick={onClick} variant="outlined" disabled={disabled}>
              Select
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const Pricing = ({ onDialog }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box>
      <Box padding={1}>
        <Typography variant="h5" style={{ fontWeight: 800 }}>
          {resourcesLanding.packageHeading}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {resourcesLanding.packageSubheading}
        </Typography>
      </Box>
      <Box display="flex" flexDirection={isXs ? "column" : "row"} width="100%">
        <Plan
          price="$0"
          color="#121214"
          heading={"Free"}
          subheading={"Free data logging."}
          description={
            "Plan includes a 14-day free trial of our full feature set."
          }
          Icon={FaRegHeart}
          onClick={() => onDialog("signUp")}
          width={isXs ? "100%" : "calc(100% / 3)"}
        />
        <Plan
          isRaised
          price="$5"
          color="#ff1f88"
          heading={"Basic"}
          subheading={"Detailed predictive modeling."}
          description={
            "Coming soon! We're training new models to bring this feature to the platform by Spring 2020."
          }
          Icon={FaRegStar}
          width={isXs ? "100%" : "calc(100% / 3)"}
          disabled
        />
        <Plan
          price="$8"
          color="#1f55ff"
          heading={"Premium"}
          subheading={"Advanced custom metrics."}
          description={
            "Coming soon! We're training new models to bring this feature to the platform by Spring 2020."
          }
          Icon={FaMedal}
          width={isXs ? "100%" : "calc(100% / 3)"}
          disabled
        />
      </Box>
    </Box>
  );
};

const Main = ({ onDialog }) => {
  return (
    <Box
      marginX="auto"
      width="100%"
      maxWidth={960}
      display="flex"
      flexDirection="column"
      flexGrow={1}
    >
      <Box padding={2}>
        <Pricing onDialog={onDialog} />
      </Box>
    </Box>
  );
};

export default () => {
  return (
    <Layout>
      <NavBar />
      <Hero />
      <Main />
      <Footer />
    </Layout>
  );
};
