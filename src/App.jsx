import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Links from './components/Links/Links';
import Modal from './components/Modal/Modal';
import Posts from './components/Posts/Posts';

function App() {

  const [modal, useModal] = useState(false);

  return (
    <div className="App">
      <Header />
      <Links></Links>
      <Posts buttonHandler={useModal}></Posts>
      {modal && <Modal closeHandler={useModal} />}
    </div>
  );
}

export default App;
