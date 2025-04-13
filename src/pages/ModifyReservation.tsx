
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

const ModifyReservation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
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
    setLoading(false);
  }, [id, navigate, toast]);
  
  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !reservation) return 0;
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays * reservation.pricePerDay;
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
    
    const totalPrice = calculateTotalPrice();
    
    // Update reservation in localStorage
    const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
    const updatedReservations = reservations.map((res: any) => {
      if (res.id === id) {
        return {
          ...res,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          totalPrice
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
              <p className="text-gray-600">Modify your reservation dates below:</p>
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
            
            <div className="border-t border-b py-4 mb-6">
              <div className="flex justify-between">
                <span className="font-medium">Total Price:</span>
                <span className="font-bold">{calculateTotalPrice()} TND</span>
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
