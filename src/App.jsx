import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import Header from "./components/Header/Header";
import User from "./components/User/User";

const App = () => {
  return (
    <>
      <Header />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
