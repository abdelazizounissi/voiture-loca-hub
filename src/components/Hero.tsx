
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')",
          backgroundPosition: "center 40%"
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Find Your Perfect Rental Car
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Reliable vehicles at competitive prices across Tunisia
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <Link to="/vehicles">
              <Button size="lg" className="bg-brand-blue hover:bg-brand-blue-light text-white font-medium px-8">
                Browse All Vehicles
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Create Account
              </Button>
            </Link>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
