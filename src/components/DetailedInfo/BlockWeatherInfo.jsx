import styled from "styled-components";

export default function BlockWeatherInfo(props) {

const {
    temp_min,
    temp_max,
    humidity,
    unit,
    main, 
    wind,
    temp
} = props

    return (
        <>
        <MoreWeatherInfo>
          <div>
            <p>Mínima</p>
            <h2>
            {
                unit === 'metric' ?
                `${Math.round(temp_min - 273.15)}° C` :
                `${Math.round(temp_min * 1.8 - 459.67)}° F`
            }
            </h2>
          </div>

          <div>
            <p>Máxima</p>
            <h2>
            {
                unit === 'metric' ?
                `${Math.round(temp_max - 273.15)}° C` :
                `${Math.round(temp_max * 1.8 - 459.67)}° F`
            }
            </h2>
          </div>

          <div>
            <p>Umidade</p>
            <h2>{humidity}%</h2>
          </div>

          <div>
            <p>Velocidade do vento</p>
            <h2>
            {
                 unit === 'metric' ?
                `${wind.speed} m/s` :
                `${parseInt(wind.speed * 2.24694)} mi/h`
                }
            </h2>
          </div>
        </MoreWeatherInfo>

        <UseOrNotUseCoat>
           { temp_min < 290.15 || temp_max < 290.15
              ? ("Você deve levar um casaquinho!")
              : ("Não, você não deve levar um casaquinho!")} 
         </UseOrNotUseCoat>
      </>
    );
  }
  

  const MoreWeatherInfo = styled.div`
  margin-top: 40px;
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;

  div {
    width: 100%;
    height: 100%;
    max-width: 22vw;
    max-height: 8vw;
    padding: 2vw;
    border-radius: 30px;
    margin-bottom: 30px;
    margin-right: 80px;
    background-color: #4d4494;

  @media (min-width: 600px) and (max-width: 1023px) {
    max-width: 30vw;
    max-height: 10vw;
  }
  }

  p {
    font-size: 1vw;
    color: #ffffff;
    font-weight: 600;
    margin-bottom: 8px;

    @media (min-width: 600px) and (max-width: 1023px) {
      font-size: 2vw;
  }
  }

  h2 {
    font-size: 2vw;
    color: #ffffff;
    font-weight: 600;

    @media (min-width: 600px) and (max-width: 1023px) {
      font-size: 3vw;
  }
  }
`;

const UseOrNotUseCoat = styled.div`
  font-size: 1vw;
  font-style: italic;
  color: #afadad;

  @media (min-width: 600px) and (max-width: 1023px) {
    font-size: 1.7vw;
  }
`;