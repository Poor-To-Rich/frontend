import './App.css';
import Calender from './components/calender/Calender';
import TransactionDetailItem from './components/detailItem/TransactionDetailItem';

function App() {
  return (
    <>
      <Calender />

      <TransactionDetailItem
        id={1}
        color={'#ff55ad'}
        category="식비"
        title={'상하이버거세트'}
        isIteration
        type="EXPENSE"
        cost={45626546888798978}
      />
    </>
  );
}

export default App;
