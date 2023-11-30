import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GeneralWeatherInfo from "../components/GeneralWeatherInfo";
import DetailedWeatherInfo from "../components/DetailedWeatherInfo";
import Loading from "../components/Loading";

export default function TakeACoatPage() {
  const [search, setSearch] = useState("rio de janeiro");
  const [unit, setUnit] = useState("metric");
  const [weatherApi, setWeatherApi] = useState(undefined);
  const [forecastApi, setForecastApi] = useState(undefined);
  const [temperatureList, setTemperatureList] = useState([]);

  const MySwal = withReactContent(Swal);

  function WeatherApiError() {
    return <p>A cidade digitada não existe!</p>;
  }

  function ForecastApiError() {
    return <p>A cidade digitada não existe!</p>;
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/weather?q=${search}&lang=pt_br&appid=${import.meta.env.VITE_API_KEY}`)
      .then((res) => {
        setWeatherApi(res.data);
      })
      .catch((error) => {
        MySwal.fire({
          title: "Oops... 😓",
          html: <WeatherApiError />,
          timer: 5000,
          confirmButtonText: "OK",
        });
        console.log('WeatherApiError:', error)
      });

    axios.get(`${import.meta.env.VITE_API_BASE_URL}/forecast?q=${search}&lang=pt_br&appid=${import.meta.env.VITE_API_KEY}`)
      .then((res) => {
        setForecastApi(res.data);
      })
      .catch((error) => {
        MySwal.fire({
          title: "Oops... 😓",
          html: <ForecastApiError />,
          timer: 5000,
          confirmButtonText: "OK",
        });
        console.log('ForecastApiError:', error)
      });
  }, [search]);

  if (!weatherApi || !forecastApi) {
    return <Loading />
  }

  //Destructuring weather and forecast properties:
  const { coord, dt, main, name, weather, wind } = weatherApi;
  const { temp, temp_min, temp_max, humidity } = main;
  const { description, icon } = weather[0];

  return (
    <TakeACoatStyle>
      <GeneralWeatherInfo
        setSearch={setSearch}
        unit={unit}
        setUnit={setUnit}
        temp={temp}
        weatherZeroMain={weather[0].main}
        description={description}
        icon={icon}
        dt={dt}
      />

      <DetailedWeatherInfo
        temp_min={temp_min}
        temp_max={temp_max}
        humidity={humidity}
        wind={wind}
        name={name}
        coord={coord}
        unit={unit}
        forecastApi={forecastApi}
        temperatureList={temperatureList}
        setTemperatureList={setTemperatureList}
      />
    </TakeACoatStyle>
  );
}

const TakeACoatStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;
