import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  styled,
  Typography,
} from "@mui/material";
import { MdViewList } from "react-icons/md";

const StyledMainCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  color: theme.palette.black.main,
  borderRadius: "20px",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
  marginTop: 35,
}));

const StyledColoredBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffd538",
}));

const StyledHeader = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

const ListOfPatients = ({ patientId, name, description, date }) => {
  return (
    <StyledMainCard>
      <CardContent sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            flex: 0.9,
          }}
        >
          <StyledHeader variant="h6" gutterBottom>
            <MdViewList
              style={{
                fontSize: 25,
                marginRight: "10px",
                color: "#BBBBBB",
                marginTop: -2,
              }}
              onClick={() => alert("click")}
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
      <CardActions></CardActions>
    </StyledMainCard>
  );
};

export default ListOfPatients;
