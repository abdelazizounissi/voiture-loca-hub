
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckSquare } from "lucide-react";
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
  const [extras, setExtras] = useState({
    insurance: false,
    childSeat: false,
    gps: false,
    additionalDriver: false,
  });
  const [extrasCost, setExtrasCost] = useState(0);
  
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

  // Calculate extras cost whenever extras selection changes
  useEffect(() => {
    let cost = 0;
    if (extras.insurance) cost += 25;
    if (extras.childSeat) cost += 15;
    if (extras.gps) cost += 10;
    if (extras.additionalDriver) cost += 30;
    setExtrasCost(cost);
  }, [extras]);

  const handleExtraChange = (extra: keyof typeof extras) => {
    setExtras(prev => ({
      ...prev,
      [extra]: !prev[extra]
    }));
  };

const handleReservation = () => {
  // Check if user is logged in and has complete profile
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userPhone = localStorage.getItem("userPhone");
  const userAddress = localStorage.getItem("userAddress");
  
  if (!isLoggedIn) {
    toast({
      title: "Login required",
      description: "Please log in to make a reservation",
      variant: "destructive"
    });
    navigate("/login");
    return;
  }
  
  if (!userPhone || !userAddress) {
    toast({
      title: "Complete profile required",
      description: "Please update your profile with phone and address before making a reservation",
      variant: "destructive"
    });
    navigate("/client-profile");
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
  
  // Calculate total price including extras
  const rentalPrice = vehicle!.pricePerDay * diffDays;
  const totalExtras = extrasCost * diffDays;
  const totalPrice = rentalPrice + totalExtras;
  
  // Generate a reservation ID
  const reservationId = `res-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
  // Create reservation object with complete customer info
  const reservation = {
    id: reservationId,
    vehicleId: vehicle!.id,
    vehicleName: `${vehicle!.brand} ${vehicle!.model}`,
    pricePerDay: vehicle!.pricePerDay,
    startDate: from.toISOString(),
    endDate: to.toISOString(),
    rentalDays: diffDays,
    rentalPrice: rentalPrice,
    extraOptions: Object.entries(extras)
      .filter(([_, selected]) => selected)
      .map(([name, _]) => name),
    extrasPrice: totalExtras,
    totalPrice: totalPrice,
    status: "pending",
    userId: localStorage.getItem("userId") || "user-1",
    userName: localStorage.getItem("userName") || "User",
    userLastName: localStorage.getItem("userLastName") || "",
    userEmail: localStorage.getItem("userEmail") || "",
    userPhone: localStorage.getItem("userPhone") || "",
    userAddress: localStorage.getItem("userAddress") || ""
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
  
  // Calculate rental price if dates are selected
  const calculateRentalPrice = () => {
    if (!dateRange.from || !dateRange.to) return 0;
    
    const from = dateRange.from;
    const to = dateRange.to;
    const diffTime = Math.abs(to.getTime() - from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return vehicle.pricePerDay * diffDays;
  };
  
  const rentalPrice = calculateRentalPrice();
  const extrasTotal = dateRange.from && dateRange.to 
    ? extrasCost * Math.ceil(Math.abs(dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  
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
              <div className="mb-6 mt-6 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-4">Select Rental Period</h2>
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
              
              {/* Add Extra Options */}
              <div className="mb-6 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-4">Extra Options</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="insurance" 
                      checked={extras.insurance}
                      onCheckedChange={() => handleExtraChange('insurance')}
                    />
                    <label htmlFor="insurance" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full">
                      <span>Full Insurance Coverage</span>
                      <span className="font-semibold">25 TND/day</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="childSeat" 
                      checked={extras.childSeat}
                      onCheckedChange={() => handleExtraChange('childSeat')}
                    />
                    <label htmlFor="childSeat" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full">
                      <span>Child Seat</span>
                      <span className="font-semibold">15 TND/day</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="gps" 
                      checked={extras.gps}
                      onCheckedChange={() => handleExtraChange('gps')}
                    />
                    <label htmlFor="gps" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full">
                      <span>GPS Navigation</span>
                      <span className="font-semibold">10 TND/day</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="additionalDriver" 
                      checked={extras.additionalDriver}
                      onCheckedChange={() => handleExtraChange('additionalDriver')}
                    />
                    <label htmlFor="additionalDriver" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full">
                      <span>Additional Driver</span>
                      <span className="font-semibold">30 TND/day</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Pricing Summary */}
              {dateRange.from && dateRange.to && (
                <div className="mb-6 border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-semibold mb-4">Pricing Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Vehicle Rental:</span>
                      <span>{rentalPrice} TND</span>
                    </div>
                    {extras.insurance && (
                      <div className="flex justify-between text-sm">
                        <span>Full Insurance Coverage:</span>
                        <span>25 TND x {(rentalPrice / vehicle.pricePerDay).toFixed(0)} days</span>
                      </div>
                    )}
                    {extras.childSeat && (
                      <div className="flex justify-between text-sm">
                        <span>Child Seat:</span>
                        <span>15 TND x {(rentalPrice / vehicle.pricePerDay).toFixed(0)} days</span>
                      </div>
                    )}
                    {extras.gps && (
                      <div className="flex justify-between text-sm">
                        <span>GPS Navigation:</span>
                        <span>10 TND x {(rentalPrice / vehicle.pricePerDay).toFixed(0)} days</span>
                      </div>
                    )}
                    {extras.additionalDriver && (
                      <div className="flex justify-between text-sm">
                        <span>Additional Driver:</span>
                        <span>30 TND x {(rentalPrice / vehicle.pricePerDay).toFixed(0)} days</span>
                      </div>
                    )}
                    {(extras.insurance || extras.childSeat || extras.gps || extras.additionalDriver) && (
                      <div className="flex justify-between pt-2 border-t border-dashed">
                        <span>Extras Total:</span>
                        <span>{extrasTotal} TND</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total Price:</span>
                      <span>{rentalPrice + extrasTotal} TND</span>
                    </div>
                  </div>
                </div>
              )}
              
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white w-full"
                onClick={handleReservation}
                disabled={!vehicle.available}
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
