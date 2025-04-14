
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Car, Users, Award, ThumbsUp, Clock, Shield } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-black text-white py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About CarFlow</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              The premium car rental service in Tunisia, providing high-quality vehicles and exceptional customer service.
            </p>
          </div>
        </div>
        
        {/* Our Story */}
        <div className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
              
              <div className="space-y-6 text-gray-700">
                <p>
                  Founded in 2010, CarFlow began with a simple mission: to revolutionize the car rental experience in Tunisia. What started as a small fleet of just five vehicles has grown into one of the country's most trusted rental services.
                </p>
                
                <p>
                  Our founder, Ahmed Ben Ali, recognized a gap in the market for a rental service that combined quality vehicles with exceptional customer care. After years of experience in the automotive industry, he assembled a team of dedicated professionals who shared his vision.
                </p>
                
                <p>
                  Today, CarFlow operates across Tunisia with a diverse fleet of over 200 vehicles. We continue to innovate and improve our services, always putting our customers' needs first.
                </p>
                
                <p>
                  Whether you're a tourist exploring the beautiful landscapes of Tunisia, a business traveler needing reliable transportation, or a local resident requiring a temporary vehicle, CarFlow is committed to exceeding your expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us */}
        <div className="py-16 px-4 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose CarFlow</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality Vehicles</h3>
                <p className="text-gray-600">
                  Our fleet consists of well-maintained, recent models from trusted brands, ensuring comfort and reliability.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Exceptional Service</h3>
                <p className="text-gray-600">
                  Our dedicated customer service team is available to assist you every step of the way.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Competitive Prices</h3>
                <p className="text-gray-600">
                  We offer transparent pricing with no hidden fees, providing great value for the quality we deliver.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexible Rental Periods</h3>
                <p className="text-gray-600">
                  From short day trips to extended rentals, we accommodate your specific timeframe needs.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Safety First</h3>
                <p className="text-gray-600">
                  All our vehicles undergo regular safety inspections and are fully insured for your peace of mind.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
                <p className="text-gray-600">
                  Our team provides local insights and recommendations to enhance your journey through Tunisia.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Team */}
        <div className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Ahmed Ben Ali" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Ahmed Ben Ali</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Leila Mansour" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Leila Mansour</h3>
                <p className="text-gray-600">Chief Operations Officer</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/men/67.jpg" 
                    alt="Karim Jouini" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Karim Jouini</h3>
                <p className="text-gray-600">Fleet Manager</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
