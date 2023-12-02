import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import TakeACoatPage from "./pages/TakeACoatPage";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TakeACoatPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  background-color: #ffffff;
`;
