import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from '@/pages/LoginPage/LoginPage';
import SignupPage from '@/pages/SignupPage/SignupPage';
import MainPage from '@/pages/MainPage/MainPage';
import AddEditTransactionPage from '@/pages/AddEditTransactionPage/AddEditTransactionPage';
import CategoriesPage from '@/pages/CategoriesPage.tsx/CategoriesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/add-transaction" element={<AddEditTransactionPage />} />
        <Route path="categories" element={<CategoriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
