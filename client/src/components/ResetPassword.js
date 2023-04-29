import React, { useState, useEffect } from "react";
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
import { useSearchParams } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { resetPassword } from "../api/resetPassword";

const StyledMainBox = styled(Box)(({ theme }) => ({}));

const StyledHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.black.main,
  fontWeight: 300,
  alignItems: "center",
  justifyContent: "center",
  padding: "35px 90px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.white.main,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 50,
  width: 170,
  marginTop: 40,
  fontWeight: 700,
}));

const ResetPassword = () => {
  const [values, setValues] = useState({
    newPassword: "",
    confirmNewPassword: "",
    token: "",
    email: "",
    showNewPassword: false,
    showConfirmNewPassword: false,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setValues({
      ...values,
      token: searchParams.get("token"),
      email: searchParams.get("email"),
    });
  }, []);

  const handleClickShowConfirmNewPassword = () => {
    setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword,
    });
  };

  const handleMouseDownConfirmNewPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      showNewPassword: !values.showNewPassword,
    });
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    event.preventDefault();
    setValues({ ...values, [prop]: event.target.value });
  };

  const updatePassword = () => (event) => {
    event.preventDefault();
    const callResetPassword = async () => {
      if (values.newPassword !== values.confirmNewPassword) {
        alert("Password does not match.");
        return;
      }
      const { data } = await resetPassword(values);
      alert(data.msg);
    };
    callResetPassword();
  };

  return (
    <StyledMainBox
      sx={{
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
          <Grid item xs={12}>
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
              <form onSubmit={updatePassword()}>
                <FormControl
                  style={{
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                >
                  {/* <TextField
                    id="demo-helper-text-misaligned"
                    label="New password"
                    sx={{
                      width: { xs: 200, md: 350 },
                      fontStyle: "italic",
                    }}
                    type={values.showPassword ? "text" : "password"}
                    value={values.newPassword}
                    onChange={handleChange("newPassword")}
                    required
                  /> */}
                  <TextField
                    id="demo-helper-text-misaligned"
                    label="New password"
                    sx={{
                      width: { xs: 200, md: 350 },
                      fontStyle: "italic",
                    }}
                    type={values.showNewPassword ? "text" : "password"}
                    value={values.newPassword}
                    onChange={handleChange("newPassword")}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownNewPassword}
                            edge="end"
                          >
                            {values.showNewPassword ? (
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
                    sx={{
                      width: { xs: 200, md: 350 },
                      fontStyle: "italic",
                    }}
                    type={values.showConfirmNewPassword ? "text" : "password"}
                    value={values.confirmNewPassword}
                    onChange={handleChange("confirmNewPassword")}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmNewPassword}
                            onMouseDown={handleMouseDownConfirmNewPassword}
                            edge="end"
                          >
                            {values.showConfirmNewPassword ? (
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
                    Submit
                  </StyledButton>
                </FormControl>
              </form>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </StyledMainBox>
  );
};

export default ResetPassword;
