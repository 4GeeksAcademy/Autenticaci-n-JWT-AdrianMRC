import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Layout} from './pages/Layout';
import { Home } from './pages/Home.jsx';
import Signup from './components/Signup';
import Login from './components/Login';
import Private from './components/Private';
import ProtectedRoute from './components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route 
            path="private" 
            element={
              <ProtectedRoute>
                <Private />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}