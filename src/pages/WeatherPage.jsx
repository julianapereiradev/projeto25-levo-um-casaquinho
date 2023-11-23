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
