
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Car className="h-6 w-6 text-brand-blue" />
          <span className="font-bold text-xl text-brand-blue">VoitureLocaHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-brand-blue font-medium">
            Home
          </Link>
          <Link to="/vehicles" className="text-gray-700 hover:text-brand-blue font-medium">
            Vehicles
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-brand-blue font-medium">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-brand-blue font-medium">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="flex items-center gap-2">
              <User size={18} />
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-brand-blue hover:bg-brand-blue-light">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-brand-blue font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/vehicles" 
              className="text-gray-700 hover:text-brand-blue font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Vehicles
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-brand-blue font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-brand-blue font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t">
              <Link to="/login">
                <Button variant="outline" className="w-full justify-center">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full justify-center bg-brand-blue hover:bg-brand-blue-light">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
