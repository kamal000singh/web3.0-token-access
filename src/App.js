import React from "react";


import Navbar from "./contracts/components/Navbar";
import { Route, Routes } from "react-router-dom";
import ReadContract from "./ReadContract";
import WriteContract from "./WriteContract";


const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<ReadContract />} />
        <Route path="/read-contract" element={<ReadContract />} />
        <Route path="/write-contract" element={<WriteContract />} />
      </Routes>
    </>
  );
}

export default App;
