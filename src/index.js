import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'app/App';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ChakraProvider } from '@chakra-ui/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider>
    <ChakraProvider resetCSS={true}>
      <App />
    </ChakraProvider>
  </StoreProvider>
);


