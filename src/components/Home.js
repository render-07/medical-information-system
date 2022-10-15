import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Patients from "./ListOfPatients";
import { useLocation } from "react-router-dom";

const data = [
  {
    patientId: 1,
    Name: "Kyla Finley",
    Description: "Autoimmune myocarditis",
    Date: "Sept 06 2022",
  },
  {
    patientId: 2,
    Name: "Augustus Leblanc",
    Description: "Allergy.",
    Date: "August 31 2022",
  },
  {
    patientId: 3,
    Name: "Mohammed Pugh",
    Description: "Alzheimer's disease.",
    Date: "August 31 2022",
  },
  {
    patientId: 4,
    Name: "Trinity Elliott",
    Description: "Asthma.",
    Date: "August 31 2022",
  },
  {
    patientId: 5,
    Name: "Yazmin Lopez",
    Description: "None.",
    Date: "August 31 2022",
  },
];

const StyledMainBox = styled(Box)(({ theme }) => ({}));

const StyledSearchBox = styled(TextField)(() => ({
  "& fieldset": {
    borderRadius: "25px",
  },
  fontStyle: "italic",
}));

const navItems = ["HOME", "COVID19-CASES", "PROFILE", "LOGOUT"];

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClick = (item) => {
    if (item === "HOME") {
      navigate("/home");
    } else if (item === "COVID19-CASES") {
      navigate("/cases");
    } else if (item === "PROFILE") {
      navigate("/profile");
    } else if (item === "LOGOUT") {
      navigate("/landing");
    }
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

      {location.pathname === "/home" && (
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Box sx={{ flexGrow: 1, margin: { xs: "0 40px", lg: "0 90px" } }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {data.map((value, index) => (
                <Grid item key={index} xs={12} sm={4} md={3}>
                  <Patients
                    patientId={value.patientId}
                    name={value.Name}
                    description={value.Description}
                    date={value.Date}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </StyledMainBox>
      )}
      {location.pathname === "/cases" && (
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
        ></StyledMainBox>
      )}
    </>
  );
};

export default Home;
