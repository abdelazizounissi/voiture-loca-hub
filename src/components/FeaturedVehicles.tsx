
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VehicleCard from "./VehicleCard";
import { vehicles } from "@/data/vehicles";

const FeaturedVehicles = () => {
  // Get only the first 3 vehicles for featured section
  const featuredVehicles = vehicles.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Vehicles</h2>
            <p className="text-gray-600">Explore our top-rated rental options</p>
          </div>
          <Link to="/vehicles">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Vehicles
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
