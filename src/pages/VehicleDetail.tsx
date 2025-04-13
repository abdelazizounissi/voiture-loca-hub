
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { vehicles } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Users, 
  Fuel, 
  Cog, 
  Calendar as CalendarIcon, 
  Check, 
  Star, 
  MapPin, 
  ShieldCheck 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const vehicle = vehicles.find(v => v.id === id);
  const { toast } = useToast();
  
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [days, setDays] = useState(1);
  
  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setEndDate(undefined);
    }
    calculateDays(date, endDate);
  };
  
  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    calculateDays(startDate, date);
  };
  
  const calculateDays = (start: Date | undefined, end: Date | undefined) => {
    if (start && end) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays === 0 ? 1 : diffDays);
    }
  };
  
  const handleReservation = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Please select dates",
        description: "Both pickup and return dates are required",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Reservation initiated",
      description: "Please log in or create an account to complete your reservation.",
    });
    
    // In a real app, we would redirect to login if not logged in
    // or process the reservation if already logged in
  };
  
  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
            <p className="mb-6">The vehicle you are looking for does not exist.</p>
            <Link to="/vehicles">
              <Button>Browse All Vehicles</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link to="/vehicles" className="inline-flex items-center text-brand-blue hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Vehicles
            </Link>
          </div>
          
          {/* Vehicle Main Info */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="md:flex">
              {/* Vehicle Image */}
              <div className="md:w-2/3">
                <div className="relative h-64 md:h-full">
                  <img 
                    src={vehicle.image} 
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Vehicle Info */}
              <div className="md:w-1/3 p-6">
                <div className="mb-4">
                  <h1 className="text-3xl font-bold">{vehicle.brand} {vehicle.model}</h1>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(Math.floor(vehicle.rating))].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" />
                      ))}
                      {vehicle.rating % 1 !== 0 && (
                        <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                      )}
                      {[...Array(5 - Math.ceil(vehicle.rating))].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gray-300" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">({vehicle.rating})</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{vehicle.location}</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">{vehicle.seats} Seats</span>
                    </div>
                    <div className="flex items-center">
                      <Fuel className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">{vehicle.fuel}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <Cog className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">{vehicle.year}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-brand-blue">${vehicle.pricePerDay}</div>
                  <div className="text-gray-600">per day</div>
                </div>
                
                <div>
                  <Button 
                    className="w-full bg-brand-orange hover:bg-orange-500"
                    onClick={() => window.scrollTo({
                      top: document.getElementById('booking-section')?.offsetTop,
                      behavior: 'smooth'
                    })}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vehicle Details Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs defaultValue="description">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="pt-4">
                    <h3 className="text-xl font-semibold mb-3">About this vehicle</h3>
                    <p className="text-gray-700 mb-4">{vehicle.description}</p>
                    
                    <h4 className="font-semibold mb-2">Specifications</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span>Type: {vehicle.type}</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span>Year: {vehicle.year}</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span>Seats: {vehicle.seats}</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span>Transmission: {vehicle.transmission}</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span>Fuel Type: {vehicle.fuel}</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span>Location: {vehicle.location}</span>
                      </li>
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="features" className="pt-4">
                    <h3 className="text-xl font-semibold mb-3">Vehicle Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {vehicle.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="pt-4">
                    <h3 className="text-xl font-semibold mb-3">Customer Reviews</h3>
                    
                    {/* Placeholder reviews - in a real app, these would come from a database */}
                    <div className="space-y-6">
                      <div className="border-b pb-4">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden mr-3">
                            <img 
                              src="https://randomuser.me/api/portraits/men/42.jpg" 
                              alt="Reviewer" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">Mohamed Trabelsi</div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">
                          Great car, very clean and fuel efficient. The pickup process was quick and easy.
                        </p>
                      </div>
                      
                      <div className="border-b pb-4">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden mr-3">
                            <img 
                              src="https://randomuser.me/api/portraits/women/22.jpg" 
                              alt="Reviewer" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">Amina Khalil</div>
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                              ))}
                              <Star className="w-4 h-4 text-gray-300" />
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">
                          The car was in good condition but took a bit longer than expected at pickup. Otherwise a good experience.
                        </p>
                      </div>
                      
                      <div>
                        <Link to="#" className="text-brand-blue hover:underline">
                          View all reviews
                        </Link>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Booking Section */}
            <div id="booking-section">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4">Book This Vehicle</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Pickup Date</label>
                  <Calendar 
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateChange}
                    disabled={(date) => date < new Date()}
                    className="border rounded-md p-3"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Return Date</label>
                  <Calendar 
                    mode="single"
                    selected={endDate}
                    onSelect={handleEndDateChange}
                    disabled={(date) => 
                      date < new Date() || 
                      (startDate ? date < startDate : false)
                    }
                    className="border rounded-md p-3"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Number of Days</label>
                  <Input 
                    type="number" 
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                    min={1}
                    className="w-full"
                  />
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between mb-2">
                  <span>Price per day:</span>
                  <span>${vehicle.pricePerDay}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Number of days:</span>
                  <span>{days}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total:</span>
                  <span>${vehicle.pricePerDay * days}</span>
                </div>
                
                <Button 
                  className="w-full bg-brand-orange hover:bg-orange-500"
                  onClick={handleReservation}
                >
                  Reserve Now
                </Button>
                
                <div className="mt-4 text-sm text-gray-600 flex items-start">
                  <ShieldCheck className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                  <span>Free cancellation up to 24 hours before pickup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VehicleDetail;
