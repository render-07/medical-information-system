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
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ListOfPatients from "./ListOfPatients";
import { useLocation } from "react-router-dom";
import { readAllPatient } from "../api/patient";
import { getAllHealthHistory } from "../api/healthHistory";
import Carousel from "react-elastic-carousel";
import CarouselPage from "./CarouselPage";
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";

const virusData = [
  {
    id: 1,
    title: "COVID-19",
    data: [
      {
        id: 1,
        header: "685,679,893",
        description: "total number of cases",
      },
      {
        id: 2,
        header: "6,842,570",
        description: "total number of deaths",
      },
      {
        id: 3,
        header: "658,410,643",
        description: "total number of recovered",
      },
    ],
    asOf: "2023",
    source: "https://www.worldometers.info/coronavirus/",
  },
  {
    id: 2,
    title: "INFLUENZA",
    data: [
      {
        id: 1,
        header: "26,000,000",
        description: "total number of cases",
      },
      {
        id: 2,
        header: "290,000",
        description: "hospitalizations",
      },
      {
        id: 3,
        header: "19,000",
        description: "deaths",
      },
    ],
    asOf: "2022-2023",
    source:
      "https://www.cdc.gov/flu/weekly/index.htm#:~:text=Two%20influenza%2Dassociated%20pediatric%20deaths,and%2019%2C000%20deaths%20from%20flu.",
  },
  {
    id: 3,
    title: "SARS",
    data: [
      {
        id: 1,
        header: "8,098",
        description: "total number of cases",
      },
      {
        id: 2,
        header: "774",
        description: "total number of deaths",
      },
      {
        id: 3,
        header: "0",
        description: "new cases",
      },
    ],
    asOf: "2004",
    source: "https://www.cdc.gov/sars/about/fs-sars.html",
  },

  {
    id: 4,
    title: "MERS",
    data: [
      {
        id: 1,
        header: "2604",
        description: "total number of cases",
      },
      {
        id: 2,
        header: "936",
        description: "total number of deaths",
      },
      {
        id: 3,
        header: "0",
        description: "new cases",
      },
    ],
    asOf: "2012",
    source:
      "https://www.emro.who.int/health-topics/mers-cov/mers-outbreaks.html",
  },
  {
    id: 5,
    title: "H1N1",
    data: [
      {
        id: 1,
        header: "491,382",
        description: "total number of confirmed lab cases",
      },
      {
        id: 2,
        header: "284,000",
        description: "estimated excess deaths",
      },
      {
        id: 3,
        header: "1",
        description: "laboratory-confirmed case as of 11 May 2022",
      },
    ],
    asOf: "2022",
    source:
      "https://www.who.int/emergencies/disease-outbreak-news/item/2022-DON384",
  },
  {
    id: 6,
    title: "H5N1",
    data: [
      {
        id: 1,
        header: "868",
        description: "total number of cases of human infection",
      },
      {
        id: 2,
        header: "457",
        description: "total number of deaths",
      },
      {
        id: 3,
        header: "240",
        description: "new cases as of 6 April 2023",
      },
    ],
    asOf: "2023",
    source:
      "https://www.who.int/docs/default-source/wpro---documents/emergency/surveillance/avian-influenza/ai_20230407.pdf?sfvrsn=22ea0816_26",
  },
  {
    id: 7,
    title: "EBOLA",
    data: [
      {
        id: 1,
        header: "34,356",
        description: "total number of cases",
      },
      {
        id: 2,
        header: "14,823",
        description: "total number of deaths",
      },
      {
        id: 3,
        header: "164",
        description: "cases in Mubende District, Uganda",
      },
    ],
    asOf: "2023",
    source: "https://gh.bmj.com/content/5/3/e001955",
  },
  {
    id: 8,
    title: "ZIKA",
    data: [
      {
        id: 1,
        header: "40,249",
        description: "cases as of 2022",
      },
      {
        id: 2,
        header: "3,268",
        description: "were lab-confirmed (8.1%)",
      },
      {
        id: 3,
        header: "2",
        description: "zika-related death was reported for the year",
      },
    ],
    asOf: "2022",
    source: "https://ais.paho.org/ha_viz/Arbo/Arbo_Bulletin_2022.asp?env=pri",
  },
  {
    id: 9,
    title: "YELLOW FEVER",
    data: [
      {
        id: 1,
        header: " 200,000",
        description: "number of cases yearly",
      },
      {
        id: 2,
        header: "30,000",
        description: "number of deaths yearly",
      },
      {
        id: 3,
        header: "7",
        description: "new cases as of 2022",
      },
    ],
    asOf: "2022",
    source: "https://www.who.int/",
  },
  {
    id: 10,
    title: "CHIKUNGUNYA",
    data: [
      {
        id: 1,
        header: "2,000,000",
        description: "cases since 2005",
      },
      {
        id: 2,
        header: "115,539 ",
        description: "new cases as of 2023",
      },
      {
        id: 3,
        header: "33",
        description: "deaths reported as of 2023",
      },
    ],
    asOf: "2023",
    source:
      "https://reliefweb.int/report/world/epidemiological-alert-chikungunya-increase-region-americas-13-february-2023",
  },
];

