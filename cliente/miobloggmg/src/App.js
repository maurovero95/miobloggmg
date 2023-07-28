import { Route, Routes } from "react-router-dom";
import Testata from "./testata/Testata";
import Casa from "./casa/Casa";
import Diario from "./diario/Diario";
import Autentica from "./autentica/Autentica";
import Aggiungi from "./diario/Aggiungi";
import Profilo from "./profilo/Profilo";
import { useSelector } from "react-redux";
import AggiornaDiario from "./diario/AggiornaDiario";

function App() {
  const acceduto = useSelector((state) => state.acceduto);
  console.log(acceduto);
  return (
    <div>
      <header>
        <Testata></Testata>
      </header>
      <section>
        <Routes>
          <Route path="/" element={<Casa />} />
          <Route path="/casa" element={<Casa />} />
          <Route path="/diario" element={<Diario />} />
          <Route path="/autentica" element={<Autentica />} />
          <Route path="/aggiungi" element={<Aggiungi />} />
          <Route path="/profilo" element={<Profilo />} />
          <Route path="/post/:id" element={<AggiornaDiario />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
