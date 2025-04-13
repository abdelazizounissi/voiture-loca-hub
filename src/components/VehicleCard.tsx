
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Vehicle } from "@/types/Vehicle";
import { Users, Fuel, Cog, Star } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={vehicle.image} 
          alt={`${vehicle.brand} ${vehicle.model}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-sm font-medium">
          {vehicle.available ? (
            <span className="text-green-600">Available</span>
          ) : (
            <span className="text-red-600">Unavailable</span>
          )}
        </div>
      </div>
      
      <CardContent className="flex-grow pt-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold">{vehicle.brand} {vehicle.model}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
            <span>{vehicle.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">{vehicle.location}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <Users className="w-4 h-4 mr-1" />
            <span>{vehicle.seats} seats</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Fuel className="w-4 h-4 mr-1" />
            <span>{vehicle.fuel}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Cog className="w-4 h-4 mr-1" />
            <span>{vehicle.transmission}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-brand-blue">${vehicle.pricePerDay}</span>
          <span className="text-gray-500 text-sm">/day</span>
        </div>
        <Link 
          to={`/vehicle/${vehicle.id}`} 
          className="bg-brand-blue hover:bg-brand-blue-light text-white px-4 py-2 rounded transition-colors"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
