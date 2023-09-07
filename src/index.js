import React from "react";
import ReactDOM from "react-dom/client";

import App from "app/App";
import { StoreProvider } from "app/providers/StoreProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { NotificationProvider } from "app/providers/notification";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <ChakraProvider resetCSS={true}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </ChakraProvider>
  </StoreProvider>
);
