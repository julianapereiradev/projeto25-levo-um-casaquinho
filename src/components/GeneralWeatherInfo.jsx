import styled from "styled-components";

export default function GeneralWeatherInfo(props) {
  
  const { 
    setSearch, 
    unit, 
    setUnit,
    temp, 
    weatherZeroMain, 
    description, 
    icon 
  } = props;

  return (
    <LeftContainer>
      <h1>GeneralWeatherInfo</h1>
    </LeftContainer>
  );
}

const LeftContainer = styled.div`
  width: 100%;
  max-width: 35%;
  padding: 15px 20px 5px 20px;
  background-color: green;
`;
