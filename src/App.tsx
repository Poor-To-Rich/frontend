import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SplashPage from '@/pages/SplashPage/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
      </Routes>
    </Router>
  );
}

export default App;
