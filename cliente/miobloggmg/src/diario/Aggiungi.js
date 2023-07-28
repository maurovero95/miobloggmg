import { Box, FormLabel, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { aggiungiPost } from "../aiuto-api/aiuto-api";

function Aggiungi() {
  const [dati, setDati] = useState({
    titolo: "",
    descrizione: "",
    posizione: "",
    immagine: "",
    data: "",
  });
  const gestisciCambiamento = (e) => {
    setDati((statoPrecedente) => ({
      ...statoPrecedente,
      [e.target.name]: e.target.value,
    }));
  };
  const gestisciInvio = (e) => {
    e.preventDefault();
    console.log(dati);
    aggiungiPost(dati).then((risultato) => console.log(risultato)).catch((errore) => console.log(errore));
  };
  return (
    <Box display="flex" flexDirection={"column"} width="100%" height="100%">
      <Box display="flex" margin="auto" padding={2}>
        <Typography variant="h4" color={"green"} fontFamily={"Lilita One"}>
          Aggiungi il tuo post
        </Typography>
      </Box>
      <form onSubmit={gestisciInvio}>
        <Box
          padding={3}
          display="flex"
          width="80%"
          margin="auto"
          flexDirection={"column"}
        >
          <FormLabel sx={{ fontFamily: "quicksand" }}>Titolo</FormLabel>
          <TextField
            onChange={gestisciCambiamento}
            name="titolo"
            value={dati.titolo}
            margin="normal"
          />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Descrizione</FormLabel>
          <TextField
            onChange={gestisciCambiamento}
            name="descrizione"
            value={dati.descrizione}
            margin="normal"
          />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Immagine</FormLabel>
          <TextField
            onChange={gestisciCambiamento}
            name="immagine"
            value={dati.immagine}
            margin="normal"
          />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Posizione</FormLabel>
          <TextField
            onChange={gestisciCambiamento}
            name="posizione"
            value={dati.posizione}
            margin="normal"
          />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Data</FormLabel>
          <TextField
            type="date"
            onChange={gestisciCambiamento}
            name="data"
            value={dati.data}
            margin="normal"
          />
          <Button
            type="submit"
            color="warning"
            sx={{ mt: "2", width: "50%", margin: "auto", borderRadius: "7" }}
            variant="contained"
          >
            Inserisci
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Aggiungi;
