import mongoose from "mongoose";
import Post from "../modelli/Post";
import Utente from "../modelli/Utente";

export const dammiTuttiIPost = async (richiesta, risposta) => {
  let post;

  try {
    post = await Post.find();
  } catch (errore) {
    console.log(errore);
  }

  if (!post) {
    return risposta.status(500).json({ messaggio: "Errore inaspettato" });
  }

  return risposta.status(200).json({ post });
};

export const aggiungiPost = async (richiesta, risposta) => {
  const { titolo, descrizione, immagine, posizione, data, utente } =
    richiesta.body;
  if (
    !titolo &&
    titolo.trim() === "" &&
    !descrizione &&
    descrizione.trim() === "" &&
    !posizione &&
    posizione.trim() === "" &&
    !data &&
    !utente
  ) {
    return risposta.status(422).json({ messaggio: "Dati non validi" });
  }
  let utenteEsistente;
  try {
    utenteEsistente = await Utente.findById(utente);
  } catch (errore) {
    console.log(errore);
  }
  if (!utenteEsistente) {
    return risposta.status(404).json({ messaggio: "Nessun utente trovato" });
  }
  let post;
  try {
    post = new Post({
      titolo,
      descrizione,
      immagine,
      posizione,
      data: new Date(`${data}`),
      utente,
    });

    const sessione = await mongoose.startSession();
    sessione.startTransaction();
    utenteEsistente.post.push(post);
    await utenteEsistente.save(sessione);
    post = await post.save({ sessione });
    sessione.commitTransaction();
  } catch (errore) {
    console.log(errore);
  }

  if (!post) {
    return risposta.status(500).json({ messaggio: "Errore inaspettato" });
  }

  return risposta.status(201).json({ post });
};

export const dammiPostPerId = async (richiesta, risposta) => {
  const id = richiesta.params.id;
  let post;
  try {
    post = await Post.findById(id);
  } catch (errore) {
    console.log(errore);
  }
  if (!post) {
    return risposta.status(404).json({ messaggio: "Nessun post trovato" });
  }
  return risposta.status(200).json({ post });
};

export const aggiornaPost = async (richiesta, risposta) => {
  const id = richiesta.params.id;
  const { titolo, descrizione, posizione, immagine} =
    richiesta.body;
  if (
    !titolo &&
    titolo.trim() === "" &&
    !descrizione &&
    descrizione.trim() === "" &&
    !posizione &&
    posizione.trim() === ""
  ) {
    return risposta.status(422).json({ messaggio: "Dati non validi" });
  }
  let post;
  try {
    post = await Post.findByIdAndUpdate(id, {
      titolo,
      descrizione,
      immagine,
      posizione
    });
  } catch (errore) {
    console.log(errore);
  }
  if (!post) {
    return risposta.status(404).json({ messaggio: "Nessun post trovato" });
  }
  return risposta
    .status(200)
    .json({ post, messaggio: "Aggiornato con successo!" });
};

export const eliminaPost = async (richiesta, risposta) => {
  const id = richiesta.params.id;
  let post;
  try {
    const sessione = await mongoose.startSession();
    sessione.startTransaction();
    post = await Post.findById(id).populate("utente");
    post.utente.post.pull(post);
    await post.utente.save({sessione});
    post = await Post.findByIdAndRemove(id);
    sessione.commitTransaction();
  } catch (errore) {
    console.log(errore);
  }
  if (!post) {
    return risposta
      .status(500)
      .json({ messaggio: "Impossibile eliminare il post" });
  }
  return risposta
    .status(200)
    .json({ post, messaggio: "Eliminato con successo!" });
};
