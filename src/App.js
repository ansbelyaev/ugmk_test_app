import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { MainPage } from "./pages/MainPage/MainPage"
import { DetailsPage } from "./pages/DetailsPage/DetailsPage"
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="/details/:factory_id/:month"
          element={<DetailsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
