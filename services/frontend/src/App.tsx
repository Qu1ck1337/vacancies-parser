import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import LoginScreen from "./screens/AuthScreens/LoginScreen";
import SignUpScreen from "./screens/AuthScreens/SignUpScreen";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";

function App() {
  return (
      <ChakraProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<LoginScreen />} />
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/sign-up" element={<SignUpScreen />} />
              </Routes>
          </BrowserRouter>
      </ChakraProvider>
  );
}

export default App;
