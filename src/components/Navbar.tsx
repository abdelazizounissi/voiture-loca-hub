
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, Car, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status from localStorage
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const storedUserType = localStorage.getItem("userType");
    const storedUserName = localStorage.getItem("userName");
    
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
      setUserType(storedUserType);
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserType(null);
    setUserName(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-black shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Car className="h-6 w-6 text-green-500" />
          <span className="font-bold text-xl text-white">CarFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-green-500 font-medium">
            Home
          </Link>
          <Link to="/vehicles" className="text-white hover:text-green-500 font-medium">
            Vehicles
          </Link>
          {userType === "agency" && (
            <Link to="/agency-dashboard" className="text-white hover:text-green-500 font-medium">
              Agency Dashboard
            </Link>
          )}
          <Link to="/about" className="text-white hover:text-green-500 font-medium">
            About Us
          </Link>
          <Link to="/contact" className="text-white hover:text-green-500 font-medium">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <div className="text-white flex items-center">
                <User size={18} className="mr-2" />
                <span>{userName || (userType === "agency" ? "Agency" : "User")}</span>
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-green-500 text-white hover:bg-green-500"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="flex items-center gap-2 border-green-500 text-white hover:bg-green-500">
                  <User size={18} />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-green-500 hover:bg-green-600 text-white">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white hover:text-green-500 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/vehicles" 
              className="text-white hover:text-green-500 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Vehicles
            </Link>
            {userType === "agency" && (
              <Link 
                to="/agency-dashboard" 
                className="text-white hover:text-green-500 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Agency Dashboard
              </Link>
            )}
            <Link 
              to="/about" 
              className="text-white hover:text-green-500 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-green-500 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-800">
              {isLoggedIn ? (
                <>
                  <div className="text-white flex items-center py-2">
                    <User size={18} className="mr-2" />
                    <span>{userName || (userType === "agency" ? "Agency" : "User")}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center border-green-500 text-white hover:bg-green-500"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-center border-green-500 text-white hover:bg-green-500">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full justify-center bg-green-500 hover:bg-green-600 text-white">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
