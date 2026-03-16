import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/Authpage';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
   </Router>

  );
}

export default App;
