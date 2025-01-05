import { createRoot } from "react-dom/client";
import "./app/styles/index.css";
import App from "./app/app";
import Providers from "./app/providers/providers";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>
);
