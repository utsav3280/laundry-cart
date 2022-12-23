import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Left from "../LeftPart/Left";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Style/Style.css";
import Login from "../LogIn/Login";
import SignUp from "../SignUp/SignUp";
function Main() {
  const [page, setPage] = useState(true);

  const signin = () => {
    setPage(false);
  };
  const register = () => {
    setPage(true);
  };

  return (
    <div>
      <Header />
      <main id={page ? "main-part" : "main-part2"}>
        <section id="one">
          <Left page={page} signin={signin} register={register} />
        </section>
        <section id="two">{page ? <Login /> : <SignUp />}</section>
      </main>
      <Footer />
    </div>
  );
}

export default Main;
