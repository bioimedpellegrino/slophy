import { useState } from 'react';
import './App.css';
import MainMint from './components/mainmint/MainMint';
import NavBar from './components/navbar/NavBar';


function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="overlay">
      <div className="App">
        <NavBar/>
        <MainMint accounts={accounts} setAccounts={setAccounts}/>
      </div>
      <div className="background"></div>
    </div>
  );
}

export default App;
