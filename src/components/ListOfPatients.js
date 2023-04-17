import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Modal,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { MdViewList } from "react-icons/md";
import { AiFillPrinter, AiOutlineClose } from "react-icons/ai";

import { getPatientsHealthHistories } from "../api/healthHistory";

const StyledMainCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  color: theme.palette.black.main,
  borderRadius: "20px",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
  marginTop: 15,
  marginBottom: 20,
}));

const StyledHeader = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: 15,
}));

const ListOfPatients = ({
  patientId,
  firstName,
  middleName,
  lastName,
  mobileNumber,
  age,
  gender,
  date,
  user,
  healthHistory,
  description,
  yearManifested,
  physicianInCharge,
  nameOfPhysician,
  email,
  // value.email,
}) => {
  const [openPatientInfo, setOpenPatientInfo] = useState(false);
  const [patientHealthHistories, setPatientHealthHistories] = useState("");
  const [one, setOne] = useState([]);
  const [authorized, setAuthorized] = useState(false);

  const readPatientHealthHistories = async (id) => {
    // const res = await getAllPatient();
    const { data } = await getPatientsHealthHistories(id);
    if (data != []) {
      return data;
    }
  };

  const storePatientHealthHistories = async (id) => {
    if (one !== []) {
      const dataFromServer = await readPatientHealthHistories(id);
      setOne(dataFromServer.healthHistories);
      let healthHistories = "";
      one.map((item, index) => {
        // combine health histories to string
        healthHistories += item.healthHistory + ", ";
        // check if physician logged in have consent to patient's health history
        if (item.physicianInCharge == nameOfPhysician) {
          setAuthorized(true);
        }
      });
      setPatientHealthHistories(healthHistories);
    }
  };

  useEffect(() => {
    storePatientHealthHistories(email);
  }, []);

  //console.log(sdsd());

  return (
    <>
      {JSON.stringify(user) == '"' + "Physician" + '"' ? (
        <StyledMainCard>
          <CardContent sx={{ display: "flex", flexDirection: "row" }}>
            <Box>
              <StyledHeader variant="h6" gutterBottom>
                <MdViewList
                  style={{
                    fontSize: 25,
                    marginRight: "10px",
                    color: "#BBBBBB",
                    marginTop: -2,
                  }}
                  onClick={() => {
                    setOpenPatientInfo(!openPatientInfo);
                    storePatientHealthHistories(email);
                  }}
                  cursor="pointer"
                />
                Patient {patientId}
              </StyledHeader>
              <Typography variant="body2" sx={{ mb: 1.5 }}>
                {description}
              </Typography>
              <Typography variant="caption">Date added: {date}</Typography>
            </Box>
          </CardContent>

          {openPatientInfo && authorized ? (
            <Modal
              open={openPatientInfo}
              onClose={() => {
                setOpenPatientInfo(!openPatientInfo);
                //setAuthorized(false);
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
                  transform: "translate(-50%, -50%)",
                  width: { xs: "15rem", lg: "20rem" },
                  p: 4,
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <StyledHeader>Patient {patientId}</StyledHeader>

                  <AiOutlineClose
                    style={{
                      fontSize: 25,
                      marginRight: "10px",
                      color: "#707070",
                      marginTop: -2,
                    }}
                    onClick={() => setOpenPatientInfo(!openPatientInfo)}
                    cursor="pointer"
                  />
                </Stack>
                <br />
                <Typography sx={{ mb: 1.5 }}>
                  Full name: {firstName} {middleName} {lastName}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>Age: {age}</Typography>
                <Typography sx={{ mb: 1.5 }}>Gender: {gender}</Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Mobile number: {mobileNumber}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Health history: {patientHealthHistories}
                </Typography>
              </Container>
            </Modal>
          ) : (
            <Modal
              open={openPatientInfo}
              onClose={() => {
                setOpenPatientInfo(!openPatientInfo);
                //setAuthorized(false);
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
                  transform: "translate(-50%, -50%)",
                  width: { xs: "15rem", lg: "20rem" },
                  p: 4,
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <StyledHeader>Patient {patientId}</StyledHeader>

                  <AiOutlineClose
                    style={{
                      fontSize: 25,
                      marginRight: "10px",
                      color: "#707070",
                      marginTop: -2,
                    }}
                    onClick={() => setOpenPatientInfo(!openPatientInfo)}
                    cursor="pointer"
                  />
                </Stack>
                <br />
                <Typography sx={{ mb: 1.5 }}>
                  This patient is assigned to another physician or you don't
                  have consent to view this patient.
                </Typography>
              </Container>
            </Modal>
          )}
        </StyledMainCard>
      ) : (
        <StyledMainCard>
          <CardContent sx={{ display: "flex", flexDirection: "row" }}>
            <Box>
              <StyledHeader variant="h6" gutterBottom>
                <MdViewList
                  style={{
                    fontSize: 25,
                    marginRight: "10px",
                    color: "#BBBBBB",
                    marginTop: -2,
                  }}
                  onClick={() => setOpenPatientInfo(!openPatientInfo)}
                  cursor="pointer"
                />
                Health history ID: {patientId}
              </StyledHeader>
              <Typography variant="body2" sx={{ mb: 1.5 }}>
                {healthHistory} - {description}
              </Typography>
              <Typography variant="caption">Date added: {date}</Typography>
            </Box>
          </CardContent>

          {openPatientInfo && (
            <Modal
              open={openPatientInfo}
              onClose={() => setOpenPatientInfo(!openPatientInfo)}
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
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <StyledHeader> Health history ID: {patientId}</StyledHeader>

                  <AiOutlineClose
                    style={{
                      fontSize: 25,
                      marginRight: "10px",
                      color: "#707070",
                      marginTop: -2,
                    }}
                    onClick={() => setOpenPatientInfo(!openPatientInfo)}
                    cursor="pointer"
                  />
                </Stack>
                <Typography sx={{ mb: 1.5 }}>
                  <br />
                  Health history: {healthHistory}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Description: {description}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Date or year manifested: {yearManifested}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Physician in charge: {physicianInCharge}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>Date added: {date}</Typography>
              </Container>
            </Modal>
          )}
        </StyledMainCard>
      )}
    </>
  );
};

export default ListOfPatients;
