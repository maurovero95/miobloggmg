import { Box } from "@mui/material";
import React from "react";
import Diario from "../diario/Diario";

function Casa() {
  return (
    <Box position={"relative"} width="100%" height="90vh">
      <Diario />
    </Box>
  );
}

export default Casa;
