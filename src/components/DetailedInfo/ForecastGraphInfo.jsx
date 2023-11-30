import styled from "styled-components";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export default function ForecastGraphInfo(props) {

  const { unit, forecastApi, dt } = props


    const temps = forecastApi.list.map((i) => ({
      day: dayjs(i.dt_txt).format("DD/MM (ddd)"),
      temp: unit === "metric" ? parseInt(i.main.temp - 273.15) : parseInt(i.main.temp * 1.8 - 459.67)
    }));



  return (
      <GraphContainer>
        <LineChart
          width={900}
          height={400}
          data={temps}
          //margin={{top: 30, right: 10}}
        >
          <XAxis dataKey="day" />
          <YAxis
            dataKey="temp"
            tickFormatter={(value) =>
              `${value} ${unit === "metric" ? "°C" : "°F"}`
            }
          />
          <Tooltip
            contentStyle={{backgroundColor: '#EFEFEF'}}
            formatter={(value) => `${value} ${unit === "metric" ? "°C" : "°F"}`}
          />
          <CartesianGrid stroke="#ffffff" />
          <Line type="monotone" dataKey="temp" stroke="#4c0561" />
        </LineChart>
      </GraphContainer>
  );
}

const GraphContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid lightgray;
  margin-top: 30px;

`;