import React, { useState } from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {
  Box,
  Button,
  Paper,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  useMediaQuery
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { MdAdd, MdViewList } from "react-icons/md";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveHeatMap } from "@nivo/heatmap";

const data_heat = [
  {
    feature: "weight",
    sleep: 50,
    exercise: 40,
    calories: 90,
    weight: -1
  },
  {
    feature: "exercise",
    weight: 60,
    sleep: 50,
    calories: 50,
    exercise: -1
  },
  {
    feature: "sleep",
    weight: 50,
    exercise: 50,
    calories: 40,
    sleep: -1
  },
  {
    feature: "calories",
    weight: 10,
    exercise: 40,
    sleep: 60,
    calories: -1
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
      }
    ]
  }
  // {
  //   id: "prediction",
  //   color: "hsl(100, 70%, 50%)",
  //   data: [
  //     {
  //       x: "2019-12-01",
  //       y: 2000
  //     }
  //   ]
  // }
];

const data_exercise = [
  {
    id: "Exercise",
    color: "hsl(100, 70%, 50%)",
    data: [
      {
        x: "2019-01-01",
        y: 30
      }
    ]
  }
  // {
  //   id: "prediction",
  //   color: "hsl(100, 70%, 50%)",
  //   data: [
  //     {
  //       x: "2019-12-01",
  //       y: 0
  //     }
  //   ]
  // }
];

const data_sleep = [
  {
    id: "Sleep",
    color: "hsl(100, 70%, 50%)",
    data: [
      {
        x: "2019-01-01",
        y: 8.0
      }
    ]
  }
  // {
  //   id: "prediction",
  //   color: "hsl(100, 70%, 50%)",
  //   data: [
  //     {
  //       x: "2019-12-01",
  //       y: 7.0
  //     },
  //   ]
  // }
];

const ChartHeat = ({ data }) => {
  const CustomCell = ({
    value,
    x,
    y,
    width,
    height,
    color,
    opacity,
    borderWidth,
    borderColor,
    textColor
  }) => (
    <g transform={`translate(${x}, ${y})`}>
      <path
        transform={`rotate(${value < 50 ? 180 : 0})`}
        fill={color}
        fillOpacity={value < 0 ? 0 : opacity}
        strokeWidth={borderWidth}
        stroke={borderColor}
        d={`
									M0 -${Math.round(height / 2)}
									L${Math.round(width / 2)} ${Math.round(height / 2)}
									L-${Math.round(width / 2)} ${Math.round(height / 2)}
									L0 -${Math.round(height / 2)}
							`}
      />
      <text
        dominantBaseline="central"
        textAnchor="middle"
        style={{ fill: textColor }}
        dy={value < 50 ? -6 : 6}
      >
        {value}
      </text>
    </g>
  );

  return (
    <ResponsiveHeatMap
      data={data}
      colors="RdBu"
      cellShape={CustomCell}
      keys={["weight", "exercise", "sleep", "calories"]}
      indexBy="feature"
      margin={{ top: 45, right: 25, bottom: 25, left: 65 }}
      forceSquare={true}
      sizeVariation={0.5}
      axisTop={{
        orient: "top",
        tickSize: 4,
        tickPadding: 8,
        tickRotation: -90
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        orient: "left",
        tickSize: 4,
        tickPadding: 8,
        tickRotation: 0
      }}
      labelTextColor="#fff"
      isInteractive={false}
      enableLabels={true}
      animate={false}
    />
  );
};

