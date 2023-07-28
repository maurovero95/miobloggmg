import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import stradaUtente from "./instradamento/strade-utente";
import stradaPost from "./instradamento/strade-post";
import cors from "cors";

//Dichiarazioni
const applicazione = express();
dotenv.config();

applicazione.use(cors());
applicazione.use(express.json());
applicazione.use("/utenti", stradaUtente);
applicazione.use("/post", stradaPost);

//Connessione
mongoose
  .connect(
    `mongodb+srv://mauroveronese95:${process.env.PASSWORD_MONGODB}@miobloggmg.uta3nes.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    applicazione.listen(5000, () =>
      console.log("Connessione avvenuta con successo! Ascolto la porta 5000 di localhost")
    )
  )
  .catch((errore) => console.log(errore));
