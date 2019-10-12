import React, { useState, useEffect } from "react";
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
  Avatar,
  ListItemAvatar,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { MdViewList, MdDelete, MdInfo } from "react-icons/md";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import moment from "moment";

/* TODO: Refactor! */

const useStyles = makeStyles(theme => ({
  list: {
    width: "100%"
  },
  selectPage: {
    paddingRight: theme.spacing(4)
  }
}));

const ChartLine = ({ data }) => {
  const getMinY = dataSet =>
    dataSet
      .filter(_ => _.y !== null)
      .reduce((acc, cur, idx) => (idx > 0 ? Math.min(acc, cur.y) : cur.y), 0);

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 25, right: 25, bottom: 25, left: 45 }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d %H:%M:%S",
        precision: "minute"
      }}
      xFormat="time:%Y-%m-%d %H:%M:%S"
      yScale={{
        type: "linear",
        stacked: false,
        min: getMinY(data[0].data),
        max: "auto"
      }}
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
      isInteractive={false}
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
      marginBottom={2}
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
        <Box display="flex" flexDirection="column">
          {children}
        </Box>
      </Paper>
    </Box>
  );
};

const Main = ({ onDialog }) => {
  /* UI */
  const theme = useTheme();
  const classes = useStyles();

  const [showWeightList, setShowWeightList] = useState(false);
  const [showCaloriesList, setShowCaloriesList] = useState(false);
  const [showSleepList, setShowSleepList] = useState(false);
  const [showExerciseList, setShowExerciseList] = useState(false);

  /* Chart Data */
  const [weightDataTable, setWeightDataTable] = useState([]);
  const [caloriesDataTable, setCaloriesDataTable] = useState([]);
  const [sleepDataTable, setSleepDataTable] = useState([]);
  const [exerciseDataTable, setExerciseDataTable] = useState([]);

  const removeEntry = id =>
    new Promise((resolve, reject) => {
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token")
        }
      };
      const payload = { id };
      axios
        .post("/entry/remove", payload, config)
        .then(({ data }) => resolve(data))
        .catch(reject);
    });

  const handleRemoveWeightData = async id => {
    try {
      const result = await removeEntry(id);
      if (result.error) {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }

    const weightDataTable_clone = weightDataTable.slice(0);
    for (let i = 0; i < weightDataTable.length; i++) {
      if (weightDataTable[i].id === id) {
        weightDataTable_clone.splice(i, 1);
        break;
      }
    }

    setWeightDataTable(weightDataTable_clone);
  };

  const handleRemoveCaloriesData = async id => {
    try {
      const result = await removeEntry(id);
      if (result.error) {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }

    const caloriesDataTable_clone = caloriesDataTable.slice(0);
    for (let i = 0; i < caloriesDataTable.length; i++) {
      if (caloriesDataTable_clone[i].id === id) {
        caloriesDataTable_clone.splice(i, 1);
        break;
      }
    }
    setCaloriesDataTable(caloriesDataTable_clone);
  };

  const handleRemoveSleepData = async id => {
    try {
      const result = await removeEntry(id);
      if (result.error) {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }

    const sleepDataTable_clone = sleepDataTable.slice(0);
    for (let i = 0; i < sleepDataTable.length; i++) {
      if (sleepDataTable_clone[i].id === id) {
        sleepDataTable_clone.splice(i, 1);
        break;
      }
    }
    setSleepDataTable(sleepDataTable_clone);
  };

  const handleRemoveExerciseData = async id => {
    try {
      const result = await removeEntry(id);
      if (result.error) {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }

    const exerciseDataTable_clone = exerciseDataTable.slice(0);
    for (let i = 0; i < exerciseDataTable.length; i++) {
      if (exerciseDataTable_clone[i].id === id) {
        exerciseDataTable_clone.splice(i, 1);
        break;
      }
    }

    setExerciseDataTable(exerciseDataTable_clone);
  };

  useEffect(() => {
    const getWeightSensitivity = () =>
      new Promise((resolve, reject) => {
        const config = {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token")
          }
        };

        axios
          .post("/analysis/weight-sensitivity", {}, config)
          .then(({ data }) => resolve(data))
          .catch(reject);
      });

    getWeightSensitivity
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });

    const getChartData = ({ feature, page = 1, perPage = 1000 }) =>
      new Promise((resolve, reject) => {
        const config = {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token")
          }
        };
        const payload = { feature, page, perPage };
        axios
          .post("/entry/list", payload, config)
          .then(({ data }) => resolve(data))
          .catch(reject);
      });
    getChartData({ feature: "weight" })
      .then(({ results }) => setWeightDataTable(results))
      .catch(console.error);
    getChartData({ feature: "calories" })
      .then(({ results }) => setCaloriesDataTable(results))
      .catch(console.error);
    getChartData({ feature: "sleep" })
      .then(({ results }) => setSleepDataTable(results))
      .catch(console.error);
    getChartData({ feature: "exercise" })
      .then(({ results }) => setExerciseDataTable(results))
      .catch(console.error);
  }, []);

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
        <Section
          title={"Weight"}
          subtitle={"History"}
          buttons={
            <>
              <IconButton
                color="inherit"
                style={{
                  backgroundColor: showWeightList
                    ? theme.palette.primary.main
                    : null
                }}
                onClick={handleWeightListToggle}
              >
                <MdViewList
                  color={showWeightList ? "white" : theme.palette.primary.main}
                />
              </IconButton>
            </>
          }
        >
          {showWeightList ? (
            <Box
              display="flex"
              flexGrow={1}
              flexDirection="column"
              padding={2}
              minHeight={320}
            >
              <Box
                display="flex"
                flexGrow={1}
                alignItems="center"
                flexDirection="column"
              >
                <Box width="100%" paddingLeft={1}>
                  <Typography variant="caption" color="textSecondary">
                    HISTORY
                  </Typography>
                </Box>
                <List classes={{ root: classes.list }}>
                  {weightDataTable.map((row, idx) => {
                    return (
                      <ListItem
                        key={row.id}
                        dense
                        divider={idx < weightDataTable.length - 1}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <MdInfo />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={row.value}
                          secondary={moment(row.timestamp).format("LLLL")}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveWeightData(row.id)}
                          >
                            <MdDelete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
              <Box display="flex" alignItems="flex-end" width="100%">
                <Box>
                  <Select
                    value={1}
                    onChange={() => {}}
                    inputProps={{
                      name: "page"
                    }}
                    variant="outlined"
                    classes={{ root: classes.selectPage }}
                  >
                    <MenuItem value={1}>Page: 1/1</MenuItem>
                  </Select>
                </Box>
                <Box
                  flexGrow={1}
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                >
                  <Button onClick={() => setShowWeightList(false)}>Back</Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              height={weightDataTable.length ? 320 : 96}
              padding={2}
            >
              {weightDataTable.length ? (
                <ChartLine
                  data={[
                    {
                      id: "weight",
                      data: weightDataTable.map(row => {
                        return {
                          x: moment(row.created_at).format(
                            "YYYY-MM-DD HH:mm:ss"
                          ),
                          y: row.value
                        };
                      })
                    }
                  ]}
                />
              ) : (
                <Box
                  flexGrow={1}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography color="textSecondary">
                    No entries found with weight data.
                  </Typography>
                  <Box
                    flexGrow={1}
                    width="100%"
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="flex-end"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onDialog("newEntry")}
                    >
                      Add Entry
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Section>
        <Section
          title={"Calories"}
          subtitle={"History"}
          buttons={
            <>
              <IconButton
                color="inherit"
                style={{
                  backgroundColor: showCaloriesList
                    ? theme.palette.primary.main
                    : null
                }}
                onClick={handleCaloriesListToggle}
              >
                <MdViewList
                  color={
                    showCaloriesList ? "white" : theme.palette.primary.main
                  }
                />
              </IconButton>
            </>
          }
        >
          {showCaloriesList ? (
            <Box
              display="flex"
              flexGrow={1}
              flexDirection="column"
              padding={2}
              minHeight={320}
            >
              <Box
                display="flex"
                flexGrow={1}
                alignItems="center"
                flexDirection="column"
              >
                <Box width="100%" paddingLeft={1}>
                  <Typography variant="caption" color="textSecondary">
                    HISTORY
                  </Typography>
                </Box>
                <List classes={{ root: classes.list }}>
                  {caloriesDataTable.map((row, idx) => {
                    return (
                      <ListItem
                        key={row.id}
                        dense
                        divider={idx < caloriesDataTable.length - 1}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <MdInfo />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={row.value}
                          secondary={moment(row.timestamp).format("LLLL")}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveCaloriesData(row.id)}
                          >
                            <MdDelete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
              <Box display="flex" alignItems="flex-end" width="100%">
                <Box>
                  <Select
                    value={1}
                    onChange={() => {}}
                    inputProps={{
                      name: "page"
                    }}
                    variant="outlined"
                    classes={{ root: classes.selectPage }}
                  >
                    <MenuItem value={1}>Page: 1/1</MenuItem>
                  </Select>
                </Box>
                <Box
                  flexGrow={1}
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                >
                  <Button onClick={() => setShowCaloriesList(false)}>
                    Back
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              height={caloriesDataTable.length ? 320 : 96}
              padding={2}
            >
              {caloriesDataTable.length ? (
                <ChartLine
                  data={[
                    {
                      id: "calories",
                      data: caloriesDataTable.map(row => {
                        return {
                          x: moment(row.created_at).format(
                            "YYYY-MM-DD HH:mm:ss"
                          ),
                          y: row.value
                        };
                      })
                    }
                  ]}
                />
              ) : (
                <Box
                  flexGrow={1}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography color="textSecondary">
                    No entries found with calorie data.
                  </Typography>
                  <Box
                    flexGrow={1}
                    width="100%"
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="flex-end"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onDialog("newEntry")}
                    >
                      Add Entry
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Section>
        <Section
          title={"Sleep"}
          subtitle={"History"}
          buttons={
            <>
              <IconButton
                color="inherit"
                style={{
                  backgroundColor: showSleepList
                    ? theme.palette.primary.main
                    : null
                }}
                onClick={handleSleepListToggle}
              >
                <MdViewList
                  color={showSleepList ? "white" : theme.palette.primary.main}
                />
              </IconButton>
            </>
          }
        >
          {showSleepList ? (
            <Box
              display="flex"
              flexGrow={1}
              flexDirection="column"
              padding={2}
              minHeight={320}
            >
              <Box
                display="flex"
                flexGrow={1}
                alignItems="center"
                flexDirection="column"
              >
                <Box width="100%" paddingLeft={1}>
                  <Typography variant="caption" color="textSecondary">
                    HISTORY
                  </Typography>
                </Box>
                <List classes={{ root: classes.list }}>
                  {sleepDataTable.map((row, idx) => {
                    return (
                      <ListItem
                        key={row.id}
                        dense
                        divider={idx < sleepDataTable.length - 1}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <MdInfo />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={row.value}
                          secondary={moment(row.timestamp).format("LLLL")}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveSleepData(row.id)}
                          >
                            <MdDelete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
              <Box display="flex" alignItems="flex-end" width="100%">
                <Box>
                  <Select
                    value={1}
                    onChange={() => {}}
                    inputProps={{
                      name: "page"
                    }}
                    variant="outlined"
                    classes={{ root: classes.selectPage }}
                  >
                    <MenuItem value={1}>Page: 1/1</MenuItem>
                  </Select>
                </Box>
                <Box
                  flexGrow={1}
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                >
                  <Button onClick={() => setShowSleepList(false)}>Back</Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              height={sleepDataTable.length ? 320 : 96}
              padding={2}
            >
              {sleepDataTable.length ? (
                <ChartLine
                  data={[
                    {
                      id: "sleep",
                      data: sleepDataTable.map(row => {
                        return {
                          x: moment(row.created_at).format(
                            "YYYY-MM-DD HH:mm:ss"
                          ),
                          y: row.value
                        };
                      })
                    }
                  ]}
                />
              ) : (
                <Box
                  flexGrow={1}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography color="textSecondary">
                    No entries found with sleep data.
                  </Typography>
                  <Box
                    flexGrow={1}
                    width="100%"
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="flex-end"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onDialog("newEntry")}
                    >
                      Add Entry
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Section>
        <Section
          title={"Exercise"}
          subtitle={"History"}
          buttons={
            <>
              <IconButton
                color="inherit"
                style={{
                  backgroundColor: showExerciseList
                    ? theme.palette.primary.main
                    : null
                }}
                onClick={handleExerciseListToggle}
              >
                <MdViewList
                  color={
                    showExerciseList ? "white" : theme.palette.primary.main
                  }
                />
              </IconButton>
            </>
          }
        >
          {showExerciseList ? (
            <Box
              display="flex"
              flexGrow={1}
              flexDirection="column"
              padding={2}
              minHeight={320}
            >
              <Box
                display="flex"
                flexGrow={1}
                alignItems="center"
                flexDirection="column"
              >
                <Box width="100%" paddingLeft={1}>
                  <Typography variant="caption" color="textSecondary">
                    HISTORY
                  </Typography>
                </Box>
                <List classes={{ root: classes.list }}>
                  {exerciseDataTable.map((row, idx) => {
                    return (
                      <ListItem
                        key={row.id}
                        dense
                        divider={idx < exerciseDataTable.length - 1}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <MdInfo />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={row.value}
                          secondary={moment(row.timestamp).format("LLLL")}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveExerciseData(row.id)}
                          >
                            <MdDelete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
              <Box display="flex" alignItems="flex-end" width="100%">
                <Box>
                  <Select
                    value={1}
                    onChange={() => {}}
                    inputProps={{
                      name: "page"
                    }}
                    variant="outlined"
                    classes={{ root: classes.selectPage }}
                  >
                    <MenuItem value={1}>Page: 1/1</MenuItem>
                  </Select>
                </Box>
                <Box
                  flexGrow={1}
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                >
                  <Button onClick={() => setShowExerciseList(false)}>
                    Back
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              height={exerciseDataTable.length ? 320 : 96}
              padding={2}
            >
              {exerciseDataTable.length ? (
                <ChartLine
                  data={[
                    {
                      id: "exercise",
                      data: exerciseDataTable.map(row => {
                        return {
                          x: moment(row.created_at).format(
                            "YYYY-MM-DD HH:mm:ss"
                          ),
                          y: row.value
                        };
                      })
                    }
                  ]}
                />
              ) : (
                <Box
                  flexGrow={1}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography color="textSecondary">
                    No entries found with exercise data.
                  </Typography>
                  <Box
                    flexGrow={1}
                    width="100%"
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="flex-end"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onDialog("newEntry")}
                    >
                      Add Entry
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
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
