
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MapPinIcon, Search } from "lucide-react";

const SearchBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would pass these parameters as query strings
    navigate('/vehicles');
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <MapPinIcon className="h-5 w-5 text-gray-500" />
          <Input 
            placeholder="Location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="flex-1">
        <Select value={vehicleType} onValueChange={setVehicleType}>
          <SelectTrigger>
            <SelectValue placeholder="Vehicle Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sedan">Sedan</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
            <SelectItem value="hatchback">Hatchback</SelectItem>
            <SelectItem value="convertible">Convertible</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <Input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <Input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="bg-brand-orange hover:bg-orange-500 text-white"
      >
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
