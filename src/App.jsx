import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Links from './components/Links/Links';
import Modal from './components/Modal/Modal';
import Posts from './components/Posts/Posts';
import AddProduct from './components/AddProduct/AddProduct';

function App() {

  const [modal, useModal] = useState(false);
  const [data, setData] = useState([]);

  return (
    <div className="App">
      <Header />
      <Links />
      <Posts data={data} changeData={setData} buttonHandler={useModal} />
      {modal && <Modal closeHandler={useModal} />}
      {modal && <AddProduct />}
    </div>
  );
}

export default App;
