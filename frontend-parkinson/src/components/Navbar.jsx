import React, { useState, useEffect } from "react";
import { Brain, User, LogOut, Menu, X } from "lucide-react";

const Navbar = ({ isAuthenticated, userEmail, onLoginClick, onSignupClick, onLogout }) => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenu(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg"
          : "bg-white/90 backdrop-blur-md shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <div
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="text-white w-6 h-6" />
            </div>

            <span className="text-xl md:text-2xl font-bold text-[#1E293B]">
              NeuroPredict
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            <button onClick={() => scrollToSection("home")} className="navlink">
              Home
            </button>

            <button onClick={() => scrollToSection("how-it-works")} className="navlink">
              How It Works
            </button>

            <button onClick={() => scrollToSection("upload")} className="navlink">
              Upload
            </button>

            <button onClick={() => scrollToSection("about")} className="navlink">
              About
            </button>

            {/* <button onClick={() => scrollToSection("contact")} className="navlink">
              Contact
            </button> */}

            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-4 border-l">

                <button
                  onClick={onLoginClick}
                  className="flex items-center gap-2 text-primary hover:text-blue-700"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden lg:block">
                    {userEmail?.split("@")[0]}
                  </span>
                </button>

                <button
                  onClick={onLogout}
                  className="text-gray-600 hover:text-red-600"
                >
                  <LogOut />
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-3">

                {/* Login Button Commented */}
                {/*
                <button
                  onClick={onLoginClick}
                  className="border border-primary px-4 py-2 rounded-lg text-primary hover:bg-primary hover:text-white transition"
                >
                  Login
                </button>
                */}

                {/* Signup Button Commented */}
                {/*
                <button
                  onClick={onSignupClick}
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </button>
                */}

              </div>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenu && (

        <div className="md:hidden bg-white shadow-lg border-t">

          <div className="flex flex-col gap-4 p-6 text-lg">

            <button onClick={() => scrollToSection("home")}>Home</button>
            <button onClick={() => scrollToSection("how-it-works")}>How It Works</button>
            <button onClick={() => scrollToSection("upload")}>Upload</button>
            <button onClick={() => scrollToSection("about")}>About</button>
            {/* <button onClick={() => scrollToSection("contact")}>Contact</button> */}

            <div className="border-t pt-4">

              {isAuthenticated ? (

                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 text-red-600"
                >
                  <LogOut />
                  Logout
                </button>

              ) : (

                <div className="flex flex-col gap-3">

                  {/* Login Button Commented */}
                  {/*
                  <button
                    onClick={onLoginClick}
                    className="border border-primary text-primary py-2 rounded-lg"
                  >
                    Login
                  </button>
                  */}

                  {/* Signup Button Commented */}
                  {/*
                  <button
                    onClick={onSignupClick}
                    className="bg-primary text-white py-2 rounded-lg"
                  >
                    Sign Up
                  </button>
                  */}

                </div>

              )}

            </div>

          </div>

        </div>

      )}
    </nav>
  );
};

export default Navbar;