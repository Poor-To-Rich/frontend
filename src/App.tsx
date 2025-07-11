import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from '@/pages/LoginPage/LoginPage';
import SignupPage from '@/pages/SignupPage/SignupPage';
import MainPage from '@/pages/MainPage/MainPage';
import CategoriesPage from '@/pages/CategoriesPage/CategoriesPage';
import AddEditCategoryPage from '@/pages/AddEditCategoryPage/AddEditCategoryPage';
import MonthWeekPage from '@/pages/MonthWeekPage/MonthWeekPage';
import WeeklyDetailsPage from '@/pages/WeeklyDetailsPage/WeeklyDetailsPage';
import SettingPage from '@/pages/SettingPage/SettingPage';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import UpdatePasswordPage from '@/pages/UpdatePasswordPage/UpdatePasswordPage';
import UpdateEmailPage from '@/pages/UpdateEmailPage/UpdateEmailPage';
import IterationDataPage from '@/pages/IterationDataPage/IterationDataPage';
import ChartPage from '@/pages/ChartPage/ChartPage';
import CategoryDetailsPage from '@/pages/CategoryDetailsPage/CategoryDetailsPage';
import ProtectedRoute from '@/components/route/ProtectedRoute';
import RedirectIfLoggedInRoute from '@/components/route/RedirectIfLoggedInRoute';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import AddTransactionPage from '@/pages/AddTransactionPage/AddTransactionPage';
import EditTransactionPage from '@/pages/EditTransactionPage/EditTransactionPage';

function App() {
  return (
    <Routes>
      <Route element={<RedirectIfLoggedInRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/add-transaction" element={<AddTransactionPage />} />
        <Route path="/edit-transaction" element={<EditTransactionPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/category" element={<AddEditCategoryPage />} />
        <Route path="/month-week" element={<MonthWeekPage />} />
        <Route path="/weekly-details" element={<WeeklyDetailsPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        <Route path="/update-email" element={<UpdateEmailPage />} />
        <Route path="/iteration-data" element={<IterationDataPage />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/chart/category-details/:categoryId" element={<CategoryDetailsPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
