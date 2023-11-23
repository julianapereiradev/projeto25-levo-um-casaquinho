/*
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { pages } from "../routes/routes";
import { useNavigate } from "react-router-dom";

const api = {
  key: import.meta.env.VITE_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
  iconBase: "https://openweathermap.org/img/wn/",
};

export default function WeatherPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [unit, setUnit] = useState("metric");
  const [weather, setWeather] = useState({});
  const [imageWeather, setImageWeather] = useState("");
  const [temperatureColor, setTemperatureColor] = useState("");
  const inputRef = useRef(null);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    // Esta função será executada sempre que os dados do clima forem atualizados
    inputRef.current.focus();

    const fetchWeatherIcon = async () => {
      try {
        if (Object.keys(weather).length !== 0) {
          const icon = weather.weather[0].icon;
          const iconUrl = `${api.iconBase}${icon}@2x.png`;

          const iconResponse = await axios.get(iconUrl);
          setImageWeather(iconResponse.config.url);
        }
      } catch (error) {
        console.error("Erro ao buscar ícone do clima:", error);
      }
    };

    const defineTemperatureColor = () => {
      if (Object.keys(weather).length !== 0) {
        const weatherMain = weather.weather[0].main;
        switch (weatherMain) {
          case "Clear":
            setTemperatureColor("orange");
            break;
          case "Clouds":
            setTemperatureColor("darkgray");
            break;
          case "Rain":
            setTemperatureColor("blue");
            break;
          case "Snow":
            setTemperatureColor("slategray");
            break;
          case "Thunderstorm":
            setTemperatureColor("purple");
            break;
          case "Drizzle":
            setTemperatureColor("lightblue");
            break;
          case "Mist":
            setTemperatureColor("lightgray");
            break;
          default:
            setTemperatureColor("");
        }
      }
    };

    fetchWeatherIcon();
    defineTemperatureColor();
  }, [weather]);

  function ModalContent() {
    return <p>A cidade digitada não existe!</p>;
  }

  function searchPressed() {
    const promise = axios.get(
      `${api.base}weather?q=${search}&units=${unit}&APPID=${api.key}&lang=pt_br`
    );

    promise
      .then((resposta) => {
        setWeather(resposta.data);
        console.log("resposta.data for searchPressed:", resposta.data);
      })
      .catch((erro) => {
        console.log("erro aqui", erro);
        MySwal.fire({
          title: "Oops... 😓",
          html: <ModalContent />,
          timer: 5000,
          confirmButtonText: "OK",
        });
      });
  }

  function converterTimestamp(timestamp) {
    const data = new Date(timestamp * 1000);

    const diasDaSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const diaDaSemana = diasDaSemana[data.getDay()];
    const hora = data.getHours();
    const minuto = data.getMinutes();
    const minutoFormatado = minuto < 10 ? `0${minuto}` : minuto;

    const dataFormatada = `${dia}/${mes}/${ano}, ${diaDaSemana}, ${hora}:${minutoFormatado}`;
    return dataFormatada;
  }

  const dataConvertida =
    Object.keys(weather).length !== 0 ? converterTimestamp(weather.dt) : "";

  function changeUnit() {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);

    if (Object.keys(weather).length !== 0) {
      const promise = axios.get(
        `${api.base}weather?q=${search}&units=${newUnit}&APPID=${api.key}&lang=pt_br`
      );

      promise
        .then((resposta) => {
          setWeather(resposta.data);
          console.log("resposta.data for searchPressed:", resposta.data);
        })
        .catch((erro) => {
          alert(erro.response.data.message);
          console.log(
            "erro em: GET no ItemHoje para recarregar lista Hoje:",
            erro
          );
        });
    }
  }

  return (
    <>
      <div style={{ background: "pink" }}>
        <h1>Levo um casaquinho?</h1>
        <input
          ref={inputRef}
          type="text"
          placeholder="Procure por uma cidade"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? searchPressed() : "")}
        />
        {Object.keys(weather).length !== 0 ? (
          <>
            <p>
              Imagem: <img src={imageWeather} />
            </p>

            <p style={{ color: temperatureColor }}>
              Temperatura: {Math.round(weather.main.temp)}{" "}
              {unit === "metric" ? "°C" : "°F"}
            </p>

            <p>descrição: {weather.weather[0].description}</p>

            <p>Data de hoje: {dataConvertida} </p>

            <button onClick={changeUnit}>
              MUDAR PARA {unit === "metric" ? "F" : "C"}
            </button>
          </>
        ) : (
          <div style={{ background: "yellow" }}>Nada</div>
        )}
      </div>

      <div style={{ background: "lightgrey" }}>
        {Object.keys(weather).length !== 0 ? (
          <>
            <p>Nome: {weather.name}</p>

            <p>Lat: {weather.coord.lat.toFixed(2)}</p>

            <p>Lon: {weather.coord.lon.toFixed(2)}</p>

            <p>
              Mínima: {Math.round(weather.main.temp_min)}{" "}
              {unit === "metric" ? "°C" : "°F"}
            </p>

            <p>
              Máxima: {Math.round(weather.main.temp_max)}{" "}
              {unit === "metric" ? "°C" : "°F"}
            </p>

            <p>Umidade: {weather.main.humidity}%</p>

            <p>
              Velocidade do vento: {weather.wind.speed}{" "}
              {unit === "metric" ? "m/s" : "milhas/hora"}
            </p>

            {unit === "metric"
              ? weather.main.temp_min < 17 || weather.main.temp_max < 17
                ? "Você deve levar um casaquinho!"
                : "Não, você não deve levar um casaquinho!"
              : weather.main.temp_min < 62.6 || weather.main.temp_max < 62.6
              ? "Você deve levar um casaquinho!"
              : "Não, você não deve levar um casaquinho!"}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
*/

















