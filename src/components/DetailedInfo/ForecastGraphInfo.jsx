import styled from "styled-components";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
  ResponsiveContainer
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
          <div style={{ width: "100%", height: 300, backgroundColor: 'white'}}>
          <ResponsiveContainer>
            <ComposedChart
              width={500}
              height={400}
              data={temps}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 0
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis
              fontSize={11} 
              dataKey="day"
              />
              <YAxis 
              fontSize={11}
              dataKey="temp"
              tickFormatter={(value) =>
                `${value} ${unit === "metric" ? "°C" : "°F"}`
              }
              />
              <Tooltip 
               formatter={(value) => `${value} ${unit === "metric" ? "°C" : "°F"}`}
              />
              <Line 
              type="monotone" 
              dataKey="temp"  
              stroke="#4c0561"  
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
  );
}

const GraphContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid lightgray;
  margin-top: 30px;
  width: 100%;
  height: 100%;
  max-width: 800px;
  max-height: 400px;
`;