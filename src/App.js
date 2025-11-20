
import './App.css';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import HomePage from './components/HomePage';
import JobsPage from './components/JobsPage';
import JobDetailsPage from './components/JobDetailsPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/jobs' element={<ProtectedRoute><JobsPage /></ProtectedRoute>} />
        <Route path='/jobs/:id' element={<ProtectedRoute><JobDetailsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/not-found"/>} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
