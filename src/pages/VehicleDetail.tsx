import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Vehicle } from "@/types/Vehicle";
import { vehicles } from "@/data/vehicles";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
  const [dateRange, setDateRange] = useState<{ from?: Date, to?: Date }>({
    from: undefined,
    to: undefined,
  });
  
  useEffect(() => {
    const foundVehicle = vehicles.find((v) => v.id === id);
    if (foundVehicle) {
      setVehicle(foundVehicle);
    } else {
      toast({
        title: "Vehicle not found",
        description: "The requested vehicle could not be found",
        variant: "destructive",
      });
      navigate("/vehicles");
    }
  }, [id, navigate, toast]);

const handleReservation = () => {
  // Check if user is logged in
  if (localStorage.getItem("isLoggedIn") !== "true") {
    toast({
      title: "Login required",
      description: "Please log in to make a reservation",
      variant: "destructive"
    });
    navigate("/login");
    return;
  }
  
  if (!dateRange.from || !dateRange.to) {
    toast({
      title: "Select dates",
      description: "Please select both pickup and return dates",
      variant: "destructive"
    });
    return;
  }
  
  // Calculate number of days
  const from = dateRange.from;
  const to = dateRange.to;
  const diffTime = Math.abs(to.getTime() - from.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Calculate total price
  const price = vehicle!.pricePerDay * diffDays;
  
  // Generate a reservation ID
  const reservationId = `res-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
  // Create reservation object
  const reservation = {
    id: reservationId,
    vehicleId: vehicle!.id,
    vehicleName: `${vehicle!.brand} ${vehicle!.model}`,
    pricePerDay: vehicle!.pricePerDay,
    startDate: from.toISOString(),
    endDate: to.toISOString(),
    totalPrice: price,
    status: "pending",
    userId: localStorage.getItem("userId") || "user-1",
    userName: localStorage.getItem("userName") || "User"
  };
  
  // In a real app, we would send this to a backend
  // For demo purposes, we'll store it in localStorage
  const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  reservations.push(reservation);
  localStorage.setItem("reservations", JSON.stringify(reservations));
  
  toast({
    title: "Reservation confirmed",
    description: `Your ${vehicle!.brand} ${vehicle!.model} has been reserved for ${diffDays} days`
  });
  
  // Reset form and navigate to user profile
  setDateRange({ from: undefined, to: undefined });
  navigate("/client-profile");
};
  
  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Vehicle not found</h3>
              <p className="text-gray-600">
                Sorry, the vehicle you're looking for could not be found.
              </p>
              <Button onClick={() => navigate("/vehicles")}>
                Back to Vehicles
              </Button>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vehicle Image */}
            <div className="md:order-2">
              <img
                src={vehicle.image}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full rounded-lg shadow-md"
              />
            </div>
            
            {/* Vehicle Details */}
            <div className="md:order-1">
              <h1 className="text-3xl font-bold mb-2">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="text-gray-600 mb-4">{vehicle.location}</p>
              
              <div className="text-3xl font-bold text-green-600 mb-2">
  {vehicle.pricePerDay} TND <span className="text-sm text-gray-500 font-normal">/ day</span>
</div>
              
              <p className="text-gray-700 mb-6">{vehicle.description}</p>
              
              <h2 className="text-xl font-semibold mb-2">Vehicle Details</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="font-medium">Type:</span> {vehicle.type}
                </div>
                <div>
                  <span className="font-medium">Year:</span> {vehicle.year}
                </div>
                <div>
                  <span className="font-medium">Seats:</span> {vehicle.seats}
                </div>
                <div>
                  <span className="font-medium">Fuel:</span> {vehicle.fuel}
                </div>
                <div>
                  <span className="font-medium">Transmission:</span> {vehicle.transmission}
                </div>
                <div>
                  <span className="font-medium">Rating:</span> {vehicle.rating}
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                {vehicle.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              
              <h2 className="text-xl font-semibold mb-2">Availability</h2>
              <p className={`font-medium ${vehicle.available ? 'text-green-600' : 'text-red-600'}`}>
                {vehicle.available ? 'Available for rent' : 'Currently unavailable'}
              </p>
              
              {/* Date Range Picker */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Select Dates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pick-up Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={
                            "w-full justify-start text-left font-normal" +
                            (dateRange.from ? "" : " text-muted-foreground")
                          }
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            format(dateRange.from, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={
                            "w-full justify-start text-left font-normal" +
                            (dateRange.to ? "" : " text-muted-foreground")
                          }
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? (
                            format(dateRange.to, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                          disabled={(date) => dateRange.from ? date <= dateRange.from : date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={handleReservation}
              >
                Rent Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VehicleDetail;
