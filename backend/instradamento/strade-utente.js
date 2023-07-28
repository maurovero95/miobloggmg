import { Router } from "express";
import { dammiTuttiGliUtenti, entra, registrazione } from "../controllori/controllore-utente";

const stradaUtente = Router();

stradaUtente.get("/", dammiTuttiGliUtenti);
stradaUtente.post("/registrazione", registrazione);
stradaUtente.post("/entra", entra);

export default stradaUtente;