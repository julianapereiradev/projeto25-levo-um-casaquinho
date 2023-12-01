import styled from "styled-components";
import {
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
  ResponsiveContainer,
  LineChart,
} from "recharts";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export default function ForecastGraphInfo(props) {
  const { unit, forecastApi } = props;

  const temps = forecastApi.list.map((i) => ({
    day: dayjs(i.dt_txt).format("DD/MM (ddd)"),
    temp:
      unit === "metric"
        ? parseInt(i.main.temp - 273.15)
        : parseInt(i.main.temp * 1.8 - 459.67),
  }));

  return (
    <GraphContainer>
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
          data={temps}
          margin={{
            top: 20,
            right: 50,
            bottom: 20,
            left: 0,
          }}
        >
          <LineChart stroke="#ffffff" />
          <XAxis 
          fontSize={10} 
          dataKey="day" 
          interval={"equidistantPreserveStart"}
          />
          <YAxis
            fontSize={10}
            dataKey="temp"
            tickFormatter={(value) =>
              `${value} ${unit === "metric" ? "°C" : "°F"}`
            }
          />
          <Tooltip
            formatter={(value) => `${value} ${unit === "metric" ? "°C" : "°F"}`}
          />
          <Line type="monotone" dataKey="temp" stroke="#4d4494" />
        </ComposedChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
}

const GraphContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #ffffff;
`;
