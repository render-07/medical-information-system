import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ListOfPatients from "./ListOfPatients";
import { useLocation } from "react-router-dom";
import CovidData from "./CovidData";
import { FcPlus } from "react-icons/fc";
import { readAllPatient } from "../api/patient";
import { createHealthHistory, getAllHealthHistory } from "../api/healthHistory";
import { Label } from "@material-ui/icons";

const covidData = [
  {
    id: 1,
    Header: "625,712,586",
    Description: "total number of cases",
  },
  {
    id: 2,
    Header: "6,558,259",
    Description: "total number of deaths",
  },
  {
    id: 3,
    Header: "605,320,653",
    Description: "total number of recovered",
  },
];

const StyledMainBox = styled(Box)(({ theme }) => ({}));

const StyledText = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.white.main,
  fontWeight: 700,
}));

const StyledViewByCountryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.white.main,
  borderRadius: 50,
  marginTop: 20,
  borderColor: theme.palette.white.main,
  marginBottom: 30,
}));

////

const StyledTopGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledBottomGrid = styled(Grid)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
}));

const drawerWidth = 240;
const navItems = ["HOME", "COVID19-CASES", "PROFILE", "LOGOUT"];

const Cases = (props) => {
  const { window } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  const [addPatient, setAddPatient] = useState(false);
  const [allPatients, setAllPatients] = useState([]);
  const [allHealthHistory, setAllHealthHistory] = useState([]);

  const readAllPatients = async () => {
    // const res = await readAllPatient();
    const { data } = await readAllPatient();
    return data;
  };

  const storeAllPatients = async () => {
    const dataFromServer = await readAllPatients();
    setAllPatients(dataFromServer.patient);
  };

  const readAllHealthHistory = async () => {
    const { data } = await getAllHealthHistory();
    return data;
  };

  const storeAllHealthHistory = async () => {
    const dataFromServer = await readAllHealthHistory();
    setAllHealthHistory(dataFromServer.healthHistories);
  };

  useEffect(() => {
    storeAllPatients();
    storeAllHealthHistory();
  }, []);

  console.log(allPatients);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        COVID PATIENTS' WEB INFO
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} onClick={() => handleClick(item)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleClick = (item) => {
    if (item === "HOME") {
      navigate("/home", {
        state: {
          //   id: location.state.id,
          //   patientId: data.data._id,
          //   email: data.data.email,
        },
      });
    } else if (item === "COVID19-CASES") {
      navigate("/cases");
    } else if (item === "LOGOUT") {
      setLogout(!logout);
    }
    // else if (item === "PROFILE") {
    //   navigate("/profile");
    // }
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const columns = [
    { id: "country", label: "Country", minWidth: 170 },
    { id: "totalCases", label: "Total Cases", minWidth: 100 },
    {
      id: "newCases",
      label: "New Cases",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "totalDeaths",
      label: "Total Deaths",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "totalRecovered",
      label: "Total Recovered",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "newRecovered",
      label: "New Recovered",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "activeCases",
      label: "Active Cases",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  const rows = [
    createData("India", "IN", 1324171354, 3287263),
    createData("China", "CN", 1403500365, 9596961),
    createData("Italy", "IT", 60483973, 301340),
    createData("United States", "US", 327167434, 9833520),
    createData("Canada", "CA", 37602103, 9984670),
    createData("Australia", "AU", 25475400, 7692024),
    createData("Germany", "DE", 83019200, 357578),
    createData("Ireland", "IE", 4857000, 70273),
    createData("Mexico", "MX", 126577691, 1972550),
    createData("Japan", "JP", 126317000, 377973),
    createData("France", "FR", 67022000, 640679),
    createData("United Kingdom", "GB", 67545757, 242495),
    createData("Russia", "RU", 146793744, 17098246),
    createData("Nigeria", "NG", 200962417, 923768),
    createData("Brazil", "BR", 210147125, 8515767),
  ];

  function createData(
    country,
    totalCases,
    newCases,
    totalDeaths,
    totalRecovered,
    newRecovered,
    activeCases
  ) {
    return {
      country,
      totalCases,
      newCases,
      totalDeaths,
      totalRecovered,
      newRecovered,
      activeCases,
    };
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [values, setValues] = useState({
    // patientId: JSON.stringify(location.state.email).substring(
    //   1,
    //   JSON.stringify(location.state.email).length - 1
    // ),
    healthHistory: "",
  });

  const handleChange = (prop) => (event) => {
    event.preventDefault();
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <>
      <AppBar component="nav" sx={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            COVID PATIENTS' WEB INFO
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color:
                    location.pathname === "/home" && item === "HOME"
                      ? "#5998F8"
                      : location.pathname === "/cases" &&
                        item === "COVID19-CASES"
                      ? "#5998F8"
                      : location.pathname === "/profile" && item === "PROFILE"
                      ? "#5998F8"
                      : "#000",
                  fontWeight: 700,
                }}
                onClick={() => handleClick(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <StyledMainBox
        sx={{
          backgroundImage: "url(assets/Background/gradient-bg.png)",
          height: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "fixed",
          top: 0,
          left: 0,
          /* Preserve aspet ratio */
          minHeight: "100%",
          minWidth: "100%",
          overflowX: "hidden",
        }}
      >
        <Grid
          container
          sx={{
            flexDirection: "column",
            alignItems: "center",
            display: "flex",
            marginTop: 30,
          }}
        >
          {!openTable && (
            <>
              <StyledTopGrid>
                <Container
                  sx={{
                    backgroundImage: "url(assets/Images/world-map.png)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    overflowX: "hidden",
                    position: "absolute",
                    /* Preserve aspet ratio */
                    minHeight: "100%",
                    minWidth: "100%",
                  }}
                ></Container>
              </StyledTopGrid>
              <StyledBottomGrid sx={{ marginTop: 20 }}>
                <StyledText sx={{ fontSize: { xs: 20, md: 30, lg: 35 } }}>
                  CORONAVIRUS CASES
                </StyledText>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    spacing={3}
                    sx={{
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {covidData.map((value, index) => (
                      <Grid item key={index} xs={12} sm={4} md={4}>
                        <CovidData
                          header={value.Header}
                          description={value.Description}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </StyledBottomGrid>
            </>
          )}

          {openTable && (
            <>
              <Paper
                sx={{
                  width: { xs: "16rem", md: "30rem", lg: "50rem" },
                  overflow: "hidden",
                  borderRadius: 5,
                  mb: 5,
                  mt: -15,
                }}
              >
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader size="small" aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </>
          )}

          <StyledViewByCountryButton
            variant="outlined"
            sx={{
              width: { xs: 230, lg: 300 },
            }}
            onClick={() => setOpenTable(!openTable)}
          >
            {!openTable ? "View by country" : "Go back"}
          </StyledViewByCountryButton>
        </Grid>
      </StyledMainBox>
    </>
  );
};

export default Cases;
