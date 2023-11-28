import styled from "styled-components";
import coat from "../images/coat.png";

export default function GeneralWeatherInfo(props) {
  const { setSearch, unit, setUnit, temp, weatherZeroMain, description, icon } =
    props;

  return (
    <LeftContainer>
      <LeftBox>

        <LeftHeaderBox>
          <img src={coat} alt="" />
          <h1>Levo um casaquinho?</h1>
        </LeftHeaderBox>

        <LeftMiddleBox>
          <h2>Componente Input de Pesquisa</h2>
          <h3>Componente com  outras infos</h3>

          <SeparateLine />

          <h4>Componente do dia/horário</h4>
          <button>Componente Button Switch</button>
        </LeftMiddleBox>

        <LeftBottomBox>
          <p>Todos os direitos reservados. 2023.</p>
        </LeftBottomBox>

      </LeftBox>
    </LeftContainer>
  );
}

const LeftContainer = styled.div`
  width: 35%;
  padding: 15px 20px 5px 20px;
  background-color: #FFFFFF;
`;

const LeftBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LeftHeaderBox = styled.div`
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

const LeftMiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //background-color: pink;
  margin-bottom: 40px;
  width: 100%;
  height: 100%;
`;

const SeparateLine = styled.div`
  width: 90%;
  height: 2px;
  background: #EDEDED;
`;

const LeftBottomBox = styled.div`
  color: #222222;
  position: absolute;
  bottom: 0%;
  //background-color: #a6ff00;
`;