import styled from "styled-components"
import coat from "../images/coat.png"
import line from "../images/line-through.png"
import Switch from "react-switch";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { pages } from "../routes/routes";
import { useNavigate } from "react-router-dom";

const api = {
  key: import.meta.env.VITE_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
  iconBase: "https://openweathermap.org/img/wn/",
};


export default function  WeatherPage() {

  const [checked, setChecked] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);


  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [unit, setUnit] = useState("metric");
  const [weather, setWeather] = useState({});
  const [imageWeather, setImageWeather] = useState("");
  const [temperatureColor, setTemperatureColor] = useState("");
  const inputRef = useRef(null);
  const MySwal = withReactContent(Swal);



  useEffect(() => {
    // Esta função será executada sempre que os dados do clima forem atualizados
    inputRef.current.focus();

    const fetchWeatherIcon = async () => {
      try {
        if (Object.keys(weather).length !== 0) {
          const icon = weather.weather[0].icon;
          const iconUrl = `${api.iconBase}${icon}@2x.png`;

          const iconResponse = await axios.get(iconUrl);
          setImageWeather(iconResponse.config.url);
        }
      } catch (error) {
        console.error("Erro ao buscar ícone do clima:", error);
      }
    };

    const defineTemperatureColor = () => {
      if (Object.keys(weather).length !== 0) {
        const weatherMain = weather.weather[0].main;
        switch (weatherMain) {
          case "Clear":
            setTemperatureColor("orange");
            break;
          case "Clouds":
            setTemperatureColor("darkgray");
            break;
          case "Rain":
            setTemperatureColor("blue");
            break;
          case "Snow":
            setTemperatureColor("slategray");
            break;
          case "Thunderstorm":
            setTemperatureColor("purple");
            break;
          case "Drizzle":
            setTemperatureColor("lightblue");
            break;
          case "Mist":
            setTemperatureColor("lightgray");
            break;
          default:
            setTemperatureColor("");
        }
      }
    };

    fetchWeatherIcon();
    defineTemperatureColor();
  }, [weather]);

  function ModalContent() {
    return <p>A cidade digitada não existe!</p>;
  }

  function searchPressed() {
    const promise = axios.get(
      `${api.base}weather?q=${search}&units=${unit}&APPID=${api.key}&lang=pt_br`
    );

    promise
      .then((resposta) => {
        setWeather(resposta.data);
        console.log("resposta.data for searchPressed:", resposta.data);
        todayWeather()
      })
      .catch((erro) => {
        console.log("erro aqui", erro);
        MySwal.fire({
          title: "Oops... 😓",
          html: <ModalContent />,
          timer: 5000,
          confirmButtonText: "OK",
        });
      });
  }

  function converterTimestamp(timestamp) {
    const data = new Date(timestamp * 1000);

    const diasDaSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const diaDaSemana = diasDaSemana[data.getDay()];
    const hora = data.getHours();
    const minuto = data.getMinutes();
    const minutoFormatado = minuto < 10 ? `0${minuto}` : minuto;

    const dataFormatada = `${dia}/${mes}/${ano}, ${diaDaSemana}, ${hora}:${minutoFormatado}`;
    return dataFormatada;
  }

  const dataConvertida =
    Object.keys(weather).length !== 0 ? converterTimestamp(weather.dt) : "";

  function changeUnit() {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);

    if (Object.keys(weather).length !== 0) {
      const promise = axios.get(
        `${api.base}weather?q=${search}&units=${newUnit}&APPID=${api.key}&lang=pt_br`
      );

      promise
        .then((resposta) => {
          setWeather(resposta.data);
          console.log("resposta.data for searchPressed:", resposta.data);
        })
        .catch((erro) => {
          alert(erro.response.data.message);
          console.log(
            "erro em: GET no ItemHoje para recarregar lista Hoje:",
            erro
          );
        });
    }
  }

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
          ref={inputRef}
          type="text"
          placeholder="Procure por uma cidade"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? searchPressed() : "")}
        />

