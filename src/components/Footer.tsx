
import { Link } from "react-router-dom";
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-green-500 p-1 rounded-full">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-semibold">CarFlow</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your premium car rental service in Tunisia. We provide high-quality vehicles for your perfect journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-green-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-gray-300 hover:text-green-500 transition-colors">Vehicles</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-green-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-green-500 transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-green-500 transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          
          {/* Vehicle Categories */}
          <div>
            <h3 className="text-lg font-medium mb-4">Vehicle Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vehicles?type=SUV" className="text-gray-300 hover:text-green-500 transition-colors">SUVs</Link>
              </li>
              <li>
                <Link to="/vehicles?type=Sedan" className="text-gray-300 hover:text-green-500 transition-colors">Sedans</Link>
              </li>
              <li>
                <Link to="/vehicles?type=Convertible" className="text-gray-300 hover:text-green-500 transition-colors">Convertibles</Link>
              </li>
              <li>
                <Link to="/vehicles?type=Sports" className="text-gray-300 hover:text-green-500 transition-colors">Sports Cars</Link>
              </li>
              <li>
                <Link to="/vehicles?type=Minivan" className="text-gray-300 hover:text-green-500 transition-colors">Minivans</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">123 Avenue Habib Bourguiba, Tunis, Tunisia</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-500" />
                <span className="text-gray-300">+216 71 234 567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-green-500" />
                <span className="text-gray-300">info@carflow.tn</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} CarFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
