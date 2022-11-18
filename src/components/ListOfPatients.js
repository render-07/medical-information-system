import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Modal,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { MdViewList } from "react-icons/md";
import { AiFillPrinter } from "react-icons/ai";

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
  fontSize: 17,
}));

const ListOfPatients = ({
  patientId,
  firstName,
  middleName,
  lastName,
  mobileNumber,
  age,
  gender,
  description,
  date,
}) => {
  const [openPatientInfo, setOpenPatientInfo] = useState(false);

  return (
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
            Patient {patientId}
          </StyledHeader>
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            {description}
          </Typography>
          <Typography variant="caption">Date Admitted: {date}</Typography>
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
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <StyledHeader>Patient {patientId}</StyledHeader>

              <AiFillPrinter
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
              {firstName} {middleName} {lastName}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              Age: {age}, Gender: {gender}, Number: {mobileNumber}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              Health history: {description}
            </Typography>
          </Container>
        </Modal>
      )}
    </StyledMainCard>
  );
};

export default ListOfPatients;
