import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "easy-peasy";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./store/store.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>
);