{Object.keys(weather).length !== 0 ? (
          <>
          <LeftBoxTemperature>
        <img src={imageWeather} width={'20%'}/>
        <h2 style={{ color: temperatureColor }}>{Math.round(weather.main.temp)}{" "}
              {unit === "metric" ? "°C" : "°F"}</h2>
        </LeftBoxTemperature>
         
         <LeftBoxInfo>
            <h4>{weather.weather[0].description}</h4>
            <img src={line} width={'80%'} height={'1%'}/>
            <h5>{dataConvertida}</h5>
         <LeftBoxInfoUnit>
         <button onClick={changeUnit}>
              MUDAR PARA {unit === "metric" ? "F" : "C"}
            </button>
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
          </>
        ) : (
          <div style={{ background: "yellow" }}>Nada</div>
        )}
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
              {Object.keys(weather).length !== 0 ? (
          <>
            <p>Nome: {weather.name}</p>

            <p>Lat: {weather.coord.lat.toFixed(2)}</p>

            <p>Lon: {weather.coord.lon.toFixed(2)}</p>

            <p>
              Mínima: {Math.round(weather.main.temp_min)}{" "}
              {unit === "metric" ? "°C" : "°F"}
            </p>

            <p>
              Máxima: {Math.round(weather.main.temp_max)}{" "}
              {unit === "metric" ? "°C" : "°F"}
            </p>

            <p>Umidade: {weather.main.humidity}%</p>

            <p>
              Velocidade do vento: {weather.wind.speed}{" "}
              {unit === "metric" ? "m/s" : "milhas/hora"}
            </p>

            {unit === "metric"
              ? weather.main.temp_min < 17 || weather.main.temp_max < 17
                ? "Você deve levar um casaquinho!"
                : "Não, você não deve levar um casaquinho!"
              : weather.main.temp_min < 62.6 || weather.main.temp_max < 62.6
              ? "Você deve levar um casaquinho!"
              : "Não, você não deve levar um casaquinho!"}
          </>
        ) : (
          <div style={{ background: "green" }}>Nada</div>
        )}
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



