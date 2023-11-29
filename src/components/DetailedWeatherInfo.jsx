import styled from "styled-components";

export default function DetailedWeatherInfo(props) {
  
  const {
    temp_min,
    temp_max,
    humidity,
    dt,
    wind,
    name,
    coord,
    unit,
    setUnit,
    forecastApi,
    main,
  } = props;

  return (
    <RightContainer>
      <RightBox>

        <RightHeaderBox>
          <button>HOJE</button>
          <button>PRÓXIMOS DIAS</button>
        </RightHeaderBox>

        <RightMiddleBox>
          <h2>Nome da Cidade</h2>
          <h3>Lat e Long</h3>

          <h4>Ternário para saber se é para renderizar os quadrados ou o gráfico</h4>
          <h5>Componente dos Quadrados</h5>
          <h5>Componente do Gráfico</h5>
        </RightMiddleBox>

       <RightBottomBox>
          <p>Dados fornecidos pela <span>Open Weather API</span></p>
  </RightBottomBox>

      </RightBox>
    </RightContainer>
  );
}

const RightContainer = styled.div`
  width: 65%;
 padding: 15px 20px 0px 20px;
  background-color: #EDEDED;
  height: 100vh;
`;

const RightBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: normal;
`;

const RightHeaderBox = styled.div`
  color: #222222;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  //background-color: yellow;
  width: 100%;
  
  img {
    width: 20%;
    margin-right: 20px;
  }

  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 3vw;
    font-weight: 600;
  }
`;

const RightMiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //background-color: pink;
  margin-bottom: 40px;
  width: 100%;
  height: 100%;
`;


const RightBottomBox = styled.div`
  color: #222222;
  position: absolute;
  bottom: 1%;
  //background-color: #a6ff00;
`;
