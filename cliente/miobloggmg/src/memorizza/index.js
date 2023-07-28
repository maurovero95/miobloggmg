import { configureStore, createSlice } from "@reduxjs/toolkit";

const sliceAutorizza = createSlice({
  name: "autorizza",
  initialState: { acceduto: false },
  reducers: {
    entra(stato) {
      stato.acceduto = true;
    },
    esci(stato) {
      stato.acceduto = false;
    },
  },
});

export const azioniAutorizza = sliceAutorizza.actions;

export const memorizza = configureStore({ reducer: sliceAutorizza.reducer });
