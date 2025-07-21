import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Components/login/Login";
import LandingPage from "./Pages/landing_page";
import { PrivateRoute } from "./Components/login/ProtectedRoute";
import GoalsTable from "./Pages/Post_Manager";
import HistoryTable from "./Pages/history";
import Keyword_Management from "./Pages/Keyword_Management";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login open={true} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/postmanager" element={ <PrivateRoute><GoalsTable/></PrivateRoute>} />
        <Route path="/history" element={ <PrivateRoute><HistoryTable/></PrivateRoute>} />
         <Route path="/keyword-management" element={ <PrivateRoute><Keyword_Management/></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
