import React, { useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import HamburgerMenu from "./hamburger/HamburgerMenu.jsx";

const Home = () => {
  const navigate = useNavigate();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  const handleCreateClick = ()=>{
    navigate("/create");
  }
  const handleUpdateClick = ()=>{
    navigate("/update");
  }
  const handleReadClick = ()=>{
    navigate("/all");
  }

  // Toggle the hamburger menu
  const toggleHamburger = () => {
    setShowHamburgerMenu(!showHamburgerMenu);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar-parent">
        <div>
          <b>Mern App</b> 
        </div>

        {/* Menu Pages */}
        <div className="pages">
          <ul className="pages-ul">
            <li onClick={handleCreateClick} className="pages-ul-li group">
              Create<span className="pages-ul-li-underliningItems"></span>
            </li>
            <li onClick={handleReadClick} className="pages-ul-li group">
              Read
              <span className="pages-ul-li-underliningItems"></span>
            </li>
            <li onClick={handleUpdateClick} className="pages-ul-li group">
              Update<span className="pages-ul-li-underliningItems"></span>
            </li>
          </ul>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="hamburger">
          <button
            onClick={toggleHamburger}
            className="hamburger-button"
            aria-label="Toggle Menu"
          >
            <div className={`icon-wrapper ${showHamburgerMenu ? "open" : ""}`}>
              {!showHamburgerMenu ? (
                <GiHamburgerMenu className="hamburger-icon" />
              ) : (
                <AiOutlineClose className="close-icon" />
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Hamburger Menu */}
      {showHamburgerMenu && (
        <div className="hamburger-menu open">
          <HamburgerMenu />
        </div>
      )}
    </div>
  );
};

export default Home;
