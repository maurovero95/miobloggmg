import { compareSync, hashSync } from "bcryptjs";
import Utente from "../modelli/Utente";

export const dammiTuttiGliUtenti = async (richiesta, risposta) => {
  let utenti;

  try {
    utenti = await Utente.find();
  } catch (errore) {
    console.log(errore);
  }

  if (!utenti) {
    return risposta.status(500).json({ messaggio: "Errore inaspettato" });
  }

  return risposta.status(200).json({ utenti });
};

export const registrazione = async (richiesta, risposta, successivo) => {
  const { nome, email, password } = richiesta.body;
  if (
    !nome &&
    nome.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return risposta.status(422).json({ messaggio: "Dati non validi" });
  }

  const passwordCodificata = hashSync(password);

  let utente;
  try {
    utente = new Utente({ nome, email, password: passwordCodificata });
    await utente.save();
  } catch (errore) {
    console.log(errore);
  }

  if (!utente) {
    return risposta.status(500).json({ messaggio: "Errore inaspettato" });
  }

  return risposta.status(201).json({ utente });
};

export const entra = async (richiesta, risposta, successivo) => {
  const { email, password } = richiesta.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return risposta.status(422).json({ messaggio: "Dati non validi" });
  }

  let utenteEsistente;
  try {
    utenteEsistente = await Utente.findOne({ email });
  } catch (errore) {
    console.log(errore);
  }

  if (!utenteEsistente) {
    return risposta.status(404).json({ messaggio: "Nessun utente trovato" });
  }

  const passwordCorretta = compareSync(password, utenteEsistente.password);
  if (!passwordCorretta) {
    return risposta.status(400).json({ messaggio: "Password non corretta" });
  }
  return risposta
    .status(200)
    .json({ id: utenteEsistente._id, messaggio: "Entrato con successo!" });
};
