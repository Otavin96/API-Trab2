import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./Home.tsx";
import List from "./features/Clients/List.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
    <List />
  </StrictMode>
);
