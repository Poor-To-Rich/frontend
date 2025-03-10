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
import SettingPage from '@/pages/SettingPage/SettingPage';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import UpdatePasswordPage from '@/pages/UpdatePasswordPage/UpdatePasswordPage';

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
        <Route path="/month-week" element={<MonthWeekPage />} />
        <Route path="/weeklyDetails" element={<WeeklyDetailsPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
