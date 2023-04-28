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
import { goToResetPassword } from "../api/resetPassword";
import { AiOutlineArrowLeft } from "react-icons/ai";

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
  const [valPhysician, setValPhysician] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    workAddress: "",
    licenses: "",
    image: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [valPatient, setValPatient] = useState({
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
  const [credsLogin, setCredsLogin] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [addPatient, setAddPatient] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgetPassVal, setForgotPasswordVal] = useState({
    email: "",
  });

  const location = useLocation();

  const handleLoginChange = (prop) => (event) => {
    event.preventDefault();
    setCredsLogin({ ...credsLogin, [prop]: event.target.value });
  };

  const handleLoginClickShowPassword = () => {
    setCredsLogin({
      ...credsLogin,
      showPassword: !credsLogin.showPassword,
    });
  };

  const handleLoginMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePhysicianChange = (prop) => (event) => {
    event.preventDefault();
    setValPhysician({ ...valPhysician, [prop]: event.target.value });
  };

  const handlePhysicianClickShowPassword = () => {
    setValPhysician({
      ...valPhysician,
      showPassword: !valPhysician.showPassword,
    });
  };

  const handlePhysicianClickShowConfirmPassword = () => {
    setValPhysician({
      ...valPhysician,
      showConfirmPassword: !valPhysician.showConfirmPassword,
    });
  };

  const handlePhysicianMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePhysicianMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handlePatientChange = (prop) => (event) => {
    event.preventDefault();
    setValPatient({ ...valPatient, [prop]: event.target.value });
  };

  const handlePatientClickShowPassword = () => {
    setValPatient({
      ...valPatient,
      showPassword: !valPatient.showPassword,
    });
  };

  const handlePatientClickShowConfirmPassword = () => {
    setValPatient({
      ...valPatient,
      showConfirmPassword: !valPatient.showConfirmPassword,
    });
  };

  const handlePatientMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePatientMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleForgetPassChange = (prop) => (event) => {
    event.preventDefault();
    setForgotPasswordVal({ ...forgetPassVal, [prop]: event.target.value });
  };

  const createNewPhysician = () => (event) => {
    event.preventDefault();
    const callCreatePhysician = async () => {
      try {
        if (valPhysician.password !== valPhysician.confirmPassword) {
          alert("Password does not match.");
          return;
        }
        const { data } = await createPhysician(valPhysician);
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
          const { data } = await loginPhysician(credsLogin);
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
          const { data } = await loginPatient(credsLogin);
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
        if (valPatient.password !== valPatient.confirmPassword) {
          alert("Password does not match.");
          return;
        }
        const { data } = await createPatient(valPatient);
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

  const forgetPassword = () => (event) => {
    event.preventDefault();
    const callResetPassword = async () => {
      const { data } = await goToResetPassword(forgetPassVal);
      alert(data.msg);
      setForgotPassword(!forgotPassword);
    };
    callResetPassword();
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
      <Container
        sx={{
          fontSize: { xs: 20, lg: 30 },
          height: 90,
          width: 90,
          position: "absolute",
          top: 31,
          left: -10,
        }}
      >
        <AiOutlineArrowLeft
          cursor="pointer"
          onClick={() => {
            navigate("/");
          }}
        />
      </Container>
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
        RTUMIstorage - logging in as {location.state.user}
        {/* <Container
          sx={{
            display: { xs: "none", lg: "block" },
          }}
        >
          <AiOutlineUser />
        </Container> */}
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
                For school purposes
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
                RTUMIstorage
              </StyledTextHeader1>
              <StyledTextHeader3
                variant="h3"
                component="div"
                sx={{
                  fontSize: { xs: 12, md: 13, lg: 16 },
                }}
              >
                Let your Revolutionizing covid patient care with a web-based
                data fabric medical information system flow.
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
                    value={credsLogin.email}
                    onChange={handleLoginChange("email")}
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
                    type={credsLogin.showPassword ? "text" : "password"}
                    value={credsLogin.password}
                    onChange={handleLoginChange("password")}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleLoginClickShowPassword}
                            onMouseDown={handleLoginMouseDownPassword}
                            edge="end"
                          >
                            {credsLogin.showPassword ? (
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
                    Log in
                  </StyledButton>
                  <br />
                  <Typography
                    sx={{
                      fontSize: 12,
                      textDecorationLine: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => setForgotPassword(!forgotPassword)}
                  >
                    Forgot password
                  </Typography>
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
                onChange={handlePhysicianChange("firstName")}
                value={valPhysician.firstName}
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
                onChange={handlePhysicianChange("lastName")}
                value={valPhysician.lastName}
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
                onChange={handlePhysicianChange("mobileNumber")}
                value={valPhysician.mobileNumber}
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
                onChange={handlePhysicianChange("email")}
                value={valPhysician.email}
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
                onChange={handlePhysicianChange("workAddress")}
                value={valPhysician.workAddress}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="License number"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handlePhysicianChange("licenses")}
                value={valPhysician.licenses}
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Image"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                onChange={handlePhysicianChange("image")}
                value={valPhysician.image}
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Password"
                type={valPhysician.showPassword ? "text" : "password"}
                value={valPhysician.password}
                onChange={handlePhysicianChange("password")}
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
                        onClick={handlePhysicianClickShowPassword}
                        onMouseDown={handlePhysicianMouseDownPassword}
                        edge="end"
                      >
                        {valPhysician.showPassword ? (
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
                type={valPhysician.showConfirmPassword ? "text" : "password"}
                value={valPhysician.confirmPassword}
                onChange={handlePhysicianChange("confirmPassword")}
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
                        onClick={handlePhysicianClickShowConfirmPassword}
                        onMouseDown={handlePhysicianMouseDownConfirmPassword}
                        edge="end"
                      >
                        {valPhysician.showConfirmPassword ? (
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
                onChange={handlePatientChange("firstName")}
                value={valPatient.firstName}
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
                onChange={handlePatientChange("middleName")}
                value={valPatient.middleName}
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
                onChange={handlePatientChange("lastName")}
                value={valPatient.lastName}
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
                onChange={handlePatientChange("mobileNumber")}
                value={valPatient.mobileNumber}
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
                onChange={handlePatientChange("email")}
                value={valPatient.email}
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
                onChange={handlePatientChange("age")}
                value={valPatient.age}
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
                onChange={handlePatientChange("gender")}
                value={valPatient.gender}
                required
              />
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Password"
                type={valPatient.showPassword ? "text" : "password"}
                value={valPatient.password}
                onChange={handlePatientChange("password")}
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
                        onClick={handlePatientClickShowPassword}
                        onMouseDown={handlePatientMouseDownPassword}
                        edge="end"
                      >
                        {valPatient.showPassword ? (
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
                type={valPatient.showConfirmPassword ? "text" : "password"}
                value={valPatient.confirmPassword}
                onChange={handlePatientChange("confirmPassword")}
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
                        onClick={handlePatientClickShowConfirmPassword}
                        onMouseDown={handlePatientMouseDownConfirmPassword}
                        edge="end"
                      >
                        {valPatient.showConfirmPassword ? (
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
        open={forgotPassword}
        onClose={() => setForgotPassword(!forgotPassword)}
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
          <form onSubmit={forgetPassword()}>
            <FormControl
              style={{
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <Typography>Provide your email</Typography>
              <br />
              <TextField
                id="demo-helper-text-misaligned"
                label="Email address"
                sx={{
                  width: { xs: 200, md: 350 },
                  fontStyle: "italic",
                }}
                value={forgetPassVal.email}
                onChange={handleForgetPassChange("email")}
                required
              />
              <StyledButton variant="contained" type="submit">
                Submit
              </StyledButton>
            </FormControl>
          </form>
        </Container>
      </Modal>
    </StyledMainBox>
  );
};

export default Landing;
