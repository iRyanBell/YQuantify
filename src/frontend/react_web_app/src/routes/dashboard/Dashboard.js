import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Box, Paper, IconButton, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { MdAdd, MdViewList } from "react-icons/md";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveHeatMap } from "@nivo/heatmap";

const data_heat = [
  {
    feature: "weight",
    sleep: 50,
    exercise: 40,
    calories: 10
  },
  {
    feature: "exercise",
    weight: 60,
    sleep: 50,
    calories: 50
  },
  {
    feature: "sleep",
    weight: 50,
    exercise: 50,
    calories: 40
  },
  {
    feature: "calories",
    weight: 90,
    exercise: 40,
    sleep: 60
  }
];

const data_weight = [
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

const data_calories = [
  {
    id: "Calories",
    color: "hsl(100, 70%, 50%)",
    data: [
      {
        x: "2019-01-01",
        y: 2100
      },
      {
        x: "2019-02-01",
        y: 2080
      },
      {
        x: "2019-03-01",
        y: 2050
      },
      {
        x: "2019-04-01",
        y: 2040
      },
      {
        x: "2019-05-01",
        y: 2050
      },
      {
        x: "2019-06-01",
        y: 2100
      },
      {
        x: "2019-07-01",
        y: 2070
      },
      {
        x: "2019-08-01",
        y: 2050
      },
      {
        x: "2019-09-01",
        y: 1990
      },
      {
        x: "2019-10-01",
        y: 2010
      },
      {
        x: "2019-11-01",
        y: 2020
      },
      {
        x: "2019-12-01",
        y: 2000
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
        y: 2000
      },
      {
        x: "2020-01-01",
        y: 1980
      },
      {
        x: "2020-02-01",
        y: 1950
      },
      {
        x: "2020-03-01",
        y: 1900
      }
    ]
  }
];

const data_exercise = [
  {
    id: "Exercise",
    color: "hsl(100, 70%, 50%)",
    data: [
      {
        x: "2019-01-01",
        y: 30
      },
      {
        x: "2019-02-01",
        y: 30
      },
      {
        x: "2019-03-01",
        y: 0
      },
      {
        x: "2019-04-01",
        y: 0
      },
      {
        x: "2019-05-01",
        y: 35
      },
      {
        x: "2019-06-01",
        y: 40
      },
      {
        x: "2019-07-01",
        y: 0
      },
      {
        x: "2019-08-01",
        y: 0
      },
      {
        x: "2019-09-01",
        y: 60
      },
      {
        x: "2019-10-01",
        y: 45
      },
      {
        x: "2019-11-01",
        y: 0
      },
      {
        x: "2019-12-01",
        y: 0
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
        y: 0
      },
      {
        x: "2020-01-01",
        y: 30
      },
      {
        x: "2020-02-01",
        y: 30
      },
      {
        x: "2020-03-01",
        y: 30
      }
    ]
  }
];

const data_sleep = [
  {
    id: "Sleep",
    color: "hsl(100, 70%, 50%)",
    data: [
      {
        x: "2019-01-01",
        y: 8.0
      },
      {
        x: "2019-02-01",
        y: 7.5
      },
      {
        x: "2019-03-01",
        y: 7.5
      },
      {
        x: "2019-04-01",
        y: 8.0
      },
      {
        x: "2019-05-01",
        y: 7.0
      },
      {
        x: "2019-06-01",
        y: 7.0
      },
      {
        x: "2019-07-01",
        y: 7.5
      },
      {
        x: "2019-08-01",
        y: 7.5
      },
      {
        x: "2019-09-01",
        y: 8.0
      },
      {
        x: "2019-10-01",
        y: 8.0
      },
      {
        x: "2019-11-01",
        y: 7.0
      },
      {
        x: "2019-12-01",
        y: 7.0
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
        y: 7.0
      },
      {
        x: "2020-01-01",
        y: 7.5
      },
      {
        x: "2020-02-01",
        y: 7.5
      },
      {
        x: "2020-03-01",
        y: 8.0
      }
    ]
  }
];

const ChartHeat = ({ data }) => {
  return (
    <ResponsiveHeatMap
      data={data}
      keys={["weight", "exercise", "sleep", "calories"]}
      indexBy="feature"
      margin={{ top: 45, right: 25, bottom: 25, left: 45 }}
      forceSquare={true}
      sizeVariation={0.5}
      axisTop={{
        orient: "top",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: "",
        legendOffset: 36
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0
      }}
      cellShape="circle"
      cellOpacity={1}
      cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
      enableLabels={false}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
      defs={[
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(0, 0, 0, 0.1)",
          rotation: -45,
          lineWidth: 4,
          spacing: 7
        }
      ]}
      fill={[{ id: "lines" }]}
      animate={true}
      motionStiffness={80}
      motionDamping={9}
      hoverTarget="cell"
      cellHoverOthersOpacity={0.25}
    />
  );
};

const ChartLine = ({ data }) => {
  const getMin = dataSet =>
    dataSet
      .filter(_ => _.y !== null)
      .reduce((acc, cur, idx) => (idx > 0 ? Math.min(acc, cur.y) : cur.y), 0);
  const getMinY = () => Math.min(getMin(data[0].data), getMin(data[1].data));

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 25, right: 25, bottom: 25, left: 45 }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        precision: "day"
      }}
      xFormat="time:%Y-%m-%d"
      yScale={{ type: "linear", stacked: false, min: getMinY(), max: "auto" }}
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
};

const Section = ({ Chart, title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box marginTop={2}>
      <Paper>
        <Box display="flex" padding={2} alignItems="center">
          <Box display="flex" flexGrow={1} justifyContent="center">
            <Box flexDirection="column" display="flex" alignItems="center">
              <Typography variant="h6" style={{ fontWeight: 800 }}>
                {title}
              </Typography>
              <Typography>{subtitle}</Typography>
            </Box>
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
        <Box height={320}>{Chart}</Box>
      </Paper>
    </Box>
  );
};

const Main = () => {
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
        <Section
          Chart={<ChartHeat data={data_heat} />}
          title={"Correlation"}
          subtitle={"Impact Quantification"}
        />
        <Section
          Chart={<ChartLine data={data_weight} />}
          title={"Weight"}
          subtitle={"Trend & Prediction"}
        />
        <Section
          Chart={<ChartLine data={data_calories} />}
          title={"Calories"}
          subtitle={"Trend & Prediction"}
        />
        <Section
          Chart={<ChartLine data={data_sleep} />}
          title={"Sleep"}
          subtitle={"Trend & Prediction"}
        />
        <Section
          Chart={<ChartLine data={data_exercise} />}
          title={"Exercise"}
          subtitle={"Trend & Prediction"}
        />
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
