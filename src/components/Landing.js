import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  Grid,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const StyledMainBox = styled(Box)(({ theme }) => ({}));

const StyledHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.black.main,
  fontWeight: 300,
  alignItems: "center",
  justifyContent: "center",
  padding: "35px 90px",
}));

const StyledTextContainer = styled(Container)(() => ({
  flex: 0.5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const StyledTextHeader1 = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const StyledTextHeader2 = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray.main,
}));

const StyledTextHeader3 = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray.main,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.white.main,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 50,
  width: 170,
  marginTop: 40,
  fontWeight: 700,
}));

const StyledRegisterButton = styled(Button)(({ theme }) => ({
  color: theme.palette.white.main,
  backgroundColor: theme.palette.skyBlue.main,
  borderRadius: 50,
  width: 170,
  marginTop: 40,
  fontWeight: 700,
}));

const Landing = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <StyledMainBox
      sx={{
        backgroundImage: "url(assets/Background/2-gradient-shapes.png)",
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
      <StyledHeader
        variant="h2"
        component="div"
        sx={{
          display: { xs: "flex", md: "block" },
          fontSize: { xs: 15, md: 20 },
        }}
      >
        COVID PATIENTS' WEB INFO
      </StyledHeader>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: { xs: "auto", lg: 8 },
          textAlign: "center",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <StyledTextContainer
              sx={{
                textAlign: { xs: "center", md: "start" },
                color: {
                  xs: "black",
                  md: "black",
                },
                marginLeft: { xs: "auto", md: 8 },
                marginTop: { xs: "auto", md: 8 },
                marginBottom: 5,
              }}
            >
              <StyledTextHeader2
                variant="h2"
                component="div"
                sx={{ fontSize: { xs: 15, md: 15, lg: 20 } }}
              >
                Lorem Ipsum
              </StyledTextHeader2>
              <StyledTextHeader1
                variant="h1"
                component="div"
                sx={{
                  fontSize: { xs: 35, md: 45, lg: 60 },
                  margin: "10px -5px",
                  fontWeight: 700,
                }}
              >
                COVID PATIENTS' WEB INFO
              </StyledTextHeader1>
              <StyledTextHeader3
                variant="h3"
                component="div"
                sx={{
                  fontSize: { xs: 12, md: 13, lg: 16 },
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </StyledTextHeader3>
            </StyledTextContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <Container
              sx={{
                borderRadius: "16px",
                boxShadow: 3,
                width: { xs: 320, md: 420 },
                height: { xs: 300, md: 300 },
                paddingTop: 5,
                paddingBotom: 5,
                backgroundColor: "#fff",
              }}
            >
              <FormControl
                style={{
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <TextField
                  id="demo-helper-text-misaligned"
                  label="Email address"
                  sx={{
                    width: { xs: 200, md: 350 },
                    fontStyle: "italic",
                  }}
                />
                <br />
                <TextField
                  id="demo-helper-text-misaligned"
                  label="Password"
                  sx={{
                    width: { xs: 200, md: 350 },
                    fontStyle: "italic",
                  }}
                />
                <StyledButton
                  variant="contained"
                  onClick={() => navigate("/home")}
                >
                  Log in
                </StyledButton>
              </FormControl>
            </Container>
            <StyledRegisterButton
              variant="contained"
              onClick={() => setOpen(!open)}
            >
              Register
            </StyledRegisterButton>
          </Grid>
        </Grid>
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(!open)}
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
            width: 400,
            p: 4,
          }}
        >
          <FormControl
            style={{
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <TextField
              id="demo-helper-text-misaligned"
              label="First name"
              sx={{
                width: { xs: 200, md: 350 },
                fontStyle: "italic",
              }}
            />
            <br />
            <TextField
              id="demo-helper-text-misaligned"
              label="Last name"
              sx={{
                width: { xs: 200, md: 350 },
                fontStyle: "italic",
              }}
            />
            <br />
            <TextField
              id="demo-helper-text-misaligned"
              label="Mobile number"
              sx={{
                width: { xs: 200, md: 350 },
                fontStyle: "italic",
              }}
            />
            <br />
            <TextField
              id="demo-helper-text-misaligned"
              label="Email address"
              sx={{
                width: { xs: 200, md: 350 },
                fontStyle: "italic",
              }}
            />
            <br />
            <TextField
              id="demo-helper-text-misaligned"
              label="Password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              sx={{
                width: { xs: 200, md: 350 },
                fontStyle: "italic",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <TextField
              id="demo-helper-text-misaligned"
              label="Confirm password"
              type={values.showConfirmPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              sx={{
                width: { xs: 200, md: 350 },
                fontStyle: "italic",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {values.showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <StyledButton variant="contained">Register</StyledButton>
          </FormControl>
        </Container>
      </Modal>
    </StyledMainBox>
  );
};

export default Landing;
