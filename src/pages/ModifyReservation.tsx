
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckSquare } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const ModifyReservation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [extras, setExtras] = useState({
    insurance: false,
    childSeat: false,
    gps: false,
    additionalDriver: false,
  });
  const [extrasCost, setExtrasCost] = useState(0);
  
  useEffect(() => {
    // Check if user is logged in
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    
    if (loggedInStatus !== "true") {
      toast({
        title: "Access denied",
        description: "You must be logged in to modify reservations",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    
    // Get reservation from localStorage
    const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
    const found = reservations.find((res: any) => res.id === id);
    
    if (!found) {
      toast({
        title: "Reservation not found",
        description: "The requested reservation could not be found",
        variant: "destructive"
      });
      navigate("/client-profile");
      return;
    }
    
    // Check if this reservation belongs to the current user
    if (found.userId !== localStorage.getItem("userId")) {
      toast({
        title: "Access denied",
        description: "You can only modify your own reservations",
        variant: "destructive"
      });
      navigate("/client-profile");
      return;
    }
    
    setReservation(found);
    setStartDate(new Date(found.startDate));
    setEndDate(new Date(found.endDate));
    
    // Set extras if they exist in the reservation
    if (found.extraOptions) {
      const savedExtras = {
        insurance: found.extraOptions.includes('insurance'),
        childSeat: found.extraOptions.includes('childSeat'),
        gps: found.extraOptions.includes('gps'),
        additionalDriver: found.extraOptions.includes('additionalDriver')
      };
      setExtras(savedExtras);
    }
    
    setLoading(false);
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
  
  const calculateRentalPrice = () => {
    if (!startDate || !endDate || !reservation) return 0;
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays * reservation.pricePerDay;
  };
  
  const calculateTotalPrice = () => {
    const rentalPrice = calculateRentalPrice();
    const diffTime = Math.abs(endDate!.getTime() - startDate!.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalExtras = extrasCost * diffDays;
    
    return rentalPrice + totalExtras;
  };
  
  const handleUpdateReservation = () => {
    if (!startDate || !endDate || !reservation) return;
    
    if (startDate >= endDate) {
      toast({
        title: "Invalid dates",
        description: "End date must be after start date",
        variant: "destructive"
      });
      return;
    }
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const rentalPrice = calculateRentalPrice();
    const totalExtras = extrasCost * diffDays;
    const totalPrice = rentalPrice + totalExtras;
    
    // Update reservation in localStorage
    const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
    const updatedReservations = reservations.map((res: any) => {
      if (res.id === id) {
        return {
          ...res,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          rentalDays: diffDays,
          rentalPrice: rentalPrice,
          extraOptions: Object.entries(extras)
            .filter(([_, selected]) => selected)
            .map(([name, _]) => name),
          extrasPrice: totalExtras,
          totalPrice: totalPrice
        };
      }
      return res;
    });
    
    localStorage.setItem("reservations", JSON.stringify(updatedReservations));
    
    toast({
      title: "Reservation updated",
      description: "Your reservation has been updated successfully"
    });
    
    navigate("/client-profile");
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <p>Loading reservation details...</p>
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
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-3xl font-bold mb-6">Modify Reservation</h1>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Vehicle: {reservation.vehicleName}</h2>
              <p className="text-gray-600 mb-2">Booking ID: {reservation.id}</p>
              <p className="text-gray-600">Modify your reservation details below:</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium mb-2">Pick-up Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Return Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => startDate ? date <= startDate : date <= new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Extra Options */}
            <div className="mb-6">
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
            <div className="border-t border-b py-4 mb-6">
              <h3 className="font-semibold mb-3">Price Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Vehicle Rental:</span>
                  <span>{calculateRentalPrice()} TND</span>
                </div>
                
                {extras.insurance && (
                  <div className="flex justify-between text-sm">
                    <span>Full Insurance Coverage:</span>
                    <span>25 TND x {Math.ceil(Math.abs(endDate!.getTime() - startDate!.getTime()) / (1000 * 60 * 60 * 24))} days</span>
                  </div>
                )}
                
                {extras.childSeat && (
                  <div className="flex justify-between text-sm">
                    <span>Child Seat:</span>
                    <span>15 TND x {Math.ceil(Math.abs(endDate!.getTime() - startDate!.getTime()) / (1000 * 60 * 60 * 24))} days</span>
                  </div>
                )}
                
                {extras.gps && (
                  <div className="flex justify-between text-sm">
                    <span>GPS Navigation:</span>
                    <span>10 TND x {Math.ceil(Math.abs(endDate!.getTime() - startDate!.getTime()) / (1000 * 60 * 60 * 24))} days</span>
                  </div>
                )}
                
                {extras.additionalDriver && (
                  <div className="flex justify-between text-sm">
                    <span>Additional Driver:</span>
                    <span>30 TND x {Math.ceil(Math.abs(endDate!.getTime() - startDate!.getTime()) / (1000 * 60 * 60 * 24))} days</span>
                  </div>
                )}
                
                <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                  <span>Total Price:</span>
                  <span>{calculateTotalPrice()} TND</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/client-profile")}
              >
                Cancel
              </Button>
              <Button 
                className="bg-green-500 hover:bg-green-600"
                onClick={handleUpdateReservation}
              >
                Update Reservation
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModifyReservation;
