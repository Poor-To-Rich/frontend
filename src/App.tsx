import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from '@/pages/LoginPage/LoginPage';
import SignupPage from '@/pages/SignupPage/SignupPage';
import MainPage from '@/pages/MainPage/MainPage';
import AddEditTransactionPage from '@/pages/AddEditTransactionPage/AddEditTransactionPage';
import CategoriesPage from '@/pages/CategoriesPage.tsx/CategoriesPage';
import AddEditCategoryPage from '@/pages/AddEditCategoryPage/AddEditCategoryPage';
import MonthWeekPage from '@/pages/MonthWeekPage/MonthWeekPage';
import WeeklyDetailsPage from '@/pages/WeeklyDetailsPage/WeeklyDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/transaction" element={<AddEditTransactionPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/category" element={<AddEditCategoryPage />} />
        <Route path="/monthWeek" element={<MonthWeekPage />} />
        <Route path="/weeklyDetails" element={<WeeklyDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
