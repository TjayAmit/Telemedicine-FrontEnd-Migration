import React from 'react';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import '@fontsource/poppins';
import './App.css';
import CustomRoute from './component/Routes/CustomRoute';
import { BrowserRouter as Router } from 'react-router-dom';

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
      <Router>
        <CustomRoute />
      </Router>
    </ChakraProvider>
  );
}

export default App;
