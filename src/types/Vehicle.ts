
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
  vehicleName?: string;
  startDate: Date | string;
  endDate: Date | string;
  totalPrice: number;
  pricePerDay?: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'pending' | 'confirmed' | 'completed' | 'cancelled';
  userId: string;
  userName?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'Customer' | 'Agency' | 'Admin' | 'customer' | 'agency' | 'admin';
}

export interface Review {
  id: string;
  vehicleId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date | string;
}
