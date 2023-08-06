import { useState } from 'react';
import './App.css';
import MainMint from './MainMint';
import NavBar from './NavBar';
import Footer from './footer';
import './styles.css';


function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div className='overlay'>
    <div className="App">
    <NavBar accounts={accounts} setAccounts={setAccounts} />
    <MainMint accounts={accounts} setAccounts={setAccounts} />
    </div>
    <Footer/>
    <div className='moving-background'></div>
  </div>);
}

export default App;
