import { createRoot } from "react-dom/client";
import "./app/styles/index.css";
import App from "./app/app";
import Providers from "./app/providers/providers";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import Loader from "./app/loader";

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById("root")!).render(
  <Providers>
    <Loader>
      <App />
    </Loader>
  </Providers>
);
