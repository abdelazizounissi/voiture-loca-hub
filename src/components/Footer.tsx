
import { Link } from "react-router-dom";
import { Car, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-6 w-6" />
              <span className="font-bold text-xl">VoitureLocaHub</span>
            </div>
            <p className="text-gray-400 mb-4">
              The premier car rental platform in Tunisia, connecting customers with reliable vehicle rental options.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-gray-400 hover:text-white transition-colors">Vehicles</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          
          {/* Vehicle Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Vehicle Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vehicles?type=sedan" className="text-gray-400 hover:text-white transition-colors">Sedans</Link>
              </li>
              <li>
                <Link to="/vehicles?type=suv" className="text-gray-400 hover:text-white transition-colors">SUVs</Link>
              </li>
              <li>
                <Link to="/vehicles?type=hatchback" className="text-gray-400 hover:text-white transition-colors">Hatchbacks</Link>
              </li>
              <li>
                <Link to="/vehicles?type=convertible" className="text-gray-400 hover:text-white transition-colors">Convertibles</Link>
              </li>
              <li>
                <Link to="/vehicles?type=luxury" className="text-gray-400 hover:text-white transition-colors">Luxury Cars</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">123 Rue de Carthage, Tunis, Tunisia</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400">+216 71 234 567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400">contact@voiturelochub.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} VoitureLocaHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
