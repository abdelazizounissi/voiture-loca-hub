
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Star, Edit, Trash2, History } from "lucide-react";

const ClientProfile = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("User");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [reservations, setReservations] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const storedUserType = localStorage.getItem("userType");
    const storedUserName = localStorage.getItem("userName") || "User";
    const storedUserEmail = localStorage.getItem("userEmail") || "";
    
    if (loggedInStatus !== "true") {
      toast({
        title: "Access denied",
        description: "You must be logged in to access this page",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    
    setUserType(storedUserType);
    setUserName(storedUserName);
    setUserEmail(storedUserEmail);
    setUserPhone(localStorage.getItem("userPhone") || "");
    setUserAddress(localStorage.getItem("userAddress") || "");
    
    // Load reservations from localStorage for demo purposes
    const storedReservations = JSON.parse(localStorage.getItem("reservations") || "[]");
    // Filter reservations for this user
    const userReservations = storedReservations.filter((res: any) => res.userId === localStorage.getItem("userId"));
    setReservations(userReservations);
  }, [navigate, toast]);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user information in localStorage
    localStorage.setItem("userName", userName);
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userPhone", userPhone);
    localStorage.setItem("userAddress", userAddress);
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully"
    });
  };
  
  const handleCancelReservation = (id: string) => {
    // Update the reservation status to cancelled
    const updatedReservations = reservations.map(res => {
      if (res.id === id) {
        return { ...res, status: 'cancelled' };
      }
      return res;
    });
    
    // Update localStorage
    const allReservations = JSON.parse(localStorage.getItem("reservations") || "[]");
    const updatedAllReservations = allReservations.map((res: any) => {
      if (res.id === id) {
        return { ...res, status: 'cancelled' };
      }
      return res;
    });
    
    localStorage.setItem("reservations", JSON.stringify(updatedAllReservations));
    setReservations(updatedReservations);
    
    toast({
      title: "Reservation cancelled",
      description: "Your reservation has been cancelled successfully"
    });
  };
  
  const handleAddReview = (vehicleId: string, rating: number, comment: string) => {
    // In a real app, we would send this to a backend
    // For now, just show a success message
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!"
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="reservations">My Reservations</TabsTrigger>
                <TabsTrigger value="reviews">My Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={userPhone} 
                        onChange={(e) => setUserPhone(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        value={userAddress} 
                        onChange={(e) => setUserAddress(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="reservations">
                <h2 className="text-xl font-semibold mb-4">My Reservations</h2>
                
                {reservations.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left">Vehicle</th>
                          <th className="py-3 px-4 text-left">Dates</th>
                          <th className="py-3 px-4 text-left">Price</th>
                          <th className="py-3 px-4 text-left">Status</th>
                          <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map(res => {
                          const startDate = new Date(res.startDate).toLocaleDateString();
                          const endDate = new Date(res.endDate).toLocaleDateString();
                          
                          return (
                            <tr key={res.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">{res.vehicleName}</td>
                              <td className="py-3 px-4">{startDate} - {endDate}</td>
                              <td className="py-3 px-4">{res.totalPrice} TND</td>
                              <td className="py-3 px-4">
                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                  res.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                  res.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  res.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex space-x-2">
                                  {res.status !== 'cancelled' && (
                                    <>
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        className="text-blue-500 border-blue-500 hover:bg-blue-50"
                                        onClick={() => navigate(`/modify-reservation/${res.id}`)}
                                      >
                                        <Edit className="w-4 h-4" />
                                      </Button>
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        className="text-red-500 border-red-500 hover:bg-red-50"
                                        onClick={() => handleCancelReservation(res.id)}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </>
                                  )}
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-green-500 border-green-500 hover:bg-green-50"
                                    onClick={() => navigate(`/vehicle/${res.vehicleId}`)}
                                  >
                                    <Star className="w-4 h-4" />
                                    Rate
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium text-gray-900">No reservations yet</h3>
                    <p className="text-gray-500">You haven't made any reservations yet. Browse our vehicles and book your first rental!</p>
                    <Button 
                      onClick={() => navigate('/vehicles')} 
                      className="mt-4 bg-green-500 hover:bg-green-600"
                    >
                      Browse Vehicles
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="reviews">
                <h2 className="text-xl font-semibold mb-4">My Reviews</h2>
                
                <div className="text-center py-8">
                  <Star className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">No reviews yet</h3>
                  <p className="text-gray-500">You haven't submitted any reviews yet. After completing a reservation, you can rate your experience.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClientProfile;
