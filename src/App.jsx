import React, { useEffect, useState } from "react";
import axios from "axios";

const api = {
  key: import.meta.env.VITE_API_KEY,
  base: "http://api.openweathermap.org/data/2.5/",
  iconBase: "https://openweathermap.org/img/wn/",
};

function App() {
  const [search, setSearch] = useState("");
  const [unit, setUnit] = useState("metric");
  const [weather, setWeather] = useState({});
  const [imageWeather, setImageWeather] = useState("");

  useEffect(() => {
    // Esta função será executada sempre que os dados do clima forem atualizados
    const fetchWeatherIcon = async () => {
      try {
        if (Object.keys(weather).length !== 0) {
          const icon = weather.weather[0].icon;
          const iconUrl = `${api.iconBase}${icon}@2x.png`;

          const iconResponse = await axios.get(iconUrl);
          setImageWeather(iconResponse.config.url)
        }
      } catch (error) {
        console.error("Erro ao buscar ícone do clima:", error);
      }
    };

    fetchWeatherIcon();
  }, [weather]); // Execute sempre que os dados do clima forem alterados


  function searchPressed() {
    console.log("search aqui:", search);

    const promise = axios.get(
      `${api.base}weather?q=${search}&units=${unit}&APPID=${api.key}&lang=pt_br`
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

    const dataFormatada = `${dia}/${mes}/${ano}, ${diaDaSemana}, ${hora}:${minuto}`;
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

console.log("image weather aqui", imageWeather)

  return (
    <>
      <h1>Levo um casaquinho?</h1>

      <input
        type="text"
        placeholder="Procure por uma cidade"
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={searchPressed}>BUSCAR</button>

      {Object.keys(weather).length !== 0 ? (
        <>
          <p>Nome: {weather.name}</p>

          <p>Lat: {weather.coord.lat.toFixed(2)}</p>

          <p>Lon: {weather.coord.lon.toFixed(2)}</p>

          <p>Imagem: <img src={imageWeather}/></p>

          <p>
            Temperatura: {Math.round(weather.main.temp)}{" "}
            {unit === "metric" ? "°C" : "°F"}
          </p>

          <p>Tempo.descrição: {weather.weather[0].description}</p>

          <p>Mínima: {Math.round(weather.main.temp_min)} {unit === "metric" ? "°C" : "°F"}</p>

          <p>Máxima: {Math.round(weather.main.temp_max)} {unit === "metric" ? "°C" : "°F"}</p>

          <p>Umidade: {weather.main.humidity}%</p>

          <p>Velocidade do vento: {weather.wind.speed} {unit === "metric" ? "m/s" : "milhas/hora"}</p>

          <p>Data de hoje: {dataConvertida} </p>

          {unit === "metric" ? 
          (weather.main.temp_min < 17 || weather.main.temp_max < 17 ? ("Você deve levar um casaquinho!"):("Não, você não deve levar um casaquinho!"))
          :
          (weather.main.temp_min < 62.6 || weather.main.temp_max < 62.6 ? ("Você deve levar um casaquinho!"):("Não, você não deve levar um casaquinho!"))}

          <button onClick={changeUnit}>
            MUDAR PARA {unit === "metric" ? "F" : "C"}
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
