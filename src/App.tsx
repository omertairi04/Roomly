import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./auth/AuthContext";
import AppRoutes from "./routes/Auth/AppRoutes";

function App() {
  return (
      <BrowserRouter>
          <AuthProvider>
              <AppRoutes></AppRoutes>
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
