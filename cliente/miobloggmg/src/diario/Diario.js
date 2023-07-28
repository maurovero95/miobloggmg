import React, { useEffect, useState } from "react";
import ElementoDiario from "./ElementoDiario";
import { Box } from "@mui/material";
import { dammiTuttiIPost } from "../aiuto-api/aiuto-api";

function Diario() {
  const [post, setPost] = useState();
  useEffect(() => {
    dammiTuttiIPost()
      .then((dati) => setPost(dati?.post))
      .then((dati) => console.log(dati))
      .catch((errore) => console.log(errore));
  }, []);
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      padding={3}
      justifyContent="center"
      alignItems="center"
    >
      {post &&
        post.map((elemento, indice) => (
          <ElementoDiario
            data={new Date(`${elemento.data}`).toLocaleDateString}
            descrizione={elemento.descrizione}
            immagine={elemento.immagine}
            titolo={elemento.titolo}
            id={elemento._id}
            posizione={elemento.posizione}
            key={indice}
            utente={elemento.utente}
          />
        ))}
    </Box>
  );
}

export default Diario;
