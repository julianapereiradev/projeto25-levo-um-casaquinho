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
      <h1>DetailedWeatherInfo</h1>
    </RightContainer>
  );
}

const RightContainer = styled.div`
  width: 100%;
  max-width: 65%;
  padding: 15px 20px 5px 20px;
  background-color: #6b0080;
`;
