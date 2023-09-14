import React from "react";
import ReactDOM from "react-dom/client";
import {NextUIProvider} from '@nextui-org/react'
import App from "./App";
import "./styles.css";
import {GlobalProvider} from './contexts/global'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
