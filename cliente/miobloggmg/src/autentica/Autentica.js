import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { mandaRichiestaAutenticazione } from "../aiuto-api/aiuto-api";
import { useDispatch } from "react-redux";
import { azioniAutorizza } from "../memorizza";

function Autentica() {
  const dispatch = useDispatch();
  const [entra, setEntra] = useState(true);
  const gestisciInvio = (e) => {
    e.preventDefault();
    console.log(dati);
    if(entra) {
      mandaRichiestaAutenticazione(true, dati).then((dati) => localStorage.setItem("idUtente", dati.id)).then(() => dispatch(azioniAutorizza.entra())).catch((errore) => console.log(errore));
    }
  }
  const [dati, setDati] = useState({ email: "", password: "" });
  const gestisciCambio = (e) => {
    setDati((statoPrecedente) => ({
      ...statoPrecedente,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Box
      width="40%"
      borderRadius={10}
      boxShadow={"5px 5px 10px #ccc"}
      margin="auto"
      marginTop={10}
    >
      <form onSubmit={gestisciInvio}>
        <Box
          display="flex"
          flexDirection={"column"}
          width="60%"
          padding={5}
          margin="auto"
        >
          <Typography padding={1} variant="h4" textAlign="center">
            Accedi
          </Typography>
          <FormLabel>Email</FormLabel>
          <TextField
            value={dati.email}
            name="email"
            type="email"
            onChange={gestisciCambio}
            required
            margin="normal"
          ></TextField>
          <FormLabel>Password</FormLabel>
          <TextField
            value={dati.password}
            name="password"
            type="password"
            onChange={gestisciCambio}
            required
            margin="normal"
          ></TextField>
          <Button onClick={()=>setEntra(true)} sx={{ mt: 2 }} type="submit" variant="contained">
            Entra
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Autentica;
