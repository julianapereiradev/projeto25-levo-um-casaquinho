import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import { pages } from "./routes/routes"
import WeatherPage from "./pages/WeatherPage"
import ForecastPage from "./pages/ForecastPage"


export default function App() {

  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path={pages.weather} element={<WeatherPage />} />
          <Route path={pages.forecast} element={<ForecastPage />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #ffffff;
`
