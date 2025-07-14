import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Components/login/Login";
import LandingPage from "./Pages/landing_page";
import { PrivateRoute } from "./Components/login/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login open={true} />} />
        <Route path="/dashboard" element={ <PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
