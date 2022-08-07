import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Formulario from './components/Formulario';
import Cotizacion from "./components/Cotizacion";
import Spinner from './components/Spinner';
import ImagenCripto from "./img/imagen-criptos.png";

const Contenedor = styled.div`
max-width: 900px;
margin: 0 auto;
width: 80%;
@media (min-width: 992px){
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
}
`

const Imagen = styled.img`
  max-width: 400px;
  margin: 50px auto 0 auto;
  width: 1000%;
  display: block;
  
`;



const Heading = styled.h1`
font-family: 'Lato', sans-serif;
color: #FFF;
text-align: center;
font-weight: 800;
margin-top: 15px;
margin-bottom: 25px;
font-size: 30px;

&::after {
  content: '';
  width: 100px;
  height: 5px;
  background-color: #66A2FE;
  display: block;
  margin: 8px auto 0 auto;
}
`

function App() {
  const [monedas, setMonedas] = useState({})
  const [cotizacion, setCotizacion] = useState({})
  const [cargando, setCargando ] = useState(false)
  

  //prevengo la ejecución => if(Object.keys(monedas).length > 0) => si es mayor a 0 es que ya hay algo . DE ESTA FORMA PUEDO REALIZAR EL LLAMADO A LA API
  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      
      const cotizarCripto = async () =>{
        setCargando(true)
        
        const {moneda, criptomoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key={&api_key={14be4bba88470c47eca2cc9186ecbb89fb1fb169abac91432c9cf3f4b20dd96b}}`;


        const respuesta = await fetch(url)
        const resultado = await respuesta.json()


        
        setCotizacion(resultado.DISPLAY[criptomoneda][moneda])
        setCargando(false)
       
      }
      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="imagenes criptos" />

      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas} />

        {cargando && <Spinner />}
        {cotizacion.PRICE && <Cotizacion cotizacion={cotizacion} />}
      </div>
    </Contenedor>
  );
}

export default App
