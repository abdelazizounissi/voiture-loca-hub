
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, LogOut, User, Car } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const { isMobile } = useMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const storedUserType = localStorage.getItem("userType");
    const storedUserName = localStorage.getItem("userName");
    
    setIsLoggedIn(loggedInStatus === "true");
    setUserType(storedUserType);
    setUserName(storedUserName);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("userType");
    
    setIsLoggedIn(false);
    setUserType(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600">
          CarFlow
        </Link>

        {isMobile ? (
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </Button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/vehicles"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Vehicles
                  </Link>
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  
                  {isLoggedIn ? (
                    <>
                      {userType === 'agency' && (
                        <Link
                          to="/agency-dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          Agency Dashboard
                        </Link>
                      )}
                      
                      {userType === 'customer' && (
                        <Link
                          to="/client-profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          My Profile
                        </Link>
                      )}
                      
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/vehicles" className="text-gray-700 hover:text-gray-900">
                Vehicles
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900">
                Contact
              </Link>
            </div>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {userName || "User"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {userType === 'agency' && (
                    <DropdownMenuItem onClick={() => navigate("/agency-dashboard")}>
                      <Car className="mr-2 h-4 w-4" />
                      Agency Dashboard
                    </DropdownMenuItem>
                  )}
                  
                  {userType === 'customer' && (
                    <DropdownMenuItem onClick={() => navigate("/client-profile")}>
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-50"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
