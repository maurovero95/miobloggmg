import mongoose, { Schema, model } from "mongoose";

const schemaPost = new Schema({
  titolo: { type: String, required: true },
  descrizione: { type: String, required: true },
  immagine: { type: String },
  posizione: { type: String, required: true },
  data: { type: Date, required: true },
  utente: { type: mongoose.Types.ObjectId, ref: "Utente", required: true },
});

export default model("Post", schemaPost);
