
import Hero from "@/components/Hero";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarRange, Shield, ThumbsUp, Award } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <FeaturedVehicles />
        
        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose VoitureLocaHub?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer a seamless car rental experience with a wide selection of vehicles and exceptional customer service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Benefit 1 */}
              <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-brand-blue mb-4">
                  <CalendarRange className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Rentals</h3>
                <p className="text-gray-600">
                  Choose from daily, weekly, or monthly rental options to fit your schedule.
                </p>
              </div>
              
              {/* Benefit 2 */}
              <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-brand-blue mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Safety First</h3>
                <p className="text-gray-600">
                  All our vehicles undergo rigorous safety inspections before each rental.
                </p>
              </div>
              
              {/* Benefit 3 */}
              <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-brand-blue mb-4">
                  <ThumbsUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                <p className="text-gray-600">
                  Our streamlined booking process takes just minutes, with instant confirmation.
                </p>
              </div>
              
              {/* Benefit 4 */}
              <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-brand-blue mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
                <p className="text-gray-600">
                  We partner with trusted agencies who maintain their vehicles to high standards.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from satisfied customers who have used our platform for their car rental needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Ahmed Bejaoui</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill="currentColor" className="w-4 h-4 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I used VoitureLocaHub for my family trip to Sousse and was impressed with how easy it was to find the perfect car. The booking process was seamless!"
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Leila Mansour</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill="currentColor" className="w-4 h-4 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The variety of vehicles available is impressive. I needed a specific type of car for my business trip, and they had exactly what I was looking for."
                </p>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                    <img 
                      src="https://randomuser.me/api/portraits/men/76.jpg" 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Karim Zouari</h4>
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} fill="currentColor" className="w-4 h-4 text-yellow-500" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Great service overall. The car was in excellent condition and the pickup process was quick. Will definitely use VoitureLocaHub again!"
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Need to import Star separately to avoid conflict with lucide-react imports above
import { Star } from "lucide-react";

export default Index;
