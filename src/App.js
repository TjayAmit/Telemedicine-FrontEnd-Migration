import React from 'react';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import '@fontsource/poppins';
import './Style/App.css';
import AnimatedRoutes from './Routes/AnimatedRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';

function App() {
  const theme = extendTheme({
    colors: {
      primary: {
        900: '#1f894c',
        800: '#1f894c',
      },
      secondary: {
        900: '#e00250',
        800: '#3498db',
      },
    },
    fonts: {
      heading: `'Poppins', sans-serif`,
      body: `'Poppins', sans-serif`,
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <ProSidebarProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </ProSidebarProvider>
    </ChakraProvider>
  );
}

export default App;
