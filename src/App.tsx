import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ResourcePage from './pages/ResourcePage';
import ProtectedRoute from './components/ProtectedRoutes';
import MissionDetailsPage from './pages/MissionDetailsPage';
import AccessRestrictedPage from './pages/AccessRestrictedPage';
import Test from './pages/testComponent';
import React from 'react';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Only one /missions route wrapped inside ProtectedRoute */}
        <Route
          path="/missions"
          element={
            <ProtectedRoute>
              <ResourcePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mission/:id"
          element={
            <ProtectedRoute>
              <MissionDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/access-restricted" element={<AccessRestrictedPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;