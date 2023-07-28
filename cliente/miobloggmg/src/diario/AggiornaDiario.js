import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { aggiornaPost, dammiDettagliPost } from "../aiuto-api/aiuto-api";
import { Box, FormLabel, TextField, Typography, Button } from "@mui/material";

const AggiornaDiario = () => {
  const [post, setPost] = useState();
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    dammiDettagliPost(id)
      .then((dati) => {
        setPost(dati.post);
        setDati({
          titolo: dati.post.titolo,
          descrizione: dati.post.descrizione,
          posizione: dati.post.posizione,
          immagine: dati.post.immagine
        });
      })
      .catch((errore) => console.log(errore));
  }, [id]);
  const [dati, setDati] = useState({
    titolo: "",
    descrizione: "",
    posizione: "",
    immagine: ""
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
    aggiornaPost(dati, id).then((risultato) => console.log(risultato)).catch((errore) => console.log(errore));
  };
  return (
    <Box display="flex" flexDirection={"column"} width="100%" height="100%">
      <Box display="flex" margin="auto" padding={2}>
        <Typography variant="h4" color={"green"} fontFamily={"Lilita One"}>
          Aggiungi il tuo post
        </Typography>
      </Box>
      {post && (
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
      )}
    </Box>
  );
};

export default AggiornaDiario;
