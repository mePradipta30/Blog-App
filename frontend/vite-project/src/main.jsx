import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./style.css";
import React from 'react';
import App from './App.jsx'
import { AuthContexProvider } from './context/authContext.jsx';
//import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContexProvider>
    <App />
    </AuthContexProvider>
    
  </StrictMode>,
)
