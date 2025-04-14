
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Car, LogIn } from "lucide-react";
import { agencies } from "@/data/vehicles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the return URL from location state or query params
  const getReturnUrl = () => {
    if (location.state && location.state.from) {
      return location.state.from;
    }
    const params = new URLSearchParams(location.search);
    return params.get("returnUrl") || "/";
  };
  
  useEffect(() => {
    // Redirect if already logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/");
    }
  }, [navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    // Check if it's an agency email
    const agency = agencies.find(a => a.email.toLowerCase() === email.toLowerCase());
    const isAgency = !!agency;
    
    // Create a userId
    const userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const firstName = email.split("@")[0];
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Store login info in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userType", isAgency ? "agency" : "customer");
      localStorage.setItem("userId", isAgency ? agency!.id : userId);
      localStorage.setItem("userName", isAgency ? agency!.name : firstName);
      localStorage.setItem("userEmail", email);
      
      if (isAgency) {
        localStorage.setItem("userPhone", agency!.phone);
        localStorage.setItem("userAddress", agency!.address);
      }
      
      toast({
        title: "Login successful",
        description: `Welcome back to CarFlow, ${isAgency ? agency!.name : firstName}!`,
      });
      
      // Redirect to the appropriate dashboard or return URL
      if (isAgency) {
        navigate("/agency-dashboard");
      } else {
        navigate(getReturnUrl());
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="bg-green-500 p-3 rounded-full">
              <Car className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-gray-600">Sign in to continue to CarFlow</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-green-500 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-500 hover:bg-green-600 flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : (
                    <>
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-green-500 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
