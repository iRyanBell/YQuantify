import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Box, Paper, IconButton, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { MdAdd, MdViewList } from "react-icons/md";
import { ResponsiveLine } from "@nivo/line";

const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{ type: "linear", stacked: true, min: "auto", max: "auto" }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "transportation",
      legendOffset: 36,
      legendPosition: "middle"
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle"
    }}
    colors={{ scheme: "nivo" }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
);

const Main = () => {
  const theme = useTheme();
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
        <Paper>
          <Box display="flex" padding={2} alignItems="center">
            <Typography variant="h6" style={{ fontWeight: 800 }}>
              Dashboard
            </Typography>
            <Box
              display="flex"
              flexGrow={1}
              justifyContent="flex-end"
              color="#fff"
            >
              <IconButton color="inherit">
                <MdViewList color={theme.palette.primary.main} />
              </IconButton>
              <Box marginLeft={1}>
                <IconButton
                  color="inherit"
                  style={{ backgroundColor: theme.palette.primary.main }}
                >
                  <MdAdd color="white" />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <MyResponsiveLine />
        </Paper>
      </Box>
    </Box>
  );
};

export default () => {
  return (
    <Layout>
      <NavBar />
      <Main />
      <Footer />
    </Layout>
  );
};
