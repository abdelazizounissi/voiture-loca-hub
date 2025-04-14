
import { Link } from "react-router-dom";
import { Vehicle } from "@/types/Vehicle";
import { Star, MapPin, Users, Fuel, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="relative">
        <Link to={`/vehicle/${vehicle.id}`}>
          <img 
            src={vehicle.image} 
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-48 object-cover" 
          />
        </Link>
        
        {/* Availability Badge */}
        <div className="absolute top-2 right-2">
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
            vehicle.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {vehicle.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded flex items-center text-sm">
          <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
          <span>{vehicle.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/vehicle/${vehicle.id}`} className="hover:text-green-500">
          <h3 className="font-bold text-lg">{vehicle.brand} {vehicle.model}</h3>
        </Link>
        
        <div className="flex items-center text-gray-500 text-sm mt-1 mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{vehicle.location}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-3 text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            <span>{vehicle.seats} seats</span>
          </div>
          
          <div className="flex items-center">
            <Fuel className="h-3 w-3 mr-1" />
            <span>{vehicle.fuel}</span>
          </div>
          
          <div className="flex items-center">
            <Gauge className="h-3 w-3 mr-1" />
            <span>{vehicle.transmission}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t">
          <div>
            <span className="font-semibold text-lg">{vehicle.pricePerDay} TND</span>
            <span className="text-gray-500 text-sm"> / day</span>
          </div>
          
          <Link to={`/vehicle/${vehicle.id}`}>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
