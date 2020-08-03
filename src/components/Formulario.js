import React, {useState} from "react";
import PropTypes from "prop-types";
import {obtenerDiferenciaYear, calcularMarca, obtenerPlan} from "../helper";
import styled from "@emotion/styled";

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;
const InputRadio = styled.input`
    margin: 0 1rem;
`;
const Boton = styled.button`
  background-color: #00838F;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color .3s ease;
  margin-top: 2rem;
  &:hover {
    cursor:pointer;
    background-color: #26C6DA;
  }
`;
const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;


const Formulario = ({saveResumen, saveCargando}) => {

  const [datos, saveDatos]= useState({
    marca:'',
    year:'', 
    plan:''
  });
  const [error, saveError] = useState(false);

  //EXTRAER VALORES DEL STATE
  const {marca, year, plan}= datos;
  //LEER LOS DATOS DEL FORMULARIO Y COLOCARLOS EN EL STATE
  const getInformation = e => {
    saveDatos({
      ...datos,
      [e.target.name] : e.target.value
    })
  };
  //SUBMIT
  const cotizarSeguro = e => {
    e.preventDefault();
    if(marca.trim()===''|| year.trim()===''||plan.trim()===''){
      saveError(true);
      return;
    };
    saveError(false);
    //BASE
    let resultado = 2000;
    //OBTENER DIFERENCIA DE AÑOS
    const diferencia = obtenerDiferenciaYear(year);
    //POR CADA AÑO MAS ANTIGUO RESTAR 3%
    resultado -= ((diferencia * 3)*resultado) / 100;

    //AMERICANO 15%
    //ASIATICO 5%
    //EUROPEO 30%
    resultado = calcularMarca(marca) * resultado;
    
   

    //BASICO 20%
    //COMPLETO 30%
    const incremento = obtenerPlan(plan);
    resultado = parseFloat( resultado * incremento).toFixed(2);
    
    //TOTAL
    //MOSTRAR SPINNER
    saveCargando(true);

    setTimeout(()=>{
      //OCULTA EL SPINNER
      saveCargando(false);
      //GUARDA LOS DATOS DEL USUARIO
      saveResumen({
        cotizacion: Number(resultado), 
        datos
      });
    }, 3000);
    
  };
  return (
    <form
    onSubmit={cotizarSeguro}
    >
      {error ?
       <Error>
        Todos los campos son obligatorios!!!
      </Error> 
      : null}
      <Campo>
        <Label>Marca</Label>
        <Select
         name='marca'
         value={marca}
         onChange={getInformation}
        >
          <option>---Seleccione---</option>
          <option value="americano">AMERICANO</option>
          <option value="europeo">EUROPEO</option>
          <option value="asiatico">ASIATICO</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Modelo</Label>
        <Select
          name='year'
          value={year}
          onChange={getInformation}
        >
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Plan</Label>
        <InputRadio
        type='radio'
        name='plan'
        value='basico'
        checked={plan === "basico"}
        onChange={getInformation}
        />BASICO 
        <InputRadio
        type='radio'
        name='plan'
        value='completo'
        checked={plan === "completo"}
        onChange={getInformation}
        />COMPLETO
      </Campo>
      <Boton type='submit'>Cotizar</Boton>
    </form>
  );
};

Formulario.propTypes = {
  saveResumen: PropTypes.func.isRequired,
  saveCargando: PropTypes.func.isRequired
};

export default Formulario;
