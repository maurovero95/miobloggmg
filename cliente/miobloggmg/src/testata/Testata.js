import React, { useState } from "react";
import { Toolbar, AppBar, Tabs, Tab } from "@mui/material";
import "./Testata.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const collegamenti = ["casa", "diario", "autentica"];
const collegamentiAcceduto = ["casa", "diario", "aggiungi", "profilo"];

const Testata = () => {
  const acceduto = useSelector((state) => state.acceduto);
  const [valore, setValore] = useState();
  return (
    <AppBar sx={{ position: "sticky" }}>
      <Toolbar
        style={{ backgroundColor: "#00873e" }}
        value={valore}
        onChange={(e, valore) => setValore(valore)}
      >
        <img src="/immagini/gmg_2023.jpg" className="logo" alt="logo" />
        <Tabs sx={{ ml: "auto" }}>
          {acceduto
            ? collegamentiAcceduto.map((link) => (
                <Tab
                  LinkComponent={Link}
                  to={`/${link}`}
                  key={link}
                  label={link}
                  style={{ color: "white" }}
                />
              ))
            : collegamenti.map((link) => (
                <Tab
                  LinkComponent={Link}
                  to={`/${link}`}
                  key={link}
                  label={link}
                  style={{ color: "white" }}
                />
              ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Testata;
