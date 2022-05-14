import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CryptoList from './CryptoList';
import GetParam from './GetParam';

const Main = () => {
  return (
    <Routes>
      <Route exact path='/' element={<CryptoList/>}></Route>
      <Route path='/info/:coinid' element={<GetParam/>}></Route>
    </Routes>
  );
}

export default Main;