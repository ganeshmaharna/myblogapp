import React from "react";
import { Routes, Route } from "react-router-dom";
//Components Import
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import SearchForm from "./components/SearchForm";

const App = () => {
  const [closeNav, setCloseNav] = useState(false);
  const toggleNav = () => {
    setCloseNav(!closeNav);
  };
  const getWidth = () => (closeNav ? "w-16" : "w-56");

  return (
    <div className="flex">
      <div
        className={
          getWidth() +
          " min-h-screen bg-red-100 transition-width border border-r"
        }
      >
        <div className="sticky top-0">
          <Navbar closed={closeNav} />
        </div>
      </div>
      <div className="flex-1 min-h-screen bg-blue-400">
        <div className="sticky top-0">
          <div className="flex item-center p-2">
            <button onClick={toggleNav}>
              {closeNav ? (
                <AiOutlineMenuUnfold size={25} />
              ) : (
                <AiOutlineMenuFold size={25} />
              )}
            </button>
            {/* SearchForm Component call */}
            <SearchForm />
          </div>
        </div>
        <div className="max-w-screen-lg mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post/" element={<CreatePost />} />
            <Route path="/update-post/:slug" element={<UpdatePost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
