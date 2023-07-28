import axios from "axios";

export const dammiTuttiIPost = async () => {
  const risultato = await axios.get("/post");
  if (risultato.status !== 200) {
    return console.log("Presente qualche errore");
  }
  const dati = risultato.data;
  return dati;
};

export const mandaRichiestaAutenticazione = async (entra, dati) => {
  const risultato = await axios
    .post("/utenti/entra/", {
      email: dati.email,
      password: dati.password,
    })
    .catch((errore) => console.log(errore));

  if (risultato.status !== 200 && risultato.status !== 201) {
    return console.log("Non abilitato ad accedere");
  }
  const datiRisultato = risultato.data;
  return datiRisultato;
};

export const aggiungiPost = async (dati) => {
  const risultato = await axios
    .post("/post/aggiungi/", {
      titolo: dati.titolo,
      descrizione: dati.descrizione,
      posizione: dati.posizione,
      immagine: dati.immagine,
      data: dati.data,
      utente: localStorage.getItem("idUtente"),
    })
    .catch((errore) => console.log(errore));
  if (risultato.status !== 201) {
    return console.log("Errore inaspettato");
  }

  const datiRisultato = await risultato.data;
  return datiRisultato;
};

export const dammiDettagliPost = async (id) => {
  const risultato = await axios
    .get(`/post/${id}`)
    .catch((errore) => console.log(errore));
  if (risultato.status !== 200) {
    return console.log("Errore: impossibile trovare il post");
  }
  const datiRisultato = await risultato.data;
  return datiRisultato;
};

export const aggiornaPost = async (dati, id) => {
  const risultato = await axios
    .put(`/post/${id}`, {
      titolo: dati.titolo,
      descrizione: dati.descrizione,
      posizione: dati.posizione,
      immagine: dati.immagine,
    })
    .catch((errore) => console.log(errore));
  if (risultato.status !== 200) {
    return console.log("Errore inaspettato");
  }

  const datiRisultato = await risultato.data;
  return datiRisultato;
};
