
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, Award, Clock } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">About CarFlow</h1>
              <p className="text-gray-600 text-lg">
                Connecting you with the perfect vehicle for every journey.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                CarFlow was established in 2023 with a simple mission: to make car rental in Tunisia accessible, 
                transparent, and hassle-free. What started as a small operation has quickly grown into the 
                country's most reliable platform for vehicle rentals.
              </p>
              <p className="text-gray-700 mb-4">
                Our team recognized the challenges that customers faced when trying to rent vehicles - from 
                hidden fees to complicated booking processes and limited vehicle options. We set out to create 
                a solution that would address these pain points and deliver an exceptional rental experience.
              </p>
              <p className="text-gray-700">
                Today, CarFlow partners with trusted rental agencies across Tunisia to offer a wide selection 
                of vehicles for every need and budget. Our platform empowers customers to make informed decisions 
                and enjoy peace of mind with every reservation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Our Mission</h3>
                  </div>
                  <p className="text-gray-700">
                    To transform the vehicle rental industry by providing a user-friendly platform that connects 
                    customers with reliable rental options, ensuring satisfaction and convenience with every booking.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Our Values</h3>
                  </div>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Transparency in pricing and services</li>
                    <li>• Commitment to customer satisfaction</li>
                    <li>• Quality and safety of vehicles</li>
                    <li>• Innovation in service delivery</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Why Choose CarFlow?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex">
                  <div className="mr-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
                    <p className="text-gray-700">
                      We partner only with reputable rental agencies who maintain their vehicles to the highest 
                      standards, ensuring your safety and comfort.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Convenient Booking</h3>
                    <p className="text-gray-700">
                      Our streamlined reservation process takes just minutes, with real-time availability and 
                      instant confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Join the CarFlow Community</h2>
              <p className="text-gray-700 mb-6">
                Whether you're a customer looking for your next rental or an agency interested in partnering 
                with us, we'd love to hear from you.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="/contact" className="text-green-600 font-medium hover:underline">Contact Us</a>
                <a href="/signup" className="text-green-600 font-medium hover:underline">Sign Up</a>
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
