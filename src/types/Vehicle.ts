
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  type: 'SUV' | 'Sedan' | 'Hatchback' | 'Convertible' | 'Sports' | 'Minivan';
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuel: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  pricePerDay: number;
  image: string;
  available: boolean;
  description: string;
  features: string[];
  location: string;
  rating: number;
}

export interface Reservation {
  id: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Customer' | 'Agency' | 'Admin';
}
