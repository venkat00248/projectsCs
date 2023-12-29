import React from "react";
import "./App.css";
import { MyshiftLayout } from "./components/layouts/Main/MyshiftLayout";
import { HashRouter } from 'react-router-dom';
import FormDataProvider from "./components/molecules/API/context/FormDataProvider";
function App() {
  return (
    <HashRouter>
    <div className="App" data-test-id="app-component">
    <FormDataProvider>
      <MyshiftLayout />
      </FormDataProvider>
    </div>
    </HashRouter>
  );
}

export default App;
