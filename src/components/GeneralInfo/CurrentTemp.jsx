import styled from "styled-components";

export default function CurrentTemp(props) {
  const { unit, setUnit, temp, weatherZeroMain, description, icon } = props;

  const api = {
    iconBase: "https://openweathermap.org/img/wn/",
  };

  function defineTemperatureColor(weatherMain) {
    switch (weatherMain) {
      case "Clear":
        return "orange";

      case "Clouds":
        return "darkgray";

      case "Rain":
        return "blue";

      case "Snow":
        return "slategray";

      case "Thunderstorm":
        return "purple";

      case "Drizzle":
        return "lightblue";

      case "Mist":
        return "lightgray";

      default:
        return "red";
    }
  }

  const temperatureColor = defineTemperatureColor(weatherZeroMain);

  return (
    <LeftBoxTemperature>
      <LeftRowPart>
        <img src={`${api.iconBase}${icon}@2x.png`} />
        <div style={{ color: temperatureColor }}>
          {unit === "metric" ? (
            <InternTempPart>
              <h3>{Math.round(temp - 273.15)} </h3>
              <p>°C</p>
            </InternTempPart>
          ) : (
            <InternTempPart>
              <h3>{Math.round(temp * 1.8 - 459.67)}</h3>
              <p>°F</p>
            </InternTempPart>
          )}
        </div>
      </LeftRowPart>

      <h4 style={{ color: temperatureColor }}>{description}</h4>
    </LeftBoxTemperature>
  );
}

const LeftBoxTemperature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  h4 {
    font-size: 2vw;
    margin-top: 20px;
    font-family: "Poppins", sans-serif;

    @media (min-width: 600px) and (max-width: 1023px) {
      font-size: 2.8vw;
  }
  }
`;

const LeftRowPart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  img {
    width: 8vw;

    @media (min-width: 600px) and (max-width: 1023px) {
      width: 12vw;
  }
  }
`;

const InternTempPart = styled.div`
  display: flex;
  flex-direction: row;

  h3 {
    font-size: 8vw;
    font-family: "Poppins", sans-serif;

    @media (min-width: 600px) and (max-width: 1023px) {
      font-size: 12vw;
  }
  }

  p {
    font-size: 4.5vw;

    @media (min-width: 600px) and (max-width: 1023px) {
      font-size: 6.5vw;
  }
  }
`;
