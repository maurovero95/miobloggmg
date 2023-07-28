import React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";

const ElementoDiario = ({
  titolo,
  descrizione,
  immagine,
  posizione,
  data,
  id,
  utente,
}) => {
  const utenteAcceduto = () => {
    if (localStorage.getItem("idUtente") === utente) {
      return true;
    }
    return false;
  };
  return (
    <Card
      sx={{
        width: "50%",
        height: "50%",
        margin: 1,
        padding: 1,
        display: "flex",
        flexDirection: "column",
        boxShadow: "5px 5px 10px #ccc",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="post">
            M
          </Avatar>
        }
        action={<IconButton aria-label="impostazioni"></IconButton>}
        title={titolo}
        header={posizione}
        subheader={data}
      ></CardHeader>
      <CardMedia component="img" height="194" image={immagine} alt={titolo} />
      <CardContent>
        <Typography paddingBottom={1} variant="h6" color="text.secondary">
          {titolo}
        </Typography>
        <hr />
        <Typography paddingTop={1} variant="body2" color="text.secondary">
          {descrizione}
        </Typography>
      </CardContent>
      {utenteAcceduto && (
        <CardActions sx={{ marginLeft: "auto" }} disableSpacing>
          <IconButton LinkComponent={Link} to={`/post/${id}`} color="warning">
            <ModeEditOutlineIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteForeverIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default ElementoDiario;
