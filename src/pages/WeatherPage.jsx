import styled from "styled-components"
import coat from "../images/coat.png"
import line from "../images/line-through.png"
import Switch from "react-switch";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {Link } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import weathergif from "../images/weathergif.gif"
import { CiSearch } from "react-icons/ci";


const api = {
  key: import.meta.env.VITE_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
  iconBase: "https://openweathermap.org/img/wn/",
};


export default function  WeatherPage() {

  const [checked, setChecked] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [search, setSearch] = useState("");
  const [unit, setUnit] = useState("metric");
  const [weather, setWeather] = useState({});
  const [imageWeather, setImageWeather] = useState("");
  const [temperatureColor, setTemperatureColor] = useState("");
  const inputRef = useRef(null);
  const MySwal = withReactContent(Swal);
  const [temperatureList, setTemperatureList] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [isTodaySelected, setIsTodaySelected] = useState(true);

  const weekday = { 
    0: "dom",
    1: "seg",
    2: "ter",
    3: "qua",
    4: "qui",
    5: "sex",
    6: "sab" 
};

  function dateFormatter(date) {
    const testDate = new Date(date);
    return `${testDate.getDate()}/${testDate.getMonth()+1} (${weekday[testDate.getDay()]})`;
  }


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

  // ...

// Adicione o estado `unit` como dependência para o useEffect
useEffect(() => {
  const fetchData = async () => {
    try {
      // Cria as duas promessas de requisição
      const currentWeatherPromise = axios.get(
        `${api.base}weather?q=${search}&units=${unit}&APPID=${api.key}&lang=pt_br`
      );

      const forecastPromise = axios.get(
        `${api.base}forecast?q=${search}&units=${unit}&APPID=${api.key}&lang=pt_br`
      );

      // Usa Promise.all() para executar ambas as promessas simultaneamente
      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        currentWeatherPromise,
        forecastPromise,
      ]);

      setWeather(currentWeatherResponse.data);
      //console.log("resposta.data para changeUnit (atual):", currentWeatherResponse.data);

      // Faça o que você precisa com a resposta do forecast, por exemplo:
      const temps = forecastResponse.data.list.map((i) => ({
        time: i.dt,
        day: dateFormatter(i.dt_txt),
        temp: i.main.temp
      }));
      setTemperatureList(temps);
      setDataLoaded(true);
      //console.log('changeUnit temps', temps);
    } catch (error) {
      //alert(error.response.data.message);
      console.log("erro em: Promise.all()", error);
    }
  };

  fetchData(); // Chame a função fetchData diretamente

}, [unit]); // Adicione o estado `unit` como dependência

// ...


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
        //console.log("resposta.data for searchPressed:", resposta.data);
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

    const dataFormatada = {
      dia,
      mes,
      ano,
      diaDaSemana,
      hora,
      minuto,
      minutoFormatado,
    };
  
    return dataFormatada;
  }


  const dataConvertida =
    Object.keys(weather).length !== 0 ? converterTimestamp(weather.dt) : "";

    const handleChangeSwitch = (newChecked) => {
      // Ao alterar o switch, atualiza tanto o estado checked quanto a unidade
      setChecked(newChecked);
      setUnit(newChecked ? "imperial" : "metric");
    };

 function todayWeather() {
   setSelectedSection("today");
 }

 function nextDaysWeather() {
   setSelectedSection("nextDays");
   const promise = axios.get(
    `${api.base}forecast?q=${search}&units=${unit}&APPID=${api.key}&lang=pt_br`
  );

  promise.then(res => {
    const temps = res.data.list.map((i) => ({
      time: i.dt,
      day: dateFormatter(i.dt_txt),
      temp: i.main.temp
    }))
    setTemperatureList(temps)
    setDataLoaded(true)
    //console.log('nextdayWeather temps:',temps)
  })
  promise.catch((err) => console.log(err.response.data))
 }

 console.log('temperaturelist:', temperatureList)

  return (
    <SignUpContainer>
      <SignUpBox>
        <LeftBox>
         <LeftBoxTitle>
         <img src={coat} alt="coat-icon" width={'20%'}/>
         <h1>Levo um casaquinho?</h1>
         </LeftBoxTitle>
         <SearchContainer>
  <SearchInput
    ref={inputRef}
    type="text"
    placeholder="Procure por uma cidade"
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e) => (e.key === "Enter" ? searchPressed() : "")}
  />
  <SearchIcon className="search-icon"/>
