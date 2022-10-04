import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiOutlineHome,
  AiOutlineBook,
  AiOutlinePlus,
  AiOutlineArrowRight,
} from "react-icons/ai";
import "./Navbar.css";

const Navbar = () => {
  const [nav, setNav] = useState<boolean>(false);
  const handleHideNav = () => {
    setNav(false);
  };
  return (
    <nav className={nav ? "openNav" : "closeNav"}>
      {nav ? (
        <>
          <AiOutlineArrowLeft
            className="actionBtn"
            size={30}
            onClick={() => setNav(false)}
          />
          <h1>Task Managment APP</h1>
          <ul className="nav-list">
            <li>
              <Link to="/">
                <button className="nav-link" onClick={handleHideNav}>
                  <AiOutlineHome size={22} />
                  Inicio
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tasks">
                <button className="nav-link" onClick={handleHideNav}>
                  <AiOutlineBook size={22} />
                  Tareas
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create-task">
                <button className="nav-link" onClick={handleHideNav}>
                  <AiOutlinePlus size={22} />
                  Nueva Tarea
                </button>
              </Link>
            </li>
          </ul>
          <small>By JDev</small>
        </>
      ) : (
        <AiOutlineArrowRight
          size={30}
          className="actionBtn"
          onClick={() => setNav(true)}
        />
      )}
    </nav>
  );
};

export default Navbar;
