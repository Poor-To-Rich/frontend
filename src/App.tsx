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
import UpdateEmailPage from '@/pages/UpdateEmailPage/UpdateEmailPage';
import IterationDataPage from '@/pages/IterationDataPage/IterationDataPage';
import ChartPage from '@/pages/ChartPage/ChartPage';
import CategoryDetailsPage from '@/pages/CategoryDetailsPage/CategoryDetailsPage';
import ScrollToUp from '@/utils/ScrollToUp';
import ProtectedRoute from './components/route/ProtectedRoute';

if (import.meta.env.DEV) {
  const { worker } = await import('@/mocks/browser');
  await worker.start();
}

function App() {
  return (
    <Router>
      <ScrollToUp />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/transaction" element={<AddEditTransactionPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category" element={<AddEditCategoryPage />} />
          <Route path="/month-week" element={<MonthWeekPage />} />
          <Route path="/weeklyDetails" element={<WeeklyDetailsPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/update-email" element={<UpdateEmailPage />} />
          <Route path="/iteration-data" element={<IterationDataPage />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/chart/category-details/:categoryId" element={<CategoryDetailsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
