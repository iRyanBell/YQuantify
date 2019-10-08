import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Box, Paper, IconButton, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { MdAdd, MdViewList } from "react-icons/md";
import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "Weight",
    color: "hsl(100, 70%, 50%)",
    data: [
      {
        x: "2019-01-01",
        y: 160
      },
      {
        x: "2019-02-01",
        y: 155
      },
      {
        x: "2019-03-01",
        y: 158
      },
      {
        x: "2019-04-01",
        y: 162
      },
      {
        x: "2019-05-01",
        y: 157
      },
      {
        x: "2019-06-01",
        y: 155
      },
      {
        x: "2019-07-01",
        y: 152
      },
      {
        x: "2019-08-01",
        y: 155
      },
      {
        x: "2019-09-01",
        y: 148
      },
      {
        x: "2019-10-01",
        y: 147
      },
      {
        x: "2019-11-01",
        y: 149
      },
      {
        x: "2019-12-01",
        y: 146
      },
      {
        x: "2020-01-01",
        y: null
      },
      {
        x: "2020-02-01",
        y: null
      },
      {
        x: "2020-03-01",
        y: null
      }
    ]
  },
  {
    id: "prediction",
    color: "hsl(100, 70%, 50%)",
    data: [
      {
        x: "2019-12-01",
        y: 146
      },
      {
        x: "2020-01-01",
        y: 147
      },
      {
        x: "2020-02-01",
        y: 145
      },
      {
        x: "2020-03-01",
        y: 142
      }
    ]
  }
];

const MyResponsiveLine = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 25, right: 25, bottom: 25, left: 45 }}
    xScale={{
      type: "time",
      format: "%Y-%m-%d",
      precision: "day"
    }}
    xFormat="time:%Y-%m-%d"
    yScale={{ type: "linear", stacked: false, min: 142, max: "auto" }}
    curve="basis"
    axisTop={null}
    axisRight={null}
    axisBottom={null}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0
    }}
    colors={{ scheme: "set1" }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
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
            <Box display="flex" flexGrow={1} justifyContent="center">
              <Typography variant="h6" style={{ fontWeight: 800 }}>
                Weight Trend &amp; Prediction
              </Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end" color="#fff">
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
          <Box height={320}>
            <MyResponsiveLine data={data} />
          </Box>
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
