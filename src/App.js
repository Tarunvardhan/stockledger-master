import Routing from "./routing";
import TrnType from "../src/Components/TRNTYPE";
import React, { useEffect } from 'react';
import proxima360 from "../src/Assets/icons/proxima360.png";

function App() {
  // useEffect(() => {
  //   document.title = 'Proxima360';
  // },[]);
  TrnType()
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