</SearchContainer>

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
            <h5>{dataConvertida.dia}/{dataConvertida.mes}/{dataConvertida.ano}</h5>
            <h5>{dataConvertida.diaDaSemana}, {dataConvertida.hora}:{dataConvertida.minutoFormatado}</h5>
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
          </>
        ) : (
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}><img src={weathergif} width={'40%'}/></div>
        )}
         <h6>Todos os direitos reservados. 2023.</h6>
        </LeftBox>


        <RightBox>
        <RightHeaderButton>
          <LinkToChangePage  onClick={() => {
              todayWeather();
              setIsTodaySelected(true);
            }}
            style={{ color: isTodaySelected ? '#222222' : '#C8C8C8' }}
            >Hoje
            </LinkToChangePage>
          
          <LinkToChangePage onClick={() => {
              nextDaysWeather();
              setIsTodaySelected(false);
            }}
            style={{ color: !isTodaySelected ? '#222222' : '#C8C8C8' }}
            >Próximos dias
            </LinkToChangePage>

        </RightHeaderButton>

        <RightMiddleContainer>
        <ContainerTitle>
          <h1>{weather.name}</h1>
          {Object.keys(weather).length !== 0 ? (<>
            <div style={{display:'flex', flexDirection:'row', gap:'20px'}}>
            <p>Lat: {weather.coord.lat.toFixed(2)}</p>
            <p>Long: {weather.coord.lon.toFixed(2)}</p>
          </div>
          </>):(<div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}><img src={weathergif} width={'30%'}/></div>)
          }

          </ContainerTitle>
          {selectedSection === "today" ? (
            <>
              {Object.keys(weather).length !== 0 ? (
          <>
          <MoreWeatherInfo>
          <div>
            <p>Mínima</p>
              <h2>{Math.round(weather.main.temp_min)}
              {unit === "metric" ? "°C" : "°F"}</h2>
            </div>

            <div>
            <p>Máxima</p>
              <h2>{Math.round(weather.main.temp_max)}
              {unit === "metric" ? "°C" : "°F"}</h2>
            </div>

            <div>
            <p>Umidade</p>
              <h2>{weather.main.humidity}%</h2>
            </div>

            <div>
            <p>Velocidade do vento</p>
              <h2>{weather.wind.speed}{" "}
              {unit === "metric" ? "m/s" : "mi/h"}</h2>
            </div>
            </MoreWeatherInfo>       
            
            <UseOrNotUseCoat>
            {unit === "metric"
              ? weather.main.temp_min < 17 || weather.main.temp_max < 17
                ? "Você deve levar um casaquinho!"
                : "Não, você não deve levar um casaquinho!"
              : weather.main.temp_min < 62.6 || weather.main.temp_max < 62.6
              ? "Você deve levar um casaquinho!"
              : "Não, você não deve levar um casaquinho!"}
            </UseOrNotUseCoat>
          </>
        ) : (
          ''
        )}
            </>
          ) : selectedSection === "nextDays" ? (
            <>
              {dataLoaded && (
                <>
        <GraphContainer>
        <LineChart
        width={900}
        height={400}
        data={temperatureList}
        margin={{ right: 50, left: 50, top: 30, down: 30 }}
      >
        <XAxis dataKey="day" />
        <YAxis domain={[0, 42]} tickCount={6} dataKey={"temp"} tickFormatter={(value) => `${value} ${unit === "metric" ? "°C" : "°F"}`}/>
        <Tooltip formatter={(value) => `${value} ${unit === "metric" ? "°C" : "°F"}`}/>
        <CartesianGrid stroke="#ffffff" />
        <Line type="monotone" dataKey="temp" stroke="#4c0561" />
      </LineChart>  
        </GraphContainer>
          </>

      )}
            </>
          ) : null}
        </RightMiddleContainer>

        <RightBottomText>
          <h6>Dados fornecidos pela <LinkToOfficialWebsite target="_blank" to={'https://openweathermap.org/'}>Open Weather API</LinkToOfficialWebsite></h6>
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

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  height: 100%;
  max-height: 50px;
  width: 100%;
  border: none;
  border-radius: 8px;
  background-color: #EDEDEF;
  color: #424243;
  font-size: 16px;
  margin-top: 50px;
  padding-left: 40px;
  margin-left: 50px;
  margin-right: 50px;
`;

const SearchIcon = styled(CiSearch)`
  position: absolute;
  left: 60px;
  top: 68%;
  width: 100%;
  max-width: 22px;
  height: 100%;
  max-height: 22px;
  color: #8B9CAF;
`;

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
   font-size: 19px;
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
  align-self: flex-start;
  width: 100%;
`;

const LinkToChangePage = styled(Link)`
  align-self: center;
  font-size: 40px;
  margin-right: 40px;
  color: #222222;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;


const RightMiddleContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  margin-top: 60px;
`;

const ContainerTitle = styled.div`

h1 {
font-size: 100px
}

p {
  font-size: 22px;
  margin-top: 30px;
}
`;

const MoreWeatherInfo = styled.div`
  margin-top: 40px;
  margin-bottom: 50px;
  display: flex;
    flex-wrap: wrap;

  div {
    background-color: #4D4494;
    width: 100%;
    height: 100%;
    max-width: 350px;
    max-height: 180px;
    padding: 30px;
    border-radius: 30px;
    margin-bottom: 30px;
    margin-right: 80px;
  }

  p {
    font-size: 22px;
    color: #FFFFFF;
    font-weight: 600;
    margin-bottom: 6px;
  }

  h2 {
    font-size: 40px;
    color: #FFFFFF;
    font-weight: 600;
  }
`;

const UseOrNotUseCoat = styled.div`
  font-size: 22px;
  font-style: italic;
  color: #AFADAD;
`;

const RightBottomText = styled.div`
  align-self: flex-end;
  width: 100%;
`;

const GraphContainer = styled.div`
  background-color: #FFFFFF;
  border: 1px solid lightgray;
  margin-top: 30px;
`;

const LinkToOfficialWebsite = styled(Link)`
  color: #96A7F2;
  text-decoration: none;
`;