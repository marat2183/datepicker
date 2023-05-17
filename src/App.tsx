import React from 'react';
import DatePicker from './components/DatePicker';
import './App.scss';

function App() {
  return (
    <div className="App">
      <DatePicker isSelectionRange={false}/>
    </div>
  );
}

export default App;