const ChartLine = ({ data }) => {
  const getMin = dataSet =>
    dataSet
      .filter(_ => _.y !== null)
      .reduce((acc, cur, idx) => (idx > 0 ? Math.min(acc, cur.y) : cur.y), 0);
  const getMinY = () => Math.min(getMin(data[0].data));
  // const getMinY = () => Math.min(getMin(data[0].data), getMin(data[1].data));

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

const Section = ({
  children,
  title,
  subtitle,
  width,
  marginRight,
  marginLeft,
  buttons
}) => {
  return (
    <Box
      marginTop={2}
      width={width}
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
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
            {buttons}
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" height={320}>
          {children}
        </Box>
      </Paper>
    </Box>
  );
};

const Main = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [showCorrelationList, setShowCorrelationList] = useState(false);
  const [showGoalList, setShowGoalList] = useState(false);
  const [showWeightList, setShowWeightList] = useState(false);
  const [showCaloriesList, setShowCaloriesList] = useState(false);
  const [showSleepList, setShowSleepList] = useState(false);
  const [showExerciseList, setShowExerciseList] = useState(false);

  const handleCorrelationListToggle = () => {
    setShowCorrelationList(!showCorrelationList);
  };

  const handleGoalListToggle = () => {
    setShowGoalList(!showGoalList);
  };

  const handleWeightListToggle = () => {
    setShowWeightList(!showWeightList);
  };

  const handleCaloriesListToggle = () => {
    setShowCaloriesList(!showCaloriesList);
  };

  const handleSleepListToggle = () => {
    setShowSleepList(!showSleepList);
  };

  const handleExerciseListToggle = () => {
    setShowExerciseList(!showExerciseList);
  };

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
        <Box display="flex" flexDirection={isSm ? "column" : "row"}>
          <Section
            title={"Correlation Matrix"}
            subtitle={"Impact Quantification"}
            width={isSm ? "100%" : "50%"}
            marginRight={isSm ? 0 : 1}
            buttons={
              <>
                <IconButton
                  color="inherit"
                  onClick={handleCorrelationListToggle}
                >
                  <MdViewList
                    color={
                      showCorrelationList
                        ? theme.palette.primary.main
                        : "#404042"
                    }
                  />
                </IconButton>
              </>
            }
          >
            {showCorrelationList ? (
              <Box
                display="flex"
                flexGrow={1}
                flexDirection="column"
                padding={2}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  flexGrow={1}
                  alignItems="flex-start"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={true}
                        onChange={() => {}}
                        value="1"
                        disabled={true}
                      />
                    }
                    label="Show Weight"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={true}
                        onChange={() => {}}
                        value="1"
                        disabled={true}
                      />
                    }
                    label="Show Calories"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={true}
                        onChange={() => {}}
                        value="1"
                        disabled={true}
                      />
                    }
                    label="Show Sleep"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={true}
                        onChange={() => {}}
                        value="1"
                        disabled={true}
                      />
                    }
                    label="Show Exercise"
                  />
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <Button onClick={() => setShowCorrelationList(false)}>
                    Cancel
                  </Button>
                  <Box marginLeft={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setShowCorrelationList(false)}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <ChartHeat data={data_heat} />
            )}
          </Section>
          <Section
            title={"Goal"}
            subtitle={"Recommendations"}
            width={isSm ? "100%" : "50%"}
            marginLeft={isSm ? 0 : 1}
            buttons={
              <>
                <IconButton color="inherit" onClick={handleGoalListToggle}>
                  <MdViewList
                    color={
                      showGoalList ? theme.palette.primary.main : "#404042"
                    }
                  />
                </IconButton>
              </>
            }
          >
            {showGoalList ? (
              <Box
                display="flex"
                flexGrow={1}
                flexDirection="column"
                padding={2}
              >
                <Box
                  display="flex"
                  flexGrow={1}
                  flexDirection="column"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    flexDirection={isSm ? "column" : "row"}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      marginBottom={isSm ? 1.5 : 0}
                      marginRight={isSm ? 0 : 1.5}
                    >
                      <Typography style={{ marginBottom: 1 }}>
                        I want to
                      </Typography>
                    </Box>
                    <Select
                      value={"decrease"}
                      onChange={() => {}}
                      inputProps={{
                        name: "direction"
                      }}
                      disabled={true}
                    >
                      <MenuItem value={"increase"}>Increase</MenuItem>
                      <MenuItem value={"decrease"}>Decrease</MenuItem>
                    </Select>
                    <Box
                      marginY={isSm ? 1.5 : 0}
                      marginLeft={isSm ? 0 : 1}
                      marginRight={isSm ? 0 : 1.5}
                    >
                      <Typography style={{ marginBottom: 1 }}>my</Typography>
                    </Box>
                    <Select
                      value={"weight"}
                      onChange={() => {}}
                      inputProps={{
                        name: "goal"
                      }}
                      disabled={true}
                    >
                      <MenuItem value={"weight"}>Weight</MenuItem>
                      <MenuItem value={"exercise"}>Exercise</MenuItem>
                      <MenuItem value={"sleep"}>Sleep</MenuItem>
                      <MenuItem value={"calories"}>Calories</MenuItem>
                    </Select>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <Button onClick={() => setShowGoalList(false)}>Cancel</Button>
                  <Box marginLeft={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setShowGoalList(false)}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                display="flex"
                flexGrow={1}
                flexDirection="column"
                padding={2}
              >
                <Box display="flex">
                  <Box marginRight={1}>
                    <Typography>To</Typography>
                  </Box>
                  <Typography style={{ fontWeight: 800 }}>Decrease</Typography>
                  <Box marginX={1}>
                    <Typography>your</Typography>
                  </Box>
                  <Typography style={{ fontWeight: 800 }}>Weight</Typography>
                  <Typography>:</Typography>
                </Box>
                <ul>
                  <li>
                    <Box display="flex">
                      <Typography style={{ fontWeight: 800 }}>
                        Increase
                      </Typography>
                      <Box marginLeft={1}>
                        <Typography>Exercise</Typography>
                      </Box>
                    </Box>
                  </li>
                  <li>
                    <Box display="flex">
                      <Typography style={{ fontWeight: 800 }}>
                        Increase
                      </Typography>
                      <Box marginLeft={1}>
                        <Typography>Sleep</Typography>
                      </Box>
                    </Box>
                  </li>
                  <li>
                    <Box display="flex">
                      <Typography style={{ fontWeight: 800 }}>
                        Decrease
                      </Typography>
                      <Box marginLeft={1}>
                        <Typography>Calories</Typography>
                      </Box>
                    </Box>
                  </li>
                </ul>
              </Box>
            )}
          </Section>
        </Box>
        <Section
          title={"Weight"}
          subtitle={"Trend & Prediction"}
          buttons={
            <>
              <IconButton
                color="inherit"
                style={{
                  backgroundColor: showWeightList
                    ? null
                    : theme.palette.primary.main
                }}
                onClick={handleWeightListToggle}
              >
                <MdAdd
                  color={showWeightList ? theme.palette.primary.main : "white"}
                />
              </IconButton>
            </>
          }
        >
          {showWeightList ? (
            <Box display="flex" flexGrow={1} flexDirection="column" padding={2}>
              <Box display="flex" flexGrow={1}>
                Edit Weight
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={() => setShowWeightList(false)}>Cancel</Button>
                <Box marginLeft={1}>
                  <Button variant="contained" color="primary">
                    Add Entry
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <ChartLine data={data_weight} />
          )}
        </Section>
        <Section
          title={"Calories"}
          subtitle={"Trend & Prediction"}
          buttons={
            <>
              <IconButton
                color="inherit"
                style={{
                  backgroundColor: showCaloriesList
                    ? null
                    : theme.palette.primary.main
                }}
                onClick={handleCaloriesListToggle}
              >
                <MdAdd
                  color={
                    showCaloriesList ? theme.palette.primary.main : "white"
                  }
                />
              </IconButton>
            </>
          }
        >
          {showCaloriesList ? (
            <Box display="flex" flexGrow={1} flexDirection="column" padding={2}>
              <Box display="flex" flexGrow={1}>
                Edit Calories
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={() => setShowCaloriesList(false)}>
                  Cancel
                </Button>
                <Box marginLeft={1}>
                  <Button variant="contained" color="primary">
                    Add Entry
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <ChartLine data={data_calories} />
          )}
        </Section>
        <Section
          title={"Sleep"}
          subtitle={"Trend & Prediction"}
          buttons={
            <>
              <IconButton
                color="inherit"
                style={{
                  backgroundColor: showSleepList
                    ? null
                    : theme.palette.primary.main
                }}
                onClick={handleSleepListToggle}
              >
                <MdAdd
                  color={showSleepList ? theme.palette.primary.main : "white"}
                />
              </IconButton>
            </>
          }
        >
          {showSleepList ? (
            <Box display="flex" flexGrow={1} flexDirection="column" padding={2}>
              <Box display="flex" flexGrow={1}>
                Edit Sleep
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={() => setShowSleepList(false)}>Cancel</Button>
                <Box marginLeft={1}>
                  <Button variant="contained" color="primary">
                    Add Entry
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <ChartLine data={data_sleep} />
          )}
        </Section>
        <Section
          title={"Exercise"}
          subtitle={"Trend & Prediction"}
          buttons={
            <>
              <IconButton
                color="inherit"
                style={{
                  backgroundColor: showExerciseList
                    ? null
                    : theme.palette.primary.main
                }}
                onClick={handleExerciseListToggle}
              >
                <MdAdd
                  color={
                    showExerciseList ? theme.palette.primary.main : "white"
                  }
                />
              </IconButton>
            </>
          }
        >
          {showExerciseList ? (
            <Box display="flex" flexGrow={1} flexDirection="column" padding={2}>
              <Box display="flex" flexGrow={1}>
                Edit Exercise
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={() => setShowExerciseList(false)}>
                  Cancel
                </Button>
                <Box marginLeft={1}>
                  <Button variant="contained" color="primary">
                    Add Entry
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <ChartLine data={data_exercise} />
          )}
        </Section>
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
