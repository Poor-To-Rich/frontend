import './App.css';
import PeriodReport from '@/components/summary/PeriodReport ';

function App() {
  return (
    <>
      <PeriodReport period="25.01~25.02" balance={456784654688617} />
    </>
  );
}

export default App;
