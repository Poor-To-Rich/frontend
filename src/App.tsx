import './App.css';

import TransactionDetailItem from './components/detailItem/TransactionDetailItem';

function App() {
  return (
    <>
      <TransactionDetailItem
        id={1}
        color={'#ff55ad'}
        category="식비"
        title={'상하이버거세트'}
        isIteration
        type="EXPENSE"
        cost={45678}
      />
    </>
  );
}

export default App;
