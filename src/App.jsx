import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { pages } from "./routes/routes";
import WeatherPage from "./pages/WeatherPage";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path={pages.weather} element={<WeatherPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  background-color: #ffffff;
`;
