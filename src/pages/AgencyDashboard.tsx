
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { vehicles } from "@/data/vehicles";
import { Vehicle } from "@/types/Vehicle";
import { Car, Calendar, Edit, Trash2, Plus, Check, X } from "lucide-react";

const AgencyDashboard = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reservations, setReservations] = useState<any[]>([]);
  const [agencyVehicles, setAgencyVehicles] = useState<Vehicle[]>([]);
  
  useEffect(() => {
    // Check if user is logged in and is agency
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const storedUserType = localStorage.getItem("userType");
    
    if (loggedInStatus !== "true" || storedUserType !== "agency") {
      toast({
        title: "Access denied",
        description: "You must be logged in as an agency to access this page",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    
    setUserType(storedUserType);
    
    // Load reservations from localStorage for demo purposes
    const storedReservations = JSON.parse(localStorage.getItem("reservations") || "[]");
    setReservations(storedReservations);
    
    // In a real app, we would fetch the agency's vehicles from a database
    // For demo, we'll just use some of the vehicles from the data file
    setAgencyVehicles(vehicles.slice(0, 4));
  }, [navigate, toast]);
  
  const handleReservationStatus = (id: string, status: string) => {
    const updatedReservations = reservations.map(res => {
      if (res.id === id) {
        return { ...res, status };
      }
      return res;
    });
    
    setReservations(updatedReservations);
    localStorage.setItem("reservations", JSON.stringify(updatedReservations));
    
    toast({
      title: `Reservation ${status}`,
      description: `Reservation has been ${status}`
    });
  };
  
  const removeVehicle = (id: string) => {
    setAgencyVehicles(agencyVehicles.filter(v => v.id !== id));
    
    toast({
      title: "Vehicle removed",
      description: "The vehicle has been removed from your fleet"
    });
  };
  
  const updateAvailability = (id: string, available: boolean) => {
    const updatedVehicles = agencyVehicles.map(v => {
      if (v.id === id) {
        return { ...v, available };
      }
      return v;
    });
    
    setAgencyVehicles(updatedVehicles);
    
    toast({
      title: `Vehicle ${available ? 'available' : 'unavailable'}`,
      description: `The vehicle is now ${available ? 'available' : 'unavailable'} for rent`
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-bold mb-6">Agency Dashboard</h1>
            
            <Tabs defaultValue="reservations">
              <TabsList className="mb-6">
                <TabsTrigger value="reservations">Reservations</TabsTrigger>
                <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
                <TabsTrigger value="add-vehicle">Add New Vehicle</TabsTrigger>
                <TabsTrigger value="profile">Agency Profile</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reservations">
                <h2 className="text-xl font-semibold mb-4">Manage Reservations</h2>
                
                {reservations.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left">ID</th>
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
                              <td className="py-3 px-4">{res.id.substring(0, 8)}</td>
                              <td className="py-3 px-4">{res.vehicleName}</td>
                              <td className="py-3 px-4">{startDate} - {endDate}</td>
                              <td className="py-3 px-4">${res.totalPrice.toFixed(2)}</td>
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
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-green-500 border-green-500 hover:bg-green-50"
                                    onClick={() => handleReservationStatus(res.id, 'confirmed')}
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-red-500 border-red-500 hover:bg-red-50"
                                    onClick={() => handleReservationStatus(res.id, 'cancelled')}
                                  >
                                    <X className="w-4 h-4" />
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
                    <p className="text-gray-500">Reservations will appear here when customers book your vehicles.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="vehicles">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">My Vehicles</h2>
                  <Button 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => document.querySelector('button[value="add-vehicle"]')?.click()}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Vehicle
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {agencyVehicles.map(vehicle => (
                    <div key={vehicle.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={vehicle.image} 
                          alt={vehicle.model}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            vehicle.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {vehicle.available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-lg">{vehicle.brand} {vehicle.model}</h3>
                        <div className="text-gray-500 text-sm mb-2">{vehicle.year} • {vehicle.type}</div>
                        <div className="font-semibold text-green-500 mb-3">${vehicle.pricePerDay} per day</div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-gray-700"
                            onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                          >
                            <Car className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-blue-500 border-blue-200 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1 text-red-500 border-red-200 hover:bg-red-50"
                            onClick={() => removeVehicle(vehicle.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                        
                        <div className="mt-3">
                          <Button
                            variant={vehicle.available ? "outline" : "default"}
                            size="sm"
                            className={`w-full ${
                              vehicle.available 
                                ? "border-yellow-500 text-yellow-500 hover:bg-yellow-50" 
                                : "bg-green-500 hover:bg-green-600 text-white"
                            }`}
                            onClick={() => updateAvailability(vehicle.id, !vehicle.available)}
                          >
                            {vehicle.available ? "Mark as Unavailable" : "Make Available"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="add-vehicle">
                <h2 className="text-xl font-semibold mb-6">Add New Vehicle</h2>
                
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  toast({
                    title: "Vehicle added",
                    description: "Your new vehicle has been added to your fleet"
                  });
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="brand">Brand</Label>
                      <Input id="brand" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="model">Model</Label>
                      <Input id="model" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input id="year" type="number" min="1990" max="2025" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select defaultValue="Sedan">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sedan">Sedan</SelectItem>
                          <SelectItem value="SUV">SUV</SelectItem>
                          <SelectItem value="Hatchback">Hatchback</SelectItem>
                          <SelectItem value="Convertible">Convertible</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="Minivan">Minivan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="transmission">Transmission</Label>
                      <Select defaultValue="Automatic">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Automatic">Automatic</SelectItem>
                          <SelectItem value="Manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="fuel">Fuel Type</Label>
                      <Select defaultValue="Petrol">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Petrol">Petrol</SelectItem>
                          <SelectItem value="Diesel">Diesel</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                          <SelectItem value="Electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="seats">Seats</Label>
                      <Input id="seats" type="number" min="2" max="9" defaultValue="5" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="price">Price per Day ($)</Label>
                      <Input id="price" type="number" min="1" step="0.01" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input id="image" placeholder="https://example.com/car-image.jpg" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <textarea 
                      id="description" 
                      className="w-full min-h-[100px] p-2 border rounded-md"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <Label>Features</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Air Conditioning', 'Bluetooth', 'Cruise Control', 'Backup Camera', 
                        'Parking Sensors', 'USB Port', 'Heated Seats', 'Navigation System'].map(feature => (
                        <div key={feature} className="flex items-center space-x-2">
                          <input type="checkbox" id={feature.replace(/\s+/g, '')} />
                          <label htmlFor={feature.replace(/\s+/g, '')}>{feature}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Add Vehicle
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="profile">
                <h2 className="text-xl font-semibold mb-6">Agency Profile</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="agencyName">Agency Name</Label>
                      <Input id="agencyName" defaultValue="CarFlow Tunisia" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={localStorage.getItem("userEmail") || ""} required />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+216 71 123 456" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="123 Avenue Habib Bourguiba, Tunis" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Agency Description</Label>
                    <textarea 
                      id="description" 
                      className="w-full min-h-[100px] p-2 border rounded-md"
                      defaultValue="We are a leading car rental agency in Tunisia, providing reliable and affordable vehicles for tourists and locals alike. Our fleet consists of well-maintained vehicles to suit every need and budget."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="button"
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => {
                        toast({
                          title: "Profile updated",
                          description: "Your agency profile has been updated successfully"
                        });
                      }}
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AgencyDashboard;
