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
import { useNavigate, useLocation } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginPhysician, createPhysician } from "../api/physician";
import { loginPatient, createPatient } from "../api/patient";

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
  const [addPhysician, setAddPhysician] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    workAddress: "",
    licenses: "",
    certificates: "",
    image: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [values1, setValues1] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    age: "",
    gender: "",
    healthHistory: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [addPatient, setAddPatient] = useState(false);

  const location = useLocation();

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowPassword1 = () => {
    setValues1({
      ...values1,
      showPassword: !values1.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleClickShowConfirmPassword1 = () => {
    setValues1({
      ...values1,
      showConfirmPassword: !values1.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword1 = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    event.preventDefault();
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange1 = (prop) => (event) => {
    event.preventDefault();
    setValues1({ ...values1, [prop]: event.target.value });
  };

  const createNewPhysician = () => (event) => {
    event.preventDefault();
    const callCreatePhysician = async () => {
      try {
        if (values.password !== values.confirmPassword) {
          alert("Password does not match.");
          return;
        }
        const { data } = await createPhysician(values);
        if (data.success === true) {
          alert(data.msg);
          window.location.reload();
        } else {
          alert(data.msg);
        }
      } catch (err) {
        console.error(err);
      }
    };
    callCreatePhysician();
  };

  const login = () => (event) => {
    event.preventDefault();
    const callLoginUser = async () => {
      if (location.state.user === "Physician") {
        try {
          const { data } = await loginPhysician(values);
          console.log(data);
          if (data.success === true) {
            // setLocalToken(data.withToken);
            // setLocalUser(data.username);
            alert(data.msg);
            navigate("/physician", {
              state: {
                user: location.state.user,
                email: data.data.email,
                physiciansFullname: data.data.fullName,
                mobileNumber: data.data.mobileNumber,
                email: data.data.email,
                workAddress: data.data.workAddress,
                licenses: data.data.licenses,
                certificates: data.data.certificates,
                image: data.data.image,
              },
            });
          } else {
            alert(data.msg);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          const { data } = await loginPatient(values);
          console.log(data);
          if (data.success === true) {
            // setLocalToken(data.withToken);
            // setLocalUser(data.username);
            alert(data.msg);
            navigate("/patient", {
              state: {
                user: location.state.user,
                userId: data.data._id,
                patientsFullname: data.data.fullName,
                mobileNumber: data.data.mobileNumber,
                email: data.data.email,
                age: data.data.age,
                gender: data.data.gender,
              },
            });
          } else {
            alert(data.msg);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    callLoginUser();
  };

  const createNewPatient = () => (event) => {
    event.preventDefault();
    const callCreatePatient = async () => {
      try {
        if (values1.password !== values1.confirmPassword) {
          alert("Password does not match.");
          return;
        }
        const { data } = await createPatient(values1);
        if (data.success === true) {
          alert(data.msg);
          window.location.reload();
        } else {
          alert(data.msg);
        }
      } catch (err) {
        console.error(err);
      }
    };
    callCreatePatient();
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
              <form onSubmit={login()}>
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
                    value={values.email}
                    onChange={handleChange("email")}
                    required
                  />
                  <br />
                  <TextField
                    id="demo-helper-text-misaligned"
                    label="Password"
                    sx={{
                      width: { xs: 200, md: 350 },
                      fontStyle: "italic",
                    }}
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* <TextField
                    id="demo-helper-text-misaligned"
                    label="Confirm password"
                    type={values.showConfirmPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    required
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
                  /> */}
                  <StyledButton variant="contained" type="submit">
                    Log in
                  </StyledButton>
                </FormControl>
              </form>
            </Container>
            <>
              {location.state.user === "Physician" ? (
                <StyledRegisterButton
                  variant="contained"
                  onClick={() => {
                    setAddPhysician(!addPhysician);
                  }}
                >
                  Register
                </StyledRegisterButton>
              ) : (
                <StyledRegisterButton
                  variant="contained"
                  onClick={() => {
                    setAddPatient(!addPatient);
                  }}
                >
                  Register
                </StyledRegisterButton>
              )}
            </>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={addPhysician}
        onClose={() => setAddPhysician(!addPhysician)}
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
          <form onSubmit={createNewPhysician()}>
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
                onChange={handleChange("firstName")}
                value={values.firstName}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Last name"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handleChange("lastName")}
                value={values.lastName}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Mobile number"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handleChange("mobileNumber")}
                value={values.mobileNumber}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Email address"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handleChange("email")}
                value={values.email}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Work Address"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handleChange("workAddress")}
                value={values.workAddress}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Licenses"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handleChange("licenses")}
                value={values.licenses}
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Certificates"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handleChange("certificates")}
                value={values.certificates}
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Image"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handleChange("image")}
                value={values.image}
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                required
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
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
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
                required
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
              <StyledButton variant="contained" type="submit">
                Register
              </StyledButton>
            </FormControl>
          </form>
        </Container>
      </Modal>
      <Modal
        open={addPatient}
        onClose={() => setAddPatient(!addPatient)}
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
            width: { xs: "15rem", lg: "25rem" },
            p: 4,
          }}
        >
          <form onSubmit={createNewPatient()}>
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
                onChange={handleChange1("firstName")}
                value={values1.firstName}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Middle name"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handleChange1("middleName")}
                value={values1.middleName}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Last name"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handleChange1("lastName")}
                value={values1.lastName}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Mobile number"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handleChange1("mobileNumber")}
                value={values1.mobileNumber}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Email number"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handleChange1("email")}
                value={values1.email}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                type="number"
                label="Age"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handleChange1("age")}
                value={values1.age}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Gender"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handleChange1("gender")}
                value={values1.gender}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Password"
                type={values1.showPassword ? "text" : "password"}
                value={values1.password}
                onChange={handleChange1("password")}
                required
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword1}
                        onMouseDown={handleMouseDownPassword1}
                        edge="end"
                      >
                        {values1.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Confirm password"
                type={values1.showConfirmPassword ? "text" : "password"}
                value={values1.confirmPassword}
                onChange={handleChange1("confirmPassword")}
                required
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword1}
                        onMouseDown={handleClickShowConfirmPassword1}
                        edge="end"
                      >
                        {values1.showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <StyledButton variant="contained" type="submit">
                Register
              </StyledButton>
            </FormControl>
          </form>
        </Container>
      </Modal>
    </StyledMainBox>
  );
};

export default Landing;
