import React, { useState } from "react";
import { Box, Card, CardContent, styled, Typography } from "@mui/material";

const StyledMainCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  color: theme.palette.black.main,
  borderRadius: "40px",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
  marginTop: 20,
}));

const StyledHeader = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 600,
}));

const CovidData = ({ header, description }) => {
  return (
    <StyledMainCard
      sx={{ width: { xs: "15rem", sm: "13rem", md: "15rem", lg: "20rem" } }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <StyledHeader
            variant="h6"
            gutterBottom
            sx={{
              fontSize: { xs: 25, md: 30, lg: 40 },
              color:
                description === "total number of cases"
                  ? "#BBBBBB"
                  : description === "total number of deaths"
                  ? "#707070"
                  : "#82BBF7",
            }}
          >
            {header}
          </StyledHeader>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: { xs: 0, md: 0, lg: -3 },
            }}
            color="text.secondary"
          >
            {description}
          </Typography>
        </Box>
      </CardContent>
    </StyledMainCard>
  );
};

export default CovidData;
