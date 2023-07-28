import mongoose, { Schema, model } from "mongoose";

const schemaUtente = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  post: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
});

export default model("Utente", schemaUtente);
