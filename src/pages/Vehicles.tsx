import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Vehicle } from "@/types/Vehicle";
import { FilterX, SlidersHorizontal } from "lucide-react";

const Vehicles = () => {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);
  const [filters, setFilters] = useState({
    type: "",
    transmission: "",
    minPrice: 0,
    maxPrice: 100,
    searchTerm: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    let result = vehicles;
    
    if (filters.type && filters.type !== "all_types") {
      result = result.filter(vehicle => vehicle.type === filters.type);
    }
    
    if (filters.transmission && filters.transmission !== "any_transmission") {
      result = result.filter(vehicle => vehicle.transmission === filters.transmission);
    }
    
    result = result.filter(vehicle => 
      vehicle.pricePerDay >= filters.minPrice && 
      vehicle.pricePerDay <= filters.maxPrice
    );
    
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(vehicle => 
        vehicle.brand.toLowerCase().includes(term) || 
        vehicle.model.toLowerCase().includes(term) ||
        vehicle.location.toLowerCase().includes(term)
      );
    }
    
    setFilteredVehicles(result);
  }, [filters]);
  
  const resetFilters = () => {
    setFilters({
      type: "",
      transmission: "",
      minPrice: 0,
      maxPrice: 100,
      searchTerm: ""
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Available Vehicles</h1>
              <Button 
                variant="outline" 
                className="flex items-center space-x-2 md:hidden border-green-500 text-green-500"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} />
                <span>Filters</span>
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full">
                <Input
                  type="text"
                  placeholder="Search by brand, model, or location..."
                  value={filters.searchTerm}
                  onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
                  className="w-full mb-4"
                />
                
                <div className={`md:flex gap-4 ${showFilters ? 'flex' : 'hidden'} md:flex flex-col sm:flex-row`}>
                  <div className="flex-1 mb-4 sm:mb-0">
                    <Select 
                      value={filters.type} 
                      onValueChange={(value) => setFilters({...filters, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Vehicle Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_types">All Types</SelectItem>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Hatchback">Hatchback</SelectItem>
                        <SelectItem value="Convertible">Convertible</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Minivan">Minivan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1 mb-4 sm:mb-0">
                    <Select 
                      value={filters.transmission} 
                      onValueChange={(value) => setFilters({...filters, transmission: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any_transmission">Any Transmission</SelectItem>
                        <SelectItem value="Automatic">Automatic</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="text-sm font-medium">Price Range: {filters.minPrice} - {filters.maxPrice} TND</span>
                    </div>
                    <Slider
                      defaultValue={[filters.minPrice, filters.maxPrice]}
                      max={100}
                      step={5}
                      onValueChange={(value) => {
                        setFilters({
                          ...filters, 
                          minPrice: value[0], 
                          maxPrice: value[1]
                        });
                      }}
                      className="mb-4"
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <Button 
                      variant="outline" 
                      onClick={resetFilters}
                      className="flex items-center space-x-2 border-green-500 text-green-500 hover:bg-green-50"
                    >
                      <FilterX size={16} />
                      <span>Reset</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600">{filteredVehicles.length} vehicles found</p>
          </div>
          
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No vehicles match your criteria</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to find more options</p>
              <Button onClick={resetFilters} className="bg-green-500 hover:bg-green-600">Clear All Filters</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vehicles;
