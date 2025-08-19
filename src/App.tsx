import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '@/components/route/ProtectedRoute';
import RedirectIfLoggedInRoute from '@/components/route/RedirectIfLoggedInRoute';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import ChatSocketProvider from './providers/ChatSocketProvider';

const IDLoginPage = lazy(() => import('@/pages/IDLoginPage/IDLoginPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage/SignupPage'));
const MainPage = lazy(() => import('@/pages/MainPage/MainPage'));
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage/CategoriesPage'));
const AddEditCategoryPage = lazy(() => import('@/pages/AddEditCategoryPage/AddEditCategoryPage'));
const MonthWeekPage = lazy(() => import('@/pages/MonthWeekPage/MonthWeekPage'));
const WeeklyDetailsPage = lazy(() => import('@/pages/WeeklyDetailsPage/WeeklyDetailsPage'));
const SettingPage = lazy(() => import('@/pages/SettingPage/SettingPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage/ProfilePage'));
const UpdatePasswordPage = lazy(() => import('@/pages/UpdatePasswordPage/UpdatePasswordPage'));
const UpdateEmailPage = lazy(() => import('@/pages/UpdateEmailPage/UpdateEmailPage'));
const IterationDataPage = lazy(() => import('@/pages/IterationDataPage/IterationDataPage'));
const ChartPage = lazy(() => import('@/pages/ChartPage/ChartPage'));
const CategoryDetailsPage = lazy(() => import('@/pages/CategoryDetailsPage/CategoryDetailsPage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage/ErrorPage'));
const AddTransactionPage = lazy(() => import('@/pages/AddTransactionPage/AddTransactionPage'));
const EditTransactionPage = lazy(() => import('@/pages/EditTransactionPage/EditTransactionPage'));
const FindUsernamePage = lazy(() => import('@/pages/FindUsernamePage/FindUsernamePage'));
const FindPasswordPage = lazy(() => import('@/pages/FindPasswordPage/FindPasswordPage'));
const LoginChoicePage = lazy(() => import('@/pages/LoginChoicePage/LoginChoicePage'));
const ProfileOnboardingPage = lazy(() => import('@/pages/ProfileOnboardingPage/ProfileOnboardingPage'));
const ChatLobbyPage = lazy(() => import('@/pages/ChatLobbyPage/ChatLobbyPage'));
const EditJoinedChatroomsPage = lazy(() => import('@/pages/EditJoinedChatroomsPage/EditJoinedChatroomsPage'));
const SearchChatroomsPage = lazy(() => import('@/pages/SearchChatroomsPage/SearchChatroomsPage'));
const HostedChatroomsPage = lazy(() => import('@/pages/HostedChatroomsPage/HostedChatroomsPage'));
const AddChatroomPage = lazy(() => import('@/pages/AddChatroomPage/AddChatroomPage'));
const EditChatroomPage = lazy(() => import('@/pages/EditChatroomPage/EditChatroomPage'));
const ChatroomCoverPage = lazy(() => import('@/pages/ChatroomCoverPage/ChatroomCoverPage'));
const ChatroomPage = lazy(() => import('@/pages/ChatroomPage/ChatroomPage'));
const ChatroomDetailPage = lazy(() => import('@/pages/ChatroomDetailPage/ChatroomDetailPage'));
const ChatroomHostDelegatePage = lazy(() => import('@/pages/ChatroomHostDelegatePage/ChatroomHostDelegatePage'));
const NoticeListPage = lazy(() => import('@/pages/NoticeListPage/NoticeListPage'));
const AddEditNoticePage = lazy(() => import(`@/pages/AddEditNoticePage/AddEditNoticePage`));
const NoticeDetailPage = lazy(() => import('@/pages/NoticeDetailPage/NoticeDetailPage'));

function App() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex justify-center items-center">
          <LoadingSpinner size={30} />
        </div>
      }>
      <Routes>
        <Route element={<RedirectIfLoggedInRoute />}>
          <Route path="/login" element={<LoginChoicePage />} />
          <Route path="/login/id" element={<IDLoginPage />} />
          <Route path="/login/find-id" element={<FindUsernamePage />} />
          <Route path="/login/find-password" element={<FindPasswordPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/onboarding/profile" element={<ProfileOnboardingPage />} />
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
          <Route path="/chat/edit" element={<EditJoinedChatroomsPage />} />
          <Route path="/chat/search" element={<SearchChatroomsPage />} />
          <Route path="/chat/hosted" element={<HostedChatroomsPage />} />
          <Route path="/chat/chatroom/add" element={<AddChatroomPage />} />
          <Route path="/chat/chatroom/edit/:chatroomId" element={<EditChatroomPage />} />
          <Route path="/chat/chatroom/cover/:chatroomId" element={<ChatroomCoverPage />} />
          <Route path="/chat/chatroom/detail/:chatroomId" element={<ChatroomDetailPage />} />
          <Route path="/chat/chatroom/host/delegate/:chatroomId" element={<ChatroomHostDelegatePage />} />
          <Route path="/chat/chatroom/:chatroomId/notices" element={<NoticeListPage />} />
          <Route path="/chat/chatroom/:chatroomId/notices/:noticeId" element={<NoticeDetailPage />} />
          <Route
            element={
              <ChatSocketProvider>
                <Outlet />
              </ChatSocketProvider>
            }>
            <Route path="/chat" element={<ChatLobbyPage />} />
            <Route path="/chat/chatroom/:chatroomId" element={<ChatroomPage />} />
            <Route path="/chat/chatroom/:chatroomId/notices/add" element={<AddEditNoticePage />} />
            <Route path="/chat/chatroom/:chatroomId/notices/:noticeId/edit" element={<AddEditNoticePage />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
