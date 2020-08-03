import React, { useState } from "react";
import Header from "./components/Header";
import Resumen from "./components/Resumen";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";
import styled from "@emotion/styled";

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color: #ffffff;
  padding: 3rem;
`;

function App() {
  const [resumen, saveResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: "",
      year: "",
      plan: "",
    },
  });

  const [cargando, saveCargando] = useState(false);

  const { cotizacion, datos } = resumen;

  return (
    <Contenedor>
      <Header title="Cotizador de seguros" />
      <ContenedorFormulario>
        <Formulario 
        saveResumen={saveResumen} 
        saveCargando={saveCargando} 
        />

        {cargando ? 
        <Spinner /> : 
        null}

        <Resumen 
        datos={datos} 
        />
        {!cargando ? 
        <Resultado 
        cotizacion={cotizacion}/> : 
        null}
      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;
