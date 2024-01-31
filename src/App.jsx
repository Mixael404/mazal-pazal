import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Links from './components/Links/Links';
import Modal from './components/Modal/Modal';
import Posts from './components/Posts/Posts';
import AddProduct from './components/AddProduct/AddProduct';

function App() {

  const [data, setData] = useState([]);
  const [modal, useModal] = useState(false);
  const [listUpdate, setlistUpdate] = useState(false);

  // console.log("listUpdate ", listUpdate);

  useEffect(() => {
    async function getData() {
      const res = await fetch('http://back.ru/getPosts.php');
      const json = await res.json();
      setData(json);
      // console.log("Effect");
    }
    getData();
  }, [listUpdate])
  // console.log("Stor: ", data);
  return (
    <div className="App">
      <Header />
      <Links></Links>
      {!modal && <Posts data={data} buttonHandler={useModal} updateList={setlistUpdate}/>}
      {modal && <Modal updateList={setlistUpdate} closeHandler={useModal} />}
      {modal && <AddProduct />}
    </div>
  );
}

export default App;
