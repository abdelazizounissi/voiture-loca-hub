
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Menu, X, User, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check login status on mount and when localStorage changes
    const checkLoginStatus = () => {
      const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedInStatus);
      setUserName(localStorage.getItem("userName") || "");
      setUserType(localStorage.getItem("userType") || null);
    };
    
    checkLoginStatus();
    
    // Add event listener for storage changes (in case user logs in/out in another tab)
    window.addEventListener("storage", checkLoginStatus);
    
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userLastName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userAddress");
    
    // Update state
    setIsLoggedIn(false);
    setUserName("");
    setUserType(null);
    
    // Show toast message
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // Navigate to home page
    navigate("/");
  };
  
  return (
    <nav className="bg-black text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-green-500 p-1 rounded-full">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-semibold">CarFlow</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-green-500 transition-colors">Home</Link>
            <Link to="/vehicles" className="hover:text-green-500 transition-colors">Vehicles</Link>
            <Link to="/about" className="hover:text-green-500 transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-green-500 transition-colors">Contact</Link>
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                  <User className="h-4 w-4" />
                  <span>{userName}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[200px]">
                  {userType === "agency" ? (
                    <DropdownMenuItem onClick={() => navigate("/agency-dashboard")}>
                      Agency Dashboard
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => navigate("/client-profile")}>
                      My Profile
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-green-500 hover:bg-transparent"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black pb-4 px-4">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="hover:text-green-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/vehicles" 
              className="hover:text-green-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Vehicles
            </Link>
            <Link 
              to="/about" 
              className="hover:text-green-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="hover:text-green-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isLoggedIn ? (
              <>
                {userType === "agency" ? (
                  <Link 
                    to="/agency-dashboard" 
                    className="hover:text-green-500 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Agency Dashboard
                  </Link>
                ) : (
                  <Link 
                    to="/client-profile" 
                    className="hover:text-green-500 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                )}
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-red-500 text-left hover:text-red-400 transition-colors py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Button 
                  variant="ghost" 
                  className="justify-start pl-0 text-white hover:text-green-500 hover:bg-transparent"
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
