import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;
const Formulario = ({setMonedas}) => {

const [criptos, setCriptos] = useState([]);
const [error, setError] = useState(false);

const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
const [criptomoneda , SelectCriptomoneda] = useSelectMonedas("Elige tu Criptomoneda", criptos);

useEffect(()=>{
  const consultarAPI = async () => {
    const url =
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key={14be4bba88470c47eca2cc9186ecbb89fb1fb169abac91432c9cf3f4b20dd96b}"
  
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
     

      const arrayCriptos =  resultado.Data.map( cripto => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
      }
      return objeto
      })
      setCriptos(arrayCriptos);
  }
  consultarAPI();
}, [])

//validación
const handleSubmit = e => {
  e.preventDefault()

  if([moneda, criptomoneda].includes('')){
    setError(true)
    return 
  }
  
   setError(false)
   setMonedas({
    moneda, 
    criptomoneda
   })
}


  return (
    <>
      {error && <Error>Todos los campos son requeridos</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCriptomoneda />

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
}

export default Formulario;