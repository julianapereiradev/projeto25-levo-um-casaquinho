import { pages } from "../routes/routes";
import { useNavigate } from "react-router-dom";


export default function ForecastPage() {
    const navigate = useNavigate();
   
    function goToTodayWeather() {
        navigate(pages.weather)
      }

    return (
       <>
          <button onClick={goToTodayWeather}>Hoje</button>
       <p>Página para pegar o gráfico + 5 dias</p>
       </>
    )
}