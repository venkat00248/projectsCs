import React from "react";
import { HashRouter } from 'react-router-dom';
import { MainLayout } from "./components/layouts/Main/MainLayout";
function App() {
  return (
    <HashRouter>
    <div className="App" data-test-id="app-component">
      <MainLayout />
    </div>
    </HashRouter>
  );
}

export default App;
