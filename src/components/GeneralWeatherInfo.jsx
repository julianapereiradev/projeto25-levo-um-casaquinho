import styled from "styled-components";
import coat from "../images/coat.png";
import Search from "./GeneralInfo/Search";
import CurrentTemp from "./GeneralInfo/CurrentTemp";
import Datetime from "./GeneralInfo/Datetime";
import SwitchButton from "./GeneralInfo/SwitchButton";

export default function GeneralWeatherInfo(props) {
  const { setSearch, unit, setUnit, temp, weatherZeroMain, description, icon, dt } =
    props;

  return (
    <LeftContainer>
      <LeftBox>

        <LeftHeaderBox>
          <img src={coat} alt="" />
          <h1>Levo um casaquinho?</h1>
        </LeftHeaderBox>

        <LeftMiddleBox>
          <Search setSearch={setSearch}/>
          <CurrentTemp 
          unit={unit}
          setUnit={setUnit}
          temp={temp}
          weatherZeroMain={weatherZeroMain}
          description={description}
          icon={icon}
          />

          <SeparateLine />

          <Datetime 
          dt={dt}
          />
         <SwitchButton
          unit={unit}
          setUnit={setUnit}
         />
        </LeftMiddleBox>

        <LeftBottomBox>
          <p>Todos os direitos reservados. 2023.</p>
        </LeftBottomBox>

      </LeftBox>
    </LeftContainer>
  );
}

const LeftContainer = styled.div`
  width: 100%;
  padding: 15px 20px 0px 20px;

@media (min-width: 1024px) {
  width: 35%;
  background-color: #FFFFFF;
  height: 100vh;
}
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
  //background-color: yellow;
  width: 100%;
  
  img {
    width: 6vw;
    margin-right: 20px;

    @media (min-width: 600px) and (max-width: 1023px) {
    width: 8vw;
    }
  }

  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 3vw;
    font-weight: 600;

    @media (min-width: 600px) and (max-width: 1023px) {
      font-size: 5vw;
    }
  }

`;

const LeftMiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
  height: 100%;
`;

const SeparateLine = styled.div`
  width: 70%;
  height: 2px;
  background: #EDEDED;
  margin: 20px 0px 30px 0px;
`;

const LeftBottomBox = styled.div`
  @media (min-width: 1024px) {
  color: #222222;
  position: absolute;
  bottom: 1%;
}

p {
  font-size: 1vw;

  @media (min-width: 600px) and (max-width: 1023px) {
    font-size: 1.2vw;
  }
}


`;
