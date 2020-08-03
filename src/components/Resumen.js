import React from "react";
import { firstMayuscula } from "../helper";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ContenedorResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838f;
  color: #fff;
  margin-top: 1rem;
`;

const Resumen = ({ datos }) => {
  const { marca, year, plan } = datos;

  //SI NO HAY DATOS ESTE COMPONENTE NO SE RETORNARA
  if (marca === "" || year === "" || plan === "") {
    return null;
  }
  //SI SE RETORNA MOSTRARA LOS DATOS
  return (
    <ContenedorResumen>
      <h2>RESUMEN DE COTIZACION</h2>
      <ul>
        <li>Marca: {firstMayuscula(marca)}</li>
        <li>Año del auto: {year}</li>
        <li>Plan: {firstMayuscula(plan)}</li>
      </ul>
    </ContenedorResumen>
  );
};

Resumen.propTypes = {
  datos: PropTypes.object.isRequired
};

export default Resumen;
