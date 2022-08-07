import styled from '@emotion/styled'

const Contenedor = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;

  display: flex;
  align-items: center;
  gap: 1rem;
  marging-top: 30px
`;

const Imagen = styled.img`
display: block;
width: 120px
`
const Texto = styled.p`
  font-size: 17px;
  span {
    font-weight: 500;
  }
`;
const Precio = styled.p`
font-size: 18px;
span {
  font-weight: 700;
}
`

const Cotizacion = ({ cotizacion }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    cotizacion;
  return (
    <Contenedor>
      <Imagen 
        src={`http://cryptocompare.com/${IMAGEURL}`} 
        alt="img cripto"
        />
      <div>
        <Precio> El precio es de: <span>{PRICE}</span></Precio>
        <Texto>  Precio más alto del día: <span>{HIGHDAY}</span></Texto>
        <Texto>  Precio más alto del día: <span>{LOWDAY}</span></Texto>
        <Texto>  Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
        <Texto>  Última actualización: <span>{LASTUPDATE}</span></Texto>
      </div>
    </Contenedor>
  );
};

export default Cotizacion;