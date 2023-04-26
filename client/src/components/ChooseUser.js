import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const StyledMainBox = styled(Box)(({ theme }) => ({}));

const StyledHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.black.main,
  fontWeight: 300,
  alignItems: "center",
  justifyContent: "center",
  padding: "35px 90px",
}));

const StyledText = styled(Typography)(({ theme }) => ({
  // color: theme.palette.secondary.main,
  fontWeight: 600,
  fontSize: "15px",
}));

const useStyles = makeStyles({
  button: {
    "&:hover": {
      color: "#6FDDDF",
    },
  },
});

const ChooseUser = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <StyledMainBox
      sx={{
        backgroundImage: "url(assets/Background/bottom-gradient-shape.png)",
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
      <Container
        sx={{
          height: 90,
          width: 90,
          position: "absolute",
          top: 10,
          right: 40,
        }}
      >
        <img
          src="assets/Icons/logo.ico"
          alt="drive image"
          style={{ height: "100%" }}
        />
      </Container>
      <StyledHeader
        variant="h2"
        component="div"
        sx={{
          display: { xs: "flex", md: "block" },
          fontSize: { xs: 15, md: 20 },
        }}
      >
        RTUMIstorage
      </StyledHeader>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          columnGap={4}
        >
          <Button
            sx={{
              height: 400,
              width: 330,
              borderRadius: "16px",
              boxShadow: 3,
              marginBottom: "50px",
              backgroundColor: "#fff",
              display: "block",
              color: "#6e6e6e",
            }}
            onClick={() => {
              navigate("landing", {
                state: {
                  user: "Physician",
                },
              });
            }}
            className={classes.button}
          >
            <img
              src="assets/Vector-Animations/Doctor-pana.png"
              style={{ height: "85%", width: "100%" }}
            />
            <StyledText variant="h6">I am a Medical Practitioner</StyledText>
          </Button>
          <Button
            sx={{
              height: 400,
              width: 330,
              borderRadius: "16px",
              boxShadow: 3,
              marginBottom: "50px",
              backgroundColor: "#fff",
              display: "block",
              color: "#6e6e6e",
            }}
            onClick={() => {
              navigate("landing", {
                state: {
                  user: "Patient",
                },
              });
            }}
            className={classes.button}
          >
            <img
              src="assets/Vector-Animations/Person with medical mask-pana.png"
              style={{ height: "85%", width: "100%" }}
            />
            <StyledText variant="h6">I am a Patient</StyledText>
          </Button>
        </Grid>
      </Box>
    </StyledMainBox>
  );
};

export default ChooseUser;
