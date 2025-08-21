import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProviderWrapper } from "./theme/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./Redux/store"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <Provider store={store}>
    <ThemeProviderWrapper>
      <App />
    </ThemeProviderWrapper>
    </Provider>
  </React.StrictMode>
);
