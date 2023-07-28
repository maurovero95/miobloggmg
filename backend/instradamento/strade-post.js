import { Router } from "express";
import { aggiornaPost, aggiungiPost, dammiPostPerId, dammiTuttiIPost, eliminaPost } from "../controllori/controllore-post";

const stradaPost = Router();

stradaPost.get("/", dammiTuttiIPost);
stradaPost.post("/aggiungi", aggiungiPost);
stradaPost.get("/:id", dammiPostPerId);
stradaPost.put("/:id", aggiornaPost);
stradaPost.delete("/:id", eliminaPost);

export default stradaPost;