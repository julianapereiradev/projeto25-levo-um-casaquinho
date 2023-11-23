import styled from "styled-components"
import { useState } from "react";
import coat from "../images/coat.png"
import line from "../images/line-through.png"
import Switch from "react-switch";

export default function ForecastPage() {

  const [checked, setChecked] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);


  const handleChangeSwitch = (newChecked) => {
   setChecked(newChecked);
 };

 function todayWeather() {
   setSelectedSection("today");
 }

 function nextDaysWeather() {
   setSelectedSection("nextDays");
 }

  return (
    <SignUpContainer>
      <SignUpBox>
        <LeftBox>
         <LeftBoxTitle>
         <img src={coat} alt="coat-icon" width={'20%'}/>
         <h1>Levo um casaquinho?</h1>
         </LeftBoxTitle>
         <input 
          type="text"
          placeholder="Procure por uma cidade"
        />
        <LeftBoxTemperature>
        <img src={'https://openweathermap.org/img/wn/11d@2x.png'} width={'20%'}/>
        <h2>31</h2>
        <h3>°C</h3>
        </LeftBoxTemperature>
         
         <LeftBoxInfo>
            <h4>Céu Aberto</h4>
            <img src={line} width={'80%'} height={'1%'}/>
            <h5>16/11/2023</h5>
            <h5>Quinta-feira, 16:32</h5>
         <LeftBoxInfoUnit>
         <Switch
          checked={checked}
          onChange={handleChangeSwitch}
          onColor="#f586ff"
          onHandleColor="#a306b8"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        /> °F
         </LeftBoxInfoUnit>
         </LeftBoxInfo>
         <h6>Todos os direitos reservados. 2023.</h6>
        </LeftBox>



        <RightBox>
        <RightHeaderButton>
          <button onClick={todayWeather}>Hoje</button>
          <button onClick={nextDaysWeather}>Próximos dias</button>
        </RightHeaderButton>

        <RightMiddleContainer>
          {selectedSection === "today" ? (
            <>
              <p>Renderizacao de todaysWeather </p>
              {/* ... (conteúdo relacionado a todaysWeather) ... */}
            </>
          ) : selectedSection === "nextDays" ? (
            <>
              <p>Renderizacao de nextDaysWeather </p>
              {/* ... (conteúdo relacionado a nextDaysWeather) ... */}
            </>
          ) : null}
        </RightMiddleContainer>

        <RightBottomText>
          <h6>Dados fornecidos pela <span>Open Weather API</span></h6>
        </RightBottomText>
      </RightBox>

      </SignUpBox>
    </SignUpContainer>
  )
}

const SignUpContainer = styled.div`
  background-color: #1F1712;
  width: 100vw;
  height: 100%;
  display: flex;
`

const SignUpBox = styled.div`
  width: 100vw;

`

const LeftBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 40vw;
  float: left;
  flex-direction: column;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-color: #ffffff;
  position: relative;

  h6 {
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #ffffff;
    font-size: 18px;
    text-align: center;
    padding: 10px;
    color: #222222;
  }

  input {
  margin-top: 50px;
  height: 50px;
  border: none;
  border-radius: 8px;
  background-color: #EDEDEF;
  color: #424243;
  font-size: 16px;
  padding-left: 20px;
  margin-left: 50px;
  margin-right: 50px;
}
`

const LeftBoxTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  padding-top: 20px;
  padding-left: 50px;
  padding-right: 50px;

  img {
   margin-right: 30px;
  }

  h1 {
   font-size: 50px;
   color: #222222;
   font-family: 'Poppins', sans-serif;
   font-weight: 500;
  }
`

const LeftBoxTemperature = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  h2 {
   font-size: 100px;
   font-family: 'Poppins', sans-serif;
  }

  h3 {
   font-size: 60px;
   align-self: baseline;
   margin-top: 10px;
   font-family: 'Poppins', sans-serif;
  }
`

const LeftBoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 50px;

  h4 {
   margin-bottom: 30px;
   font-size: 28px;
  }

  h5 {
   margin-bottom: 5px;
  }

  img {
   margin-bottom: 30px;
   font-size: 22px;
  }

  h6 {
   font-size: 18px;
   color: #222222;
   margin-top: 100px;
  }
`

const LeftBoxInfoUnit = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  height: 100%;
`

const RightBox = styled.div`
  width: 60vw;
  height: 100%;
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #E1E1E1;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
`;

const RightHeaderButton = styled.div`
  background-color: red;
  align-self: flex-start;
  width: 100%;
`;

const RightMiddleContainer = styled.div`
  background-color: #7bff00;
  flex-grow: 1;
  width: 100%;
`;

const RightBottomText = styled.div`
  align-self: flex-end;
  width: 100%;
`;



