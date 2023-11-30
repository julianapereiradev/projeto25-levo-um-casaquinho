import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import BlockWeatherInfo from "./DetailedInfo/BlockWeatherInfo";
import ForecastGraphInfo from "./DetailedInfo/ForecastGraphInfo";

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
    temp,
  } = props;

  const [isTodaySelected, setIsTodaySelected] = useState(true);

console.log('isTodaySelected', isTodaySelected)

  return (
    <RightContainer>
      <RightBox>
        <RightHeaderBox>
        <LinkToChangePage
              onClick={() => {
                setIsTodaySelected(true);
              }}
              style={{ color: isTodaySelected ? "#222222" : "#C8C8C8" }}
            >
              Hoje
            </LinkToChangePage>

            <LinkToChangePage
              onClick={() => {
                setIsTodaySelected(false);
              }}
              style={{ color: !isTodaySelected ? "#222222" : "#C8C8C8" }}
            >
              Próximos dias
            </LinkToChangePage>
        </RightHeaderBox>

        <RightMiddleBox>
          <ContainerTitle>
            <h1>{name}</h1>
            <div>
              <p>Lat: {coord.lat.toFixed(2)}</p>
              <p>Long: {coord.lon.toFixed(2)}</p>
            </div>
          </ContainerTitle>

          {isTodaySelected ? (
          <BlockWeatherInfo 
          temp_min={temp_min}
          temp_max={temp_max}
          humidity={humidity}
          unit={unit} 
          main={main} 
          wind={wind}
          temp={temp}
          />
        ) : (
          <ForecastGraphInfo 
          unit={unit} 
          forecastApi={forecastApi}
          dt={dt}
          />
        )}

        </RightMiddleBox>

        <RightBottomBox>
           <h6>
              Dados fornecidos pela <LinkToOfficialWebsite target="_blank" to={"https://openweathermap.org/"}>Open Weather API</LinkToOfficialWebsite>
            </h6>
        </RightBottomBox>
      </RightBox>
    </RightContainer>
  );
}

const RightContainer = styled.div`
  width: 100%;
  background-color: #ededed;
  padding: 15px 20px 0px 20px;

@media (min-width: 1024px) {
  width: 65%;
  background-color: #ededed;
}
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
    font-family: "Poppins", sans-serif;
    font-size: 3vw;
    font-weight: 600;
  }
`;

const LinkToChangePage = styled(Link)`
  align-self: center;
  font-size: 3vw;
  margin-right: 40px;
  color: #222222;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;


const RightMiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  width: 100%;
  height: 100%;
`;

const ContainerTitle = styled.div`
  h1 {
    font-size: 7.2vw;
  }

  div {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  p {
    font-size: 1vw;
    margin-top: 20px;
    margin-bottom: 20px;

    @media (min-width: 600px) and (max-width: 1023px) {
    font-size: 1.3vw;
  }
  }
`;

const RightBottomBox = styled.div`

  @media (min-width: 1024px) {
  color: #222222;
  position: absolute;
  bottom: 1%;
  }

  h6 {
    font-size: 1vw;

    @media (min-width: 600px) and (max-width: 1023px) {
    font-size: 1.2vw;
  }
  }
`;

const LinkToOfficialWebsite = styled(Link)`
  color: #96a7f2;
  text-decoration: none;
`;