const breakPoints = [
  { width: 1, itemToShow: 1 },
  { width: 550, itemToShow: 1 },
  { width: 768, itemToShow: 1 },
  { width: 1200, itemToShow: 1 },
];

const StyledMainBox = styled(Box)(({ theme }) => ({}));

const StyledSearchBox = styled(TextField)(() => ({
  "& fieldset": {
    borderRadius: "25px",
  },
  fontStyle: "italic",
}));

const StyledHeader = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.white.main,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 50,
  width: 100,
  marginTop: 40,
  fontWeight: 700,
}));

const StyledRightGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flex: 0.5,
  alignItems: "center",
  justifyContent: "center",
}));

const StyledIconContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flex: 0.3,
  justifyContent: "center",
  alignItems: "center",
}));

const StyledTextContainer = styled(Container)(({ theme }) => ({
  flex: 0.7,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.darkBlue.main,
  borderRadius: 20,
  color: theme.palette.white.main,
  padding: "1.5rem",
}));

const drawerWidth = 240;
const navItems = ["HOME", "COVID19-CASES", "PROFILE", "LOGOUT"];

const MainPage = (props) => {
  const { window } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [allPatients, setAllPatients] = useState([]);
  const [homeClick, setHomeClick] = useState(true);
  const [casesClick, setCasesClick] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  const [showPatientResult, setShowPatientResult] = useState(true);
  const [searchPatientResult, setSearchPatientResult] = useState([]);
  const [patient, setPatient] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [allHealthHistory, setAllHealthHistory] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchedPatient, setSearchedPatient] = useState({});
  const [searchedPatientHS, setSearchedPatientHS] = useState("");

  const readAllPatients = async () => {
    const { data } = await readAllPatient();
    return data;
  };

  const readAllHealthHistory = async () => {
    const { data } = await getAllHealthHistory();
    return data;
  };

  useEffect(() => {
    const storeAllPatients = async () => {
      const dataFromServer = await readAllPatients();
      setAllPatients(dataFromServer.patients);
    };

    const storeAllHealthHistory = async () => {
      const dataFromServer = await readAllHealthHistory();
      setAllHealthHistory(dataFromServer.healthHistories);
    };

    storeAllPatients().catch(console.error);
    storeAllHealthHistory().catch(console.error);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const fetchData = (value) => {
    const result = allPatients.filter((user) => {
      return (
        user && user.fullName && user.fullName.toLowerCase().includes(value)
      );
    });
    setSearchPatientResult(result);
  };

  const handleSearchPatientChange = (prop) => (event) => {
    event.preventDefault();
    setPatient(event.target.value);
    fetchData(event.target.value);
    setShowPatientResult(true);
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
      // navigate("/home", {
      //   state: {
      //     id: location.state.id,
      //     patientId: data.data._id,
      //     email: data.data.email,
      //   },
      // });
      setHomeClick(true);
      setCasesClick(false);
      setProfileClick(false);
    } else if (item === "COVID19-CASES") {
      setHomeClick(false);
      setCasesClick(true);
      setProfileClick(false);
    } else if (item === "PROFILE") {
      setHomeClick(false);
      setCasesClick(false);
      setProfileClick(true);
    } else if (item === "LOGOUT") {
      setLogout(!logout);
    }
  };

  const searchForPatient = (name) => {
    setOpenSearch(true);
    let arr = [];
    allPatients.map((value, index) => {
      if (value.fullName == name) {
        setSearchedPatient(value);
        let healthHistories = "";
        allHealthHistory.map((item, i) => {
          if (value.email == item.patientId) {
            arr.push(item.physicianInCharge);
            healthHistories += item.healthHistory + ", ";
            setSearchedPatientHS(healthHistories);
          }
        });
      }

      if (arr.includes(location.state.physiciansFullname)) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    });
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                fontSize: 13,
                color: "#5998F8",
              }}
            >
              Welcome {location.state.physiciansFullname}
            </Typography>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          ></Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color:
                    homeClick && item === "HOME"
                      ? "#5998F8"
                      : casesClick && item === "COVID19-CASES"
                      ? "#5998F8"
                      : profileClick && item === "PROFILE"
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

      {homeClick && (
        <StyledMainBox
          sx={{
            backgroundImage:
              "url(assets/Background/2-gradient-shapes-rotated.png)",
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
          <FormControl
            sx={{
              m: 1,
              width: "25ch",
              width: { xs: "14ch", md: "20ch", lg: "25ch" },
              margin: "100px auto 0 auto",
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
            variant="outlined"
          >
            <StyledSearchBox
              label="Search patient"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch", width: "200%" }}
              onChange={handleSearchPatientChange()}
              value={patient}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="end">
                      {/* <SearchIcon /> */}
                      <SearchIcon onClick={() => searchForPatient(patient)} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {showPatientResult && (
              <Container
                sx={{
                  backgroundColor: "#f2f4f5",
                  m: 1,
                  width: "25ch",
                  width: "200%",
                  margin: 0,
                }}
              >
                {searchPatientResult.map((value, index) => (
                  <ListItem
                    key={index}
                    onClick={() => {
                      setPatient(value.fullName);
                      setShowPatientResult(false);
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    {value.fullName}
                  </ListItem>
                ))}
              </Container>
            )}
          </FormControl>
          <Box sx={{ flexGrow: 1, margin: { xs: "0 40px", lg: "0 90px" } }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {allPatients.map((value, index) => (
                <Grid item key={index} xs={12} sm={4} md={3}>
                  <ListOfPatients
                    patientId={value._id}
                    firstName={value.firstName}
                    middleName={value.middleName}
                    lastName={value.lastName}
                    mobileNumber={value.mobileNumber}
                    age={value.age}
                    gender={value.gender}
                    description={value.healthHistory}
                    date={value.registerDate}
                    user="Physician"
                    nameOfPhysician={location.state.physiciansFullname}
                    email={value.email}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </StyledMainBox>
      )}

      {openSearch && authorized && (
        <Modal
          open={openSearch}
          onClose={() => {
            setOpenSearch(!openSearch);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container
            sx={{
              borderRadius: "16px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "30rem", lg: "40rem" },
              height: { xs: "29rem", lg: "26rem" },
              p: 4,
            }}
          >
            <StyledRightGrid item xs={12}>
              <Stack spacing={2}>
                <StyledPaper sx={{ display: { xs: "inline", lg: "flex" } }}>
                  <StyledIconContainer sx={{ fontSize: { xs: 60, lg: 100 } }}>
                    <AiOutlineUser />
                  </StyledIconContainer>
                  <StyledTextContainer
                    sx={{ textAlign: { xs: "center", lg: "left" } }}
                  >
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        marginBottom: 2,
                        fontWeight: 700,
                      }}
                    >
                      Patient's Information
                    </Typography>

                    <Typography sx={{ mb: 1.5 }}>
                      Full name: {searchedPatient.firstName}{" "}
                      {searchedPatient.middleName} {searchedPatient.lastName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      Age: {searchedPatient.age}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      Gender: {searchedPatient.gender}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      Mobile number: {searchedPatient.mobileNumber}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      Health history: {searchedPatientHS}
                    </Typography>
                  </StyledTextContainer>
                </StyledPaper>
              </Stack>
            </StyledRightGrid>
            <br />
          </Container>
        </Modal>
      )}

      {openSearch && !authorized && (
        <Modal
          open={openSearch}
          onClose={() => {
            setOpenSearch(!openSearch);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container
            sx={{
              borderRadius: "16px",
              boxShadow: 3,
              // width: { xs: 320, md: 420 },
              // height: { xs: 300, md: 300 },
              paddingTop: 5,
              paddingBotom: 5,
              backgroundColor: "#fff",
              position: "absolute",
              top: "50%",
              left: "50%",

              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "15rem", lg: "20rem" },
              p: 4,
            }}
          >
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <StyledHeader>No patient's consent</StyledHeader>

              <AiOutlineClose
                style={{
                  fontSize: 25,
                  marginRight: "10px",
                  color: "#707070",
                  marginTop: -2,
                }}
                onClick={() => {
                  setOpenSearch(!openSearch);
                  //setAuthorized(false);
                }}
                cursor="pointer"
              />
            </Stack>
            <br />
            <Typography sx={{ mb: 1.5 }}>
              This patient is assigned to another physician or you don't have
              consent to view this patient.
            </Typography>
          </Container>
        </Modal>
      )}

      {casesClick && (
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
          <Carousel breakPoints={breakPoints}>
            {virusData.map((item, index) => (
              <CarouselPage
                title={item.title}
                data={item.data}
                asOf={item.asOf}
                source={item.source}
              />
            ))}
          </Carousel>
        </StyledMainBox>
      )}

      {profileClick && (
        <StyledMainBox
          sx={{
            backgroundImage:
              "url(assets/Background/2-gradient-shapes-rotated.png)",
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
              flexDirection: {
                xs: "column",
                md: "column",
                lg: "row",
              },
              justifyContent: "flex-start",
              alignItems: "center",
              display: "flex",
              padding: "5rem 3rem 3rem 3rem",
            }}
          >
            <StyledRightGrid item xs={12}>
              <Stack spacing={2}>
                <StyledPaper sx={{ display: { xs: "inline", lg: "flex" } }}>
                  <StyledIconContainer sx={{ fontSize: { xs: 60, lg: 100 } }}>
                    {/* <AiOutlineUser /> */}
                    <Container
                      sx={{
                        height: 300,
                        width: 300,
                        display: { xs: "none", lg: "block" },
                        marginLeft: -3,
                        marginRight: 5,
                      }}
                    >
                      <img
                        src={location.state.image}
                        alt="drive image"
                        style={{ height: "100%" }}
                      />
                    </Container>
                  </StyledIconContainer>
                  <StyledTextContainer
                    sx={{ textAlign: { xs: "center", lg: "left" } }}
                  >
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        marginBottom: 2,
                        fontWeight: 700,
                      }}
                    >
                      Physician's Information
                    </Typography>
                    <Typography variant="h6" component="div">
                      Full name: {location.state.physiciansFullname}
                    </Typography>
                    <Typography variant="h6" component="div">
                      Mobile number: {location.state.mobileNumber}
                    </Typography>
                    <Typography variant="h6" component="div">
                      Email: {location.state.email}
                    </Typography>
                    <Typography variant="h6" component="div">
                      Work address: {location.state.email}
                    </Typography>
                    <Typography variant="h6" component="div">
                      License number: {location.state.licenses}
                    </Typography>
                  </StyledTextContainer>
                </StyledPaper>
              </Stack>
            </StyledRightGrid>
          </Grid>
        </StyledMainBox>
      )}

      {logout && (
        <Modal
          open={logout}
          onClose={() => setLogout(!logout)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container
            sx={{
              borderRadius: "16px",
              boxShadow: 3,
              paddingTop: 5,
              paddingBotom: 5,
              backgroundColor: "#fff",
              position: "absolute",
              top: "50%",
              left: "50%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "16rem", lg: "25rem" },
              p: 4,
            }}
          >
            <StyledHeader gutterBottom>
              Are you sure you want to log out?
            </StyledHeader>
            <Stack direction="row" justifyContent="center" gap={2}>
              <StyledButton
                variant="contained"
                onClick={() => {
                  navigate("/");
                }}
              >
                Yes
              </StyledButton>
              <StyledButton
                variant="contained"
                onClick={() => setLogout(!logout)}
              >
                No
              </StyledButton>
            </Stack>
          </Container>
        </Modal>
      )}
    </>
  );
};

export default MainPage;
